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
          <section>
            <div className="modal-body">
              <img className="logo-image" src="logo-alarm-modal.png"></img>
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
          </section>
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

        section {
          width: 430px;
          height: 240px;
          width: 90%;
          max-width: 450px;
          margin: 0 auto;
          border-radius: 22px;
          background-color: #fff;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-show 0.3s;
          overflow: hidden;
          display: table;
          text-align: center;
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .modal-body {
          width: 100%;
          height: 100%;
          display: table-cell;
          vertical-align: middle;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .logo-image,
        .buttons {
          margin: 20px;
        }

        .logo-image {
          max-width: 21px;
          max-height: 47px;
        }

        .content {
          font-size: 20px;
          margin: 0 20px 20px 20px;
        }

        .left-button,
        .right-button {
          margin: 0 10px;
          width: 175px;
          height: 50px;
          border: none;
          border-radius: 25px;
          color: white;
          font-size: 15px;
          font-weight: 200px;
          cursor: pointer;
        }

        .left-button {
          background-color: #00555f;
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
