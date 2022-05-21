/* popUpModal 컴포넌트 사용법 !! */

// open = modal을 열 함수
// close = modal을 닫을 함수
// content = 팝업 내용
// result = 팝업 왼쪽 버튼을 눌렀을 때 실행될 함수
// leftButton = 팝업 왼쪽 버튼으로, 긍정적인 답변들 위치 (ex. 예, 수락)
// rightButton = 팝업 오른쪽 버튼으로, 부정적인 답변들 위치 (ex. 아니오, 거절)

/* 상위 컴포넌트에서 쓰게 될 state 변수와 open, close 함수 */

// const [modalOpen, setModalOpen] = useState(false);
// const openModal = () => {
//   setModalOpen(true);
// };
// const closeModal = () => {
//   setModalOpen(false);
// };

const AlarmModal = (props) => {
  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        {props.open ? (
          <div className="modal-body">
            <img className="logo-image" src="/logo-alarm-modal.png"></img>
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

        .logo-image {
          max-width: 25px;
          max-height: 50px;
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
