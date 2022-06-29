import Image from "next/image";

const AlarmModal = (props) => {
  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        {props.open ? (
          <div className="modal-body">
            <Image
              src="/logo-alarm-modal.png"
              alt="logo pic"
              width={25}
              height={50}
            ></Image>
            <div className="content">{props.content}</div>
            <div className="buttons">
              <button className="left-button" onClick={props.result}>
                {props.leftButton}
              </button>
              <button className="right-button" onClick={props.close}>
                {props.rightButton}
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          background-color: rgba(0, 0, 0, 0.6);
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modal-bg-show 0.3s; // 스르륵 효과
        }

        .modal-body {
          width: 430px;
          height: 240px;
          padding: 20px;
          border-radius: 22px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .logo-image,
        .buttons {
          user-select: none;
        }

        .content {
          font-size: 2rem;
          margin: 20px 0;
        }

        .left-button,
        .right-button {
          width: 175px;
          height: 40px;
          border: none;
          border-radius: 25px;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .left-button {
          background-color: #00555f;
          margin-right: 20px;
        }

        .right-button {
          background-color: #d8d8d8;
        }

        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }

        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default AlarmModal;
