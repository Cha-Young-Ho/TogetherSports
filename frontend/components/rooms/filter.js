import { useState } from "react";
import CalendarModal from "../modals/calendarModal";
import SelectExercise from "./selectExercise";
import AddAreaModal from "../modals/addAreaModal";

const Filter = () => {
  // 모달 관리 state
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [areaModalOpen, setAreaModalOpen] = useState(false);

  const openCalendarModal = () => {
    setCalendarModalOpen(true);
  };
  const closeCalendarModal = () => {
    setCalendarModalOpen(false);
  };

  const openAreaModal = () => {
    setAreaModalOpen(true);
  };

  const closeAreaModal = () => {
    setAreaModalOpen(false);
  };

  // 시간 (태그로 된 선택)
  const clickTimezone = (e) => {
    if (e.target.classList[2] === "clicked") {
      e.target.classList.remove("clicked");
    } else {
      e.target.classList.add("clicked");
    }
  };

  // 시기
  const [curFilteringDate, setCurFilteringDate] = useState("");

  // calendarModal의 시기 받아오기 위한 함수
  const setFilterDate = (date) => {
    setCurFilteringDate((curFilteringDate = date));
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
            <button className="directInput" onClick={openAreaModal}>
              지역추가
            </button>
            <AddAreaModal
              open={areaModalOpen}
              close={closeAreaModal}
            ></AddAreaModal>
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
            <button
              className="modalCalendar"
              onClick={openCalendarModal}
            ></button>
            <div className="date-showBox">
              {curFilteringDate.substring(0, 4)}
            </div>
            <p>년</p>
            <div className="date-showBox">
              {curFilteringDate.substring(6, 7)}
            </div>
            <p>월</p>
            <div className="date-showBox">{curFilteringDate.substring(8)}</div>
            <p>일</p>
            <CalendarModal
              setFilterDate={setFilterDate}
              open={calendarModalOpen}
              close={closeCalendarModal}
            ></CalendarModal>
          </div>
          <div className="last-categories">
            <p>입장가능인원</p>
            <input type="number"></input>
            <p> 명 이상</p>
          </div>
          <SelectExercise />
          <div className="buttons-wrapper">
            <button className="button-reset">초기화</button>
            <button className="button-application">적용</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .filter-wrapper {
          width: 100%;
          max-width: 1920px;
          height: 350px;
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
          margin: 15px;
        }

        input[type="checkbox"] {
          width: 15px;
          height: 15px;
          border-radius: 7px;
          appearance: none;
          cursor: pointer;
          border: 1px solid #999;
          margin: 5px 10px 5px 20px;
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

        .modalCalendar {
          width: 30px;
          height: 25px;
          margin-right: 20px;
          background-image: url("/calendar-modal-img.png");
          background-size: cover;
          border: none;
          background-color: white;
          cursor: pointer;
        }

        .date-showBox {
          width: 80px;
          height: 30px;
          background-color: #f4f4f4;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3rem;
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
          align-items: center;
          width: 100%;
          height: 50px;
          border-bottom: 0.5px solid #bebebe;
        }

        p {
          font-size: 1.5rem;
          margin: 0 20px;
          font-weight: bold;
        }

        .buttons-wrapper {
          margin: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
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
