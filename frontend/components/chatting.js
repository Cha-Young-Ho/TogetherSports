import { useState, useEffect } from "react";
import { postRefreshToken } from "../api/etc";
import { getChatInfo } from "../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import { FailResponse } from "../api/failResponse";
import StompJS from "stompjs";

let clientInfo;
let nowMessage = "";
let pre_userId;
let pre_sendAt;
const Chatting = ({ chatOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.saveRoomIdReducer.roomId);
  const myID = useSelector((state) => state.myInfoReducer.id);
  const [messageToServer, setMessageToServer] = useState("");
  const [showingMessages, setShowingMessages] = useState([
    // {
    //   userId: 0,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ",
    //   sendAt: "2022-05-09T17:42:22.302111",
    // },
    // {
    //   userId: 0,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "1",
    //   sendAt: "2022-05-09T17:42:22.302111",
    // },
    // {
    //   userId: 1,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ",
    //   sendAt: "2022-05-09T17:43:22.302111",
    // },
    // {
    //   userId: 1,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "1",
    //   sendAt: "2022-05-09T17:44:22.302111",
    // },
    // {
    //   userId: 1,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "2",
    //   sendAt: "2022-05-09T17:44:22.302111",
    // },
    // {
    //   userId: 1,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "2",
    //   sendAt: "2022-05-09T17:44:22.302111",
    // },
    // {
    //   userId: 1,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "1",
    //   sendAt: "2022-05-09T17:45:22.302111",
    // },
    // {
    //   userId: 0,
    //   nickname: "테스트",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "1",
    //   sendAt: "2022-05-09T17:45:22.302111",
    // },
  ]);
  const API_ENDPOINT = process.env.API_ENDPOINT;

  const connect = (type) => {
    const sockJS = new SockJS(`${API_ENDPOINT}/api/websocket`);
    clientInfo = Stomp.over(sockJS);

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
          clientInfo.disconnect(() => alert("방장으로부터 강퇴되었습니다."));
          router.replace("/");
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

  const func_getChatInfo = () => {
    getChatInfo(roomId)
      .then((res) => {
        if (res.status.code === 5000) {
          setShowingMessages(res.content.content);
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code, func_getChatInfo);
        }
      });
  };

  useEffect(() => {
    if (chatOpen && roomId !== "") {
      func_getChatInfo();

      connect();
    }
  }, [roomId]);

  useEffect(() => {
    document.getElementsByClassName("dialog")[0].scrollTop =
      document.getElementsByClassName("dialog")[0].scrollHeight;
  }, [showingMessages]);

  useEffect(() => {
    return () => {
      if (clientInfo) clientInfo.disconnect();
      dispatch({
        type: "SAVEROOMID",
        payload: {
          roomId: 0,
        },
      });
    };
  }, []);

  return (
    <>
      <div className="chatting">
        <div className="dialog">
          <div className="messages">
            {showingMessages.length ? (
              showingMessages.map((messages, index) => {
                const now_sendAt = `${messages.sendAt.substr(
                  11,
                  2
                )} : ${messages.sendAt.substr(14, 2)}`;

                const now_userId = messages.userId;

                if (now_userId === myID) {
                  pre_userId = now_userId;
                  pre_sendAt = now_sendAt;

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
                  pre_userId = now_userId;
                  pre_sendAt = now_sendAt;

                  return (
                    <div key={index} className="other-message">
                      <img
                        className="msg-profileImg"
                        src={`${messages.userProfileImagePath}`}
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

                pre_userId = now_userId;
                pre_sendAt = now_sendAt;

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
          width: 50px;
          height: 50px;
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
