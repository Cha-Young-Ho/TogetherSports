const ModifyRoomModal = ({ open, close }) => {
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        <div className="box-container">
          <h1>방 정보 수정</h1>
          <div className="picture-wrapper">
            <p>사진추가</p>
          </div>
          <div className="pic-preview-wrapper"></div>
          <div className="roomTitle-wrapper">
            <p>방 제목</p>
            <input type="text"></input>
          </div>
          <div className="peopleCount-wrapper">
            <p>인원 수 조절</p>
            <input type="text"></input>
            <p>명</p>
          </div>
          <div className="roomNotice-wrapper">
            <p>방 설명 작성</p>
            <textarea></textarea>
          </div>
          <div className="button-wrapper">
            <button className="done-btn">완료</button>
            <button className="cancel-btn" onClick={close}>
              취소
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        p {
          font-size: 1.5rem;
          font-weight: bold;
        }

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
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .box-container {
          width: 700px;
          height: 520px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .box-container h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          margin-top: 20px;
        }

        .picture-wrapper {
          width: 80%;
          height: 30px;
          display: flex;
          align-items: center;
          margin-top: 25px;
        }

        .pic-preview-wrapper {
          width: 80%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .roomTitle-wrapper {
          width: 80%;
          height: 40px;
          display: flex;
          align-items: center;
        }

        .roomTitle-wrapper input[type="text"] {
          width: 500px;
          height: 40px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          margin-left: 15px;
          padding-left: 10px;
        }

        .peopleCount-wrapper {
          width: 80%;
          height: 40px;
          margin-top: 10px;
          display: flex;
          align-items: center;
        }

        .peopleCount-wrapper input[type="text"] {
          width: 50px;
          height: 40px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          margin: 0 15px;
          text-align: center;
        }

        .roomNotice-wrapper {
          width: 80%;
          height: 160px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
        }

        .roomNotice-wrapper textarea {
          width: 570px;
          height: 130px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          background-color: #f4f4f4;
          padding: 10px;
        }

        .button-wrapper {
          width: 80%;
          height: 40px;
          margin-top: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .done-btn {
          width: 160px;
          height: 45px;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #00555f;
          margin-right: 10px;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .cancel-btn {
          width: 160px;
          height: 45px;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #d8d8d8;
          font-size: 1.5rem;
          font-weight: bold;
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

export default ModifyRoomModal;
