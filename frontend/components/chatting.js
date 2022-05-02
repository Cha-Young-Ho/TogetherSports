import StompJS from "stompjs";
import SockJS from "sockjs-client";
import { useState, useEffect } from "react";
import { postRefreshToken } from "../api/etc";

const Chatting = () => {
  const [messageToServer, setMessageToServer] = useState("");
  const [showingMessages, setShowingMessages] = useState([
    [
      {
        userId: "me",
        nickname: "동동이",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message: "안녕하세요",
          sendAt: "2022-12-11T13:05",
        },
      },
      {
        userId: "me",
        nickname: "동동이",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message: "안녕하세요",
          sendAt: "2022-12-11T13:05",
        },
      },
    ],
    [
      {
        userId: "me2",
        nickname: "아리",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message:
            "감사해요ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
          sendAt: "2022-12-11T13:05",
        },
      },
      {
        userId: "me2",
        nickname: "아빠",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message: "잘있어요",
          sendAt: "2022-12-11T13:05",
        },
      },
      {
        userId: "me2",
        nickname: "엄마",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message: "다시만나요",
          sendAt: "2022-12-11T13:05",
        },
      },
    ],
    [
      {
        userId: "me",
        nickname: "동동이",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message: "안녕하세요",
          sendAt: "2022-12-11T13:05",
        },
      },
    ],
    [
      {
        userId: "me2",
        nickname: "아리",
        userProfileImagePath: "/base_profileImage.jpg",
        content: {
          message: "감사해요",
          sendAt: "2022-12-11T13:05",
        },
      },
    ],
  ]);

  let sockJS = new SockJS("http://localhost:8080/api/websocket");
  let client = StompJS.over(sockJS);

  const connect = () => {
    client.connect(
      { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      () => {
        client.subscribe(
          "/topic/room/1/chat",
          (data) => {
            const newMessage = JSON.parse(data.body);
            const msgLen = showingMessages.length;

            if (
              msgLen &&
              newMessage.userId === showingMessages[msgLen - 1][0].userId
            ) {
              const temp = [...showingMessages];
              temp[temp.length - 1].push({
                userId: newMessage.userId,
                nickname: newMessage.nickname,
                userProfileImagePath: newMessage.userProfileImagePath,
                content: {
                  message: newMessage.content.message,
                  sendAt: newMessage.content.sendAt,
                },
              });

              setShowingMessages(temp);
            } else {
              setShowingMessages((prev) => [...prev, newMessage]);
            }

            setMessageToServer("");
          },
          { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        );
      },
      (error) => {
        console.log(error);
        postRefreshToken(localStorage.getItem("refreshToken")).then((res) => {
          if (res.status.code === 5000) {
            localStorage.setItem("accessToken", res.accessToken);
            console.log("액세스 토큰 재발급 완료");
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
    client.send(
      "/api/room/1/chat",
      {},
      JSON.stringify({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        message: messageToServer,
      })
    );
  };

  useEffect(() => {
    connect();
  }, []);

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
              showingMessages.map((messages) => {
                // 내 메세지가 아닌 경우만 중복에 대해 처리필요
                if (messages.length > 1 && messages[0].userId !== "me") {
                  return messages.map((datas, index) => {
                    return index === messages.length - 1 ? (
                      <div key={index} className="other-message">
                        <img
                          className="msg-profileImg"
                          src={`${datas.userProfileImagePath}`}
                        ></img>
                        <p>{datas.content.message}</p>
                      </div>
                    ) : (
                      <div key={index} className="dupID-message">
                        <p>{datas.content.message}</p>
                      </div>
                    );
                  });
                }

                return messages.map((datas, index) => {
                  return datas.userId === "me" ? (
                    <div key={index} className="my-message">
                      <p>{datas.content.message}</p>
                    </div>
                  ) : (
                    <div key={index} className="other-message">
                      <img
                        className="msg-profileImg"
                        src={`${datas.userProfileImagePath}`}
                      ></img>
                      <p>{datas.content.message}</p>
                    </div>
                  );
                });
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
