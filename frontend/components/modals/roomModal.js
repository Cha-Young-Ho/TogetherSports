const RoomModal = ({ open, close }) => {
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <div className="room-modal-body">
              <div className="header">
                <div className="tags">
                  <div className="tag">10대</div>
                  <div className="tag">초보만</div>
                  <div className="tag">실력무관</div>
                  <div className="tag">성별무관</div>
                </div>

                <p>{`ID : nickname님의 방`}</p>
              </div>

              <div className="section">
                <div className="left-section">
                  <p>매너축구 하실 멋쟁이 분들 모십니다.</p>

                  <div className="options">
                    <div className="option">
                      <p className="small-p">참여인원</p>
                      <p className="big-p">10</p>
                    </div>
                    <div className="option">
                      <p className="small-p">모집인원</p>
                      <p className="big-p">30</p>
                    </div>
                    <div className="option">
                      <p className="small-p">종목</p>
                      <p className="big-p">축구</p>
                    </div>
                    <div className="option-time">
                      <p className="small-p">시간</p>
                      <p className="big-p">10시 30분 ~</p>
                      <p className="big-p">14시 30분</p>
                    </div>
                  </div>

                  <div className="calendar"></div>

                  <div className="location">
                    <p className="location-info">위치 정보</p>
                    <div className="line"></div>
                    <p className="address-info">서울 강동구 올림픽로 223-1</p>
                    <div className="map"></div>
                  </div>
                </div>

                <div className="right-section">
                  <div className="image"></div>

                  <div className="room-info">
                    <p>방 설명 및 안내</p>
                    <div className="line"></div>
                    <input></input>
                  </div>

                  <div className="buttons">
                    <button className="left-button">참여</button>
                    <button className="right-button" onClick={close}>
                      닫기
                    </button>
                  </div>
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
          padding: 20px 30px;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .tags {
          display: flex;
          flex-direction: row;
        }

        .tag {
          width: 70px;
          height: 25px;
          margin-right: 10px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          font-weight: bold;
          font-size: 0.9em;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .section {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }

        .left-section {
          width: 440px;
        }

        .left-section > div,
        .left-section > p {
          display: flex;
          justify-content: left;
          align-items: center;
          margin-bottom: 13px;
        }

        .left-section > p {
          font-size: 1.9em;
          font-weight: bold;
        }

        .options {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .option {
          width: 70px;
          height: 70px;
          margin-right: 20px;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .option-time {
          width: 120px;
          height: 70px;
          margin-right: 20px;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .small-p {
          font-size: 0.9em;
          margin-bottom: 4px;
        }

        .big-p {
          font-weight: bold;
          font-size: 1.8em;
        }

        .option-time .big-p {
          font-weight: bold;
          font-size: 1em;
        }

        .calendar {
          width: 100%;
          height: 220px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .location {
          width: 100%;
          height: 260px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px;
        }

        .location-info {
          font-weight: bold;
          margin-top: 10px;
        }

        .address-info {
          margin-bottom: 10px;
        }

        .left-section .line {
          width: 311.5px;
          height: 0;
          margin: 10px 0;
          border: solid 0.3px #707070;
        }

        .map {
          width: 100%;
          height: 170px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
        }

        .right-section {
          width: 710px;
        }

        .right-section div {
          margin-left: 30px;
        }

        .image {
          width: 680px;
          height: 350px;
          border: solid 1px #e8e8e8;
        }

        .room-info > p {
          margin: 20px 10px 0 0;
          display: flex;
          justify-content: left;
          font-weight: bold;
        }

        .room-info > div {
          margin: 10px 0;
        }

        .right-section .line {
          width: 680px;
          height: 0;
          border: solid 0.3px #707070;
        }

        .room-info input {
          width: 680px;
          height: 160px;
          padding: 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
        }

        .buttons {
          margin-top: 20px;
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
