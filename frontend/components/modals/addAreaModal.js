const AddAreaModal = (props) => {
  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        <div className="box-container">
          <div className="header-wrapper">
            <button className="reset-button">초기화</button>
            <h1>지역 추가</h1>
          </div>
          <div className="body-wrapper">
            <div className="region-depth">
              <p>시/도</p>
              <div className="depth1-list"></div>
            </div>
            <div className="region-depth">
              <p>시/군/구</p>
              <div className="depth2-list"></div>
            </div>
            <div className="region-depth">
              <p>동/읍/면</p>
              <div className="depth3-list"></div>
            </div>
          </div>
          <div className="tag-wrapper">
            <p>최대 x개까지 선택 가능합니다.</p>
            <p>태그</p>
            <p>태그</p>
          </div>
          <div className="button-wrapper">
            <button className="done-btn">완료</button>
            <button className="cancel-btn" onClick={props.close}>
              취소
            </button>
          </div>
        </div>
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
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .box-container {
          width: 55%;
          height: 80%;
          border-radius: 22px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .header-wrapper {
          width: 100%;
          height: 5%;
          margin: 25px 0;
          display: flex;
          align-items: center;
        }

        .reset-button {
          width: 8%;
          min-width: 50px;
          height: 100%;
          border: none;
          cursor: pointer;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 14.5px;
          background-color: #7f7f7f;
          position: relative;
          left: 25px;
        }

        .header-wrapper h1 {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          position: relative;
          left: 38%;
        }

        .body-wrapper {
          width: 100%;
          height: 75%;
          margin: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .region-depth {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0 15px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #fff;
        }

        .region-depth p {
          display: flex;
          width: 90%;
          height: 8%;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          margin: 15px 0;
          border-bottom: 1px solid lightgrey;
        }

        .tag-wrapper {
          width: 100%;
          height: 5%;
          margin: 15px 0;
          display: column;
          align-items: center;
        }

        .tag-wrapper p {
          margin: 0 25px;
          font-weight: 300;
          color: #b5b5b5;
        }

        .button-wrapper {
          width: 100%;
          height: 8%;
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .done-btn {
          width: 15%;
          height: 100%;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #00555f;
          margin-right: 10px;
        }

        .cancel-btn {
          width: 15%;
          height: 100%;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
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

export default AddAreaModal;
