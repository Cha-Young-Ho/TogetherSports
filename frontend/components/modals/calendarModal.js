import { useState } from "react";
import Calendar from "../calendar/calendar";

const CalendarModal = (props) => {
  const [curSelectedDate, setCurSelectedDate] = useState("");

  // calendar의 현재 선택된 날 받아오기 위한 함수
  const setSelectedDate = (date) => {
    setCurSelectedDate((curSelectedDate = date));
  };

  const clickSelect = (e) => {
    if (curSelectedDate === "") {
      alert("날짜를 선택하셔야 합니다.");
      e.preventDefault();
      return;
    }

    if (props.setStartFilterDate) {
      props.setStartFilterDate(curSelectedDate);
    } else if (props.setEndFilterDate) {
      props.setEndFilterDate(curSelectedDate);
    }

    props.closeStart ? props.closeStart() : props.closeEnd();
  };

  return (
    <>
      <div
        className={
          props.openStart || props.openEnd ? "openModal modal" : "modal"
        }
      >
        <div className="calendarModal">
          {props.openStart || props.openEnd ? (
            <Calendar modalDateFunction={setSelectedDate} />
          ) : null}
          <div className="button-wrapper">
            <button className="select-button" onClick={clickSelect}>
              선택
            </button>
            <button
              className="exit-button"
              onClick={props.closeStart ? props.closeStart : props.closeEnd}
            >
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

        .calendarModal {
          width: 400px;
          height: 360px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .button-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          bottom: 10px;
        }

        .select-button {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 200px;
          height: 50px;
          border: none;
          cursor: pointer;
          background-color: #08555f;
          color: white;
        }

        .exit-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 50px;
          border: none;
          cursor: pointer;
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

export default CalendarModal;
