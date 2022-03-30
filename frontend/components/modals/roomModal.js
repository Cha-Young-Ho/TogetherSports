const RoomModal = ({ open, close }) => {
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <div className="room-modal-body">
              <div className="left-section">
                <div>태그들</div>
                <div>방 제목</div>
                <div>인원, 종목</div>
                <div>달력</div>
                <div>위치</div>
              </div>

              <div className="right-section">
                <div>이미지</div>
                <div>방 설명</div>
                <div className="buttons">
                  <button className="right-button" onClick={close}>
                    닫기
                  </button>
                  <button className="left-button">참여</button>
                </div>
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
          width: 1150px;
          height: 720px;
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

        .room-modal-body {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }

        .buttons {
          margin: 20px;
        }

        .left-section {
          width: 440px;
        }

        .right-section {
          width: 710px;
        }

        .left-button,
        .right-button {
          margin: 0 10px;
          width: 175px;
          height: 40px;
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

export default RoomModal;
