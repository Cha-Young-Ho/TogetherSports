import { useState, useEffect } from "react";
import { postRefreshToken } from "../api/etc";
import { getChatInfo } from "../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import { FailResponse } from "../api/failResponse";
import StompJS from "stompjs";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
let clientInfo;
let nowMessage = "";
let scrollHandlingTimer;
let page = 0;
let size = 20;
let participants = [];
const Chatting = ({ chatOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.saveRoomIdReducer.roomId);
  const myID = useSelector((state) => state.myInfoReducer.id);
  const initParticipantArr = useSelector(
    (state) => state.roomRealTimeInfoReducer.participants
  );
  const [messageToServer, setMessageToServer] = useState("");
  const [showingMessages, setShowingMessages] = useState([]);

  // 내가 방장인지 아닌지 확인하기 위한 변수
  const myNickname = useSelector((state) => state.myInfoReducer.userNickname);

  // 스크롤 위치값
  const [scrollInfo, setScrollInfo] = useState({
    scrollHeight: 0,
    offsetHeight: 0,
    scrollTop: 0,
  });

  const connect = (type) => {
    const sockJS = new SockJS(`${API_ENDPOINT}/api/websocket`);
    clientInfo = Stomp.over(sockJS);
    clientInfo.debug = null;

    clientInfo.connect(
      {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        roomId: `${roomId}`,
      },
      () => {
        clientInfo.subscribe(
          `/topic/room/${roomId}/chat`,
          (data) => {
            const newMessage = JSON.parse(data.body);

            messageBranch(newMessage);
          },
          {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            roomId: `${roomId}`,
          }
        );

        if (type === "refresh") {
          clientInfo.send(
            `/api/room/${roomId}/chat`,
            {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              roomId: `${roomId}`,
            },
            JSON.stringify({
              message: nowMessage,
            })
          );
        }
      },
      (error) => {
        if (typeof error !== "object") return;

        const tokenCatchError = error.headers.message;

        if (tokenCatchError === "1301" || tokenCatchError === "1302") {
          postRefreshToken(localStorage.getItem("refreshToken"))
            .then((res) => {
              if (res.status.code === 5000) {
                localStorage.setItem("accessToken", res.content.accessToken);
                localStorage.setItem("refreshToken", res.content.refreshToken);

                connect("refresh");
              } else {
                FailResponse(res.status.code);
              }
            })
            .catch((error) => {
              FailResponse(error.response.data.status.code);
            });
        } else {
          alert("참여할 수 없거나 오류가 발생했습니다.");
          router.push("/");
        }
      }
    );
  };

  const addMessageToServer = (e) => {
    setMessageToServer(e.target.value);
    nowMessage = e.target.value;
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    if (messageToServer === "") return;

    clientInfo.send(
      `/api/room/${roomId}/chat`,
      {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        roomId: `${roomId}`,
      },
      JSON.stringify({
        message: messageToServer,
      })
    );

    setMessageToServer("");
  };

  const messageBranch = (JSONBodys) => {
    switch (JSONBodys.status.type) {
      case "User":
        setShowingMessages((prev) => [...prev, JSONBodys.content]);
        break;
      case "System":
        systemMessageBranch(JSONBodys);
        break;
      case "Room":
        updateRoomDataFunc(JSONBodys);
        break;
    }
  };

  const systemMessageBranch = (JSONBodys) => {
    switch (JSONBodys.status.code) {
      case 1501: //입장
        dispatch({
          type: "SAVEROOMALARM",
          payload: {
            messages: `${JSONBodys.content.userNickname}님이 참여했습니다.`,
          },
        });
        break;
      case 1502: //퇴장
        // 내가 퇴장하면
        if (JSONBodys.content.id === myID) {
          clientInfo.disconnect(() => alert("방에서 퇴장합니다."));
          router.replace("/room/roomlist");
          return;
        }

        dispatch({
          type: "SAVEROOMALARM",
          payload: {
            messages: `${JSONBodys.content.userNickname}님이 퇴장했습니다.`,
          },
        });
        break;
      case 1503: //강퇴
        // 내가 강퇴당하면
        if (JSONBodys.content.id === myID) {
          alert("방장으로부터 강퇴되었습니다.");
          router.push("/");
          return;
        }

        dispatch({
          type: "SAVEROOMALARM",
          payload: {
            messages: `${JSONBodys.content.userNickname}님이 강퇴되었습니다.`,
          },
        });
        break;
      case 1504: //방장위임
        dispatch({
          type: "CHANGEHOST",
          payload: {
            host: JSONBodys.content.afterHostNickname,
          },
        });

        dispatch({
          type: "SAVEROOMALARM",
          payload: {
            messages: `${JSONBodys.content.afterHostNickname}님이 방장이 되었습니다.`,
          },
        });
        break;
      case 1508: // 온라인
        dispatch({
          type: "CHANGEPARTICIPANTSTATUS",
          payload: {
            participants: participants.map((user) => {
              if (user.id === JSONBodys.content.id) {
                return {
                  ...user,
                  id: user.id,
                  userNickname: user.userNickname,
                  status: "ONLINE",
                };
              }

              return user;
            }),
          },
        });
        break;
      case 1509: // 오프라인
        dispatch({
          type: "CHANGEPARTICIPANTSTATUS",
          payload: {
            participants: participants.map((user) => {
              if (user.id === JSONBodys.content.id) {
                return {
                  ...user,
                  id: user.id,
                  userNickname: user.userNickname,
                  status: "OFFLINE",
                };
              }

              return user;
            }),
          },
        });
        break;
    }
  };

  const updateRoomDataFunc = (JSONBodys) => {
    const roomInfo = JSONBodys.content.roomOfInfo;
    dispatch({
      type: "SAVEROOMINFOS",
      payload: {
        roomTitle: roomInfo.roomTitle,
        roomContent: roomInfo.roomContent,
        roomArea: roomInfo.roomArea,
        exercise: roomInfo.exercise,
        limitPeopleCount: roomInfo.limitPeopleCount,
        participantCount: roomInfo.participantCount,
        startAppointmentDate: roomInfo.startAppointmentDate,
        endAppointmentDate: roomInfo.endAppointmentDate,
        createdTime: roomInfo.createdTime,
        updatedTime: roomInfo.updatedTime,
        host: roomInfo.host,
        creatorNickName: roomInfo.creatorNickName,
        roomImages: roomInfo.roomImages,
        tags: roomInfo.tags,
        viewCount: roomInfo.viewCount,
        participants: JSONBodys.content.participants,
      },
    });
  };

  const func_getChatInfo = (pageNum, sizeNum) => {
    getChatInfo(roomId, pageNum, sizeNum)
      .then((res) => {
        if (res.status.code === 5000) {
          setShowingMessages((prev) => [
            ...res.content.content.reverse(),
            ...prev,
          ]);
          page += 1;
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status) {
          FailResponse(
            error.response.data.status.code,
            func_getChatInfo(page, size)
          );
        }
      });
  };

  useEffect(() => {
    if (chatOpen && roomId !== 0) {
      // 스크롤 관련 쓰로틀링
      if (!scrollHandlingTimer) {
        scrollHandlingTimer = setTimeout(() => {
          scrollHandlingTimer = null;
          func_getChatInfo(page, size);
        }, 800);
      }

      connect();
    }
  }, [roomId]);

  // 새로운 채팅 생길 시 스크롤이 맨 밑일 때 맨 아래로 화면 강제 이동
  useEffect(() => {
    if (
      scrollInfo.offsetHeight + scrollInfo.scrollTop >=
      scrollInfo.scrollHeight - 20
    ) {
      document.getElementsByClassName("dialog")[0].scrollTop =
        document.getElementsByClassName("dialog")[0].scrollHeight;
    }
  }, [showingMessages]);

  // 채팅 맨 위 도착시
  useEffect(() => {
    if (scrollInfo.scrollTop === 0 && roomId !== 0) {
      if (!scrollHandlingTimer) {
        scrollHandlingTimer = setTimeout(() => {
          scrollHandlingTimer = null;
          func_getChatInfo(page, size);
        }, 800);
      }
    }
  }, [scrollInfo]);

  useEffect(() => {
    dispatch({
      type: "CHANGEPARTICIPANTSTATUS",
      payload: {
        participants: participants.map((user) => {
          if (user.userNickname === myNickname) {
            return {
              ...user,
              id: user.id,
              userNickname: user.userNickname,
              status: "ONLINE",
            };
          }

          return user;
        }),
      },
    });

    return () => {
      if (clientInfo) clientInfo.disconnect();
      dispatch({
        type: "SAVEROOMID",
        payload: {
          roomId: 0,
        },
      });

      page = 0;
      nowMessage = "";
    };
  }, []);

  useEffect(() => {
    if (initParticipantArr.length) {
      participants = [...initParticipantArr];
    }
  }, [initParticipantArr]);

  return (
    <>
      <div className="chatting">
        <div
          className="dialog"
          onScroll={(e) => {
            setScrollInfo({
              scrollTop: e.target.scrollTop,
              offsetHeight: e.target.offsetHeight,
              scrollHeight: e.target.scrollHeight,
            });
          }}
        >
          <div className="messages">
            {Array.isArray(showingMessages) ? (
              showingMessages.map((messages, index) => {
                const now_sendAt = `${messages.sendAt.substr(
                  11,
                  2
                )} : ${messages.sendAt.substr(14, 2)}`;

                const now_userId = messages.userId;

                const pre_sendAt =
                  index === 0
                    ? ""
                    : `${showingMessages[index - 1].sendAt.substr(
                        11,
                        2
                      )} : ${showingMessages[index - 1].sendAt.substr(14, 2)}`;

                const pre_userId =
                  index === 0 ? "" : showingMessages[index - 1].userId;

                if (now_userId === myID) {
                  return (
                    <div key={index} className="my-message">
                      <div className="chat-body">
                        <div className="message-sendAt">{now_sendAt}</div>
                        <p>{messages.message}</p>
                      </div>
                    </div>
                  );
                }

                if (pre_sendAt !== now_sendAt || pre_userId !== now_userId) {
                  return (
                    <div key={index} className="other-message">
                      <img
                        className="msg-profileImg"
                        src={`${API_ENDPOINT}${messages.userProfileImagePath}`}
                        alt="user pic"
                      ></img>
                      <div className="chat-container">
                        <div className="chat-header">{messages.nickname}</div>
                        <div className="chat-body">
                          <p>{messages.message}</p>
                          <div className="message-sendAt">{now_sendAt}</div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={index} className="dupID-message">
                    <div className="chat-body">
                      <p>{messages.message}</p>
                      <div className="message-sendAt">{now_sendAt}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <form className="dialog-input" onSubmit={onSubmitMessage}>
          <input
            id="content"
            type="text"
            value={messageToServer}
            onChange={addMessageToServer}
          />
          <br />
          <button>
            <img src="/chatting-send-button.png" alt="chat sendingButton pic" />
          </button>
        </form>
      </div>
      <style jsx>{`
        input:focus {
          outline: none;
        }

        .chatting {
          width: 100%;
          height: 433px;
          padding: 15px 15px;
          border-radius: 15px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dialog {
          width: 100%;
          height: 90%;
          margin-bottom: 10px;
          overflow-y: scroll;
          scroll-snap-align: none;
          position: relative;
        }

        .dialog::-webkit-scrollbar {
          width: 17px;
          border: none;
        }

        .dialog::-webkit-scrollbar-track {
          width: 9px;
          border-radius: 4px;
          background-color: #f5f5f5;
          background-clip: padding-box;
          border: 5px solid transparent;
        }

        .dialog::-webkit-scrollbar-thumb {
          width: 17px;
          border-radius: 4px;
          border: solid 1px #e5e5e5;
          background-color: #fff;
        }

        .messages {
          width: 320px;
          position: relative;
          bottom: 0;
          display: flex;
          flex-direction: column;
        }

        .dialog-input {
          width: 100%;
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .dialog-input input {
          width: 300px;
          height: 30px;
          padding: 0 10px;
          border: none;
          border-radius: 15px;
          background-color: #f4f4f4;
        }

        .dialog-input button {
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 50%;
          user-select: none;
          cursor: pointer;
        }

        .dialog-input img {
          width: 28px;
          height: 28px;
        }

        .other-message {
          float: left;
          text-align: left;
          display: flex;
          align-items: start;
        }

        .dupID-message {
          float: left;
          text-align: left;
          display: flex;
          align-items: center;
          margin-left: 50px;
        }

        .my-message {
          display: flex;
          justify-content: end;
          text-align: left;
          padding-left: 20px;
        }

        .msg-profileImg {
          width: 35px;
          height: 35px;
          margin: 7.5px;
        }

        .chat-container {
          display: flex;
          flex-direction: column;
        }

        .chat-body {
          display: flex;
          align-items: end;
        }

        .chat-body > p,
        .dupID-message p {
          display: block;
          float: left;
          border-radius: 12px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          padding: 7px;
          margin: 5px;
        }

        .my-message p {
          display: block;
          float: right;
          border-radius: 12px;
          background-color: #6db152;
          color: white;
          font-size: 1.5rem;
          padding: 7px;
          margin: 5px;
        }

        .chat-header {
          margin-left: 5px;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .message-sendAt {
          width: 33px;
          height: 20px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};

export default Chatting;
