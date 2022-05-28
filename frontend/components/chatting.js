import { useState, useEffect } from "react";
import { postRefreshToken } from "../api/etc";
import { getChatInfo } from "../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Chatting = ({ chatOpen, updateRoomDataFunc }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.saveRoomIdReducer.roomId);
  const clientInfo = useSelector((state) => state.saveWebSocketReducer.client);
  const myID = useSelector((state) => state.myInfoReducer.id);
  const [messageToServer, setMessageToServer] = useState("");
  const [showingMessages, setShowingMessages] = useState([
    // {
    //   userId: 0,
    //   nickname: "동동이",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "안녕하세요",
    //   sendAt: "2022-12-11T13:05",
    // },
    // {
    //   userId: 0,
    //   nickname: "동동이",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "안녕하세요",
    //   sendAt: "2022-12-11T13:05",
    // },
    // {
    //   userId: 1,
    //   nickname: "아리",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message:
    //     "감사해요ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
    //   sendAt: "2022-12-11T13:05",
    // },
    // {
    //   userId: 1,
    //   nickname: "아빠",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "잘있어요",
    //   sendAt: "2022-12-11T13:05",
    // },
    // {
    //   userId: 2,
    //   nickname: "엄마",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "다시만나요",
    //   sendAt: "2022-12-11T13:05",
    // },
    // {
    //   userId: 1,
    //   nickname: "동동이",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "안녕하세요",
    //   sendAt: "2022-12-11T13:05",
    // },
    // {
    //   userId: 0,
    //   nickname: "아리",
    //   userProfileImagePath: "/base_profileImage.jpg",
    //   message: "감사해요",
    //   sendAt: "2022-12-11T13:05",
    // },
  ]);

  let preChattingID = 0;

  const connect = () => {
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
      },
      (error) => {
        console.log(error);
        postRefreshToken(localStorage.getItem("refreshToken")).then((res) => {
          if (res.status.code === 5000) {
            localStorage.setItem("accessToken", res.content.accessToken);
            localStorage.setItem("refreshToken", res.content.refreshToken);
            console.log("두 토큰 재발급 완료");
          } else {
            console.log("토큰 재발급 실패, 토큰 삭제...");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        });
      }
    );
  };

  const addMessageToServer = (e) => {
    setMessageToServer(e.target.value);
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
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
        updateRoomDataFunc(JSONBodys.content);
        break;
    }
  };

  const systemMessageBranch = (JSONBodys) => {
    switch (JSONBodys.status.code) {
      case 1501: //입장
        alert(`${JSONBodys.content.nickname}님이 참여했습니다.`);
        break;
      case 1502: //퇴장
        if (JSONBodys.content.id === myID) {
          clientInfo.disconnect(() => alert("방에서 퇴장합니다."));
          router.replace("/room/roomlist");
          return;
        }

        alert(`${JSONBodys.content.nickname}님이 퇴장했습니다.`);
        break;
      case 1503: //강퇴
        if (JSONBodys.content.id === myID) {
          clientInfo.disconnect(() => alert("방장으로부터 강퇴되었습니다."));
          router.replace("/");
          return;
        }

        alert(`${nickname}님이 강퇴되었습니다.`);
        break;
      case 1504: //방장위임
        dispatch({
          type: "CHANGEHOST",
          payload: {
            host: JSONBodys.content.afterHostNickname,
          },
        });
        alert("방장이 변경되었습니다.");
        break;
    }
  };

  useEffect(() => {
    if (chatOpen && roomId !== "" && clientInfo) {
      getChatInfo(roomId).then((res) => {
        if (res.status.code === 5000) {
          setShowingMessages((prev) => [...prev, res.content.content]);
        }
      });

      connect();
    }
  }, [roomId, clientInfo]);

  useEffect(() => {
    document.getElementsByClassName("dialog")[0].scrollTop =
      document.getElementsByClassName("dialog")[0].scrollHeight;
  }, [showingMessages]);

  return (
    <>
      <div className="chatting">
        <div className="dialog">
          <div className="messages">
            {showingMessages.length ? (
              showingMessages.map((messages, index) => {
                // 내가 보낸 메세지 일 때
                if (messages.userId === myID) {
                  preChattingID = messages.userId;

                  return (
                    <div key={index} className="my-message">
                      <p>{messages.message}</p>
                    </div>
                  );
                }

                // 다른 사람의 메세지 일 때
                if (messages.userId === preChattingID) {
                  return (
                    <div key={index} className="dupID-message">
                      <p>{messages.message}</p>
                    </div>
                  );
                } else {
                  preChattingID = messages.userId;

                  return (
                    <div key={index} className="other-message">
                      <img
                        className="msg-profileImg"
                        src={`${messages.userProfileImagePath}`}
                      ></img>
                      <p>{messages.message}</p>
                    </div>
                  );
                }
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
            <img src="/chatting-send-button.png" />
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
          align-items: center;
        }

        .dupID-message {
          float: left;
          text-align: left;
          display: flex;
          align-items: center;
          margin-left: 50px;
        }

        .my-message {
          float: right;
          text-align: left;
        }

        .msg-profileImg {
          width: 50px;
          height: 50px;
        }

        .other-message p,
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
      `}</style>
    </>
  );
};

export default Chatting;
