import * as StompJS from "@stomp/stompjs";
import { useState, useEffect } from "react";

let client = null;

const Chatting = () => {
  const [messageToServer, setMessageToServer] = useState("");
  const [showingMessages, setShowingMessages] = useState([
    { target: "other", msg: "다른사람 메시지" },
    { target: "mine", msg: "내 메시지" },
    { target: "mine", msg: "내 메시지" },
    { target: "mine", msg: "내 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "other", msg: "다른사람 메시지" },
    { target: "mine", msg: "내 메시지" },
  ]);

  const connect = () => {
    client = new StompJS.Client({
      brokerURL: "ws://localhost:8080/api/websocket",
      debug: function (str) {
        console.log("debug" + str);
      },
      onConnect: () => {
        subscribe();
      },
    });

    client.activate();
  };

  const subscribe = () => {
    if (client != null) {
      client.subscribe("/topic/room/1/chat", (data) => {
        const newMessage = JSON.parse(data.body).message;
        setShowingMessages((prev) => [
          ...prev,
          { target: "other", msg: newMessage },
        ]);
      });
    }
  };

  const addMessageToServer = (e) => {
    setMessageToServer(e.target.value);
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();

    if (client != null) {
      if (!client.connected) return;

      client.publish({
        destination: "/api/room/1/chat",
        body: JSON.stringify({
          message: messageToServer,
        }),
      });

      setShowingMessages((prev) => [
        ...prev,
        { target: "mine", msg: messageToServer },
      ]);
    }
  };

  const disConnect = () => {
    if (client != null) {
      if (client.connected) client.deactivate();
    }
  };

  useEffect(() => {
    connect();
    return () => disConnect();
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
            {showingMessages.map((datas, index) => {
              return datas.target === "mine" ? (
                <div key={index} className="my-message">
                  <p>{datas.msg}</p>
                </div>
              ) : (
                <div key={index} className="other-message">
                  <p>{datas.msg}</p>
                </div>
              );
            })}
          </div>
        </div>
        <form className="dialog-input" onSubmit={onSubmitMessage}>
          <input id="content" type="text" onChange={addMessageToServer} />
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
          //box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
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
        }

        .my-message {
          float: right;
          text-align: right;
        }

        .other-message p {
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
