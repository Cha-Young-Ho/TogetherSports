const PopUpModal = ({ open, close, content, leftButton, rightButton }) => {
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <div className="popup-body">
              {/* <img className="logo-image"></img> */}
              <div className="content">{content}</div>
              <div className="buttons">
                <button className="left-button">{leftButton}</button>
                <button className="right-button">{rightButton}</button>
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
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .popup-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-center: center;
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

export default PopUpModal;
