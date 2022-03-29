import { useState } from "react";
import CalendarModal from "../modals/calendarModal";

const Filter = () => {
  // 유저 프로필 클릭 시 뜨는 팝업 창 관리 state
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const clickTimezone = (e) => {
    if (e.target.classList[2] === "clicked") {
      e.target.classList.remove("clicked");
    } else {
      e.target.classList.add("clicked");
    }
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="centerLine">
          <div className="checkbox-wrapper">
            <input type="checkbox" id="enter"></input>
            <label htmlFor="enter">입장 마감된 방 보기</label>
            <input type="checkbox" id="time"></input>
            <label htmlFor="time">시간 마감된 방 보기</label>
          </div>
          <div className="categories">
            <p>지역</p>
            <button className="directInput">지역추가</button>
          </div>
          <div className="categories">
            <p>시간</p>
            <button className="selectButton" onClick={clickTimezone}>
              새벽
            </button>
            <button className="selectButton" onClick={clickTimezone}>
              오전
            </button>
            <button className="selectButton" onClick={clickTimezone}>
              점심
            </button>
            <button className="selectButton" onClick={clickTimezone}>
              오후
            </button>
            <button className="selectButton" onClick={clickTimezone}>
              저녁
            </button>
            <button className="selectButton" onClick={clickTimezone}>
              밤
            </button>
            <p>직접입력</p>
            <input type="number"></input>
            <span>시 - </span>
            <input type="number"></input>
            <span>시</span>
          </div>
          <div className="categories">
            <p>시기</p>
            <button onClick={openModal}>&times;</button>
            <CalendarModal
              setDateFunction={false}
              open={modalOpen}
              close={closeModal}
            ></CalendarModal>
          </div>
          <div className="last-categories">
            <div>
              <p>인원</p>
              <div className=""></div>
            </div>
            <div>
              <button className="button-reset">초기화</button>
              <button className="button-application">적용</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .filter-wrapper {
          width: 100%;
          max-width: 1920px;
          height: 200px;
          margin-bottom: 10px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
        }

        .centerLine {
          width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .checkbox-wrapper {
          display: flex;
        }

        input[type="checkbox"] {
          width: 15px;
          height: 15px;
          border-radius: 7px;
          appearance: none;
          cursor: pointer;
          border: 1px solid #999;
          margin: 5px 5px 5px 20px;
        }

        input[type="checkbox"]:checked {
          background-color: #08555f;
          border: none;
        }

        input[type="number"] {
          width: 50px;
          height: 20px;
          border-radius: 11px;
          background-color: #f4f4f4;
          border: none;
          text-align: center;
        }

        .checkbox-wrapper label {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .categories {
          float: left;
          display: flex;
          align-items: center;
          width: 100%;
          height: 50px;
          border-bottom: 0.5px solid #bebebe;
        }

        .categories span {
          font-size: 1.1rem;
          margin: 4px;
        }

        .selectButton {
          width: 60px;
          height: 20px;
          border-radius: 11px;
          background-color: #f4f4f4;
          text-align: center;
          border: none;
          margin-right: 15px;
          cursor: pointer;
        }

        .clicked {
          background-color: #08555f;
          color: white;
        }

        .directInput {
          width: 80px;
          height: 20px;
          text-align: center;
          border-radius: 6px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
          border: solid 0.5px #d8d8d8;
          background-color: #fff;
          cursor: pointer;
        }

        .last-categories {
          float: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
        }

        p {
          font-size: 1.5rem;
          margin: 0 20px;
          font-weight: bold;
        }

        .button-reset {
          width: 120px;
          height: 30px;
          border-radius: 15px;
          background-color: #7f7f7f;
          border: none;
          margin-right: 10px;
          color: white;
          cursor: pointer;
        }

        .button-application {
          width: 120px;
          height: 30px;
          border-radius: 15px;
          background-color: #6db152;
          border: none;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Filter;
