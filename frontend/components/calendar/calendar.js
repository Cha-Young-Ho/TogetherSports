import moment from "moment";
import { useEffect, useState } from "react";
import WeekWrapper from "./weekWrapper";

const Calendar = (props) => {
  // 선택된 날
  const [curSelectedDate, setCurSelectedDate] = useState("");

  useEffect(() => {
    if (props.setDateFunction) {
      console.log(props.setDateFunction);
      props.setDateFunction(curSelectedDate);
      return;
    }

    if (props.modalDateFunction) {
      props.modalDateFunction(curSelectedDate);
      return;
    }
  }, [curSelectedDate]);

  //이번 년도, 이번 달
  const [curYear, setCurYear] = useState(moment().year());
  const [curMonth, setCurMonth] = useState(moment().month());
  //이번 달 수
  const allDaysOfMonth = moment([curYear, 0, 31]).month(curMonth).format("DD");

  //이번 달 첫 1일의 요일
  const firstDayOfCurMonth = moment([curYear, curMonth, 1]).day();

  //이번 달 마지막 요일
  const lastDayOfCurMonth = moment([curYear, curMonth, allDaysOfMonth]).day();

  //저번 달 마지막 날짜
  const lastDateOfLastMonth = moment([curYear, 0, 31])
    .month(curMonth - 1)
    .format("DD");

  // 저번 달에 보여져야하는 day들
  const preCalendarDays = [];

  // 해당 달
  const curCalendarDays = [];

  // 다음 달
  const nextCalendarDays = [];

  // 보여져야하는 저번달 수
  if (firstDayOfCurMonth > 0) {
    for (let i = 0; i < firstDayOfCurMonth; i++) {
      preCalendarDays.push(lastDateOfLastMonth - firstDayOfCurMonth + i + 1);
    }
  }

  // 보여져야하는 이번달 수
  for (let i = 1; i <= allDaysOfMonth; i++) {
    curCalendarDays.push(
      `${curYear}-${String(curMonth + 1).padStart(2, 0)}-${i}`
    );
  }

  // 보여져야하는 다음달 수
  for (let i = 1; i < 7 - lastDayOfCurMonth; i++) {
    nextCalendarDays.push(`${i}`);
  }

  // 이전 달 이동
  const checkPreCalendar = () => {
    if (curMonth === 0) {
      setCurYear(curYear - 1);
      setCurMonth((curMonth = 11));
      return;
    }
    setCurMonth(curMonth - 1);
  };

  // 다음 달 이동
  const checkNextCalendar = () => {
    if (curMonth === 11) {
      setCurYear(curYear + 1);
      setCurMonth((curMonth = 0));
      return;
    }
    setCurMonth(curMonth + 1);
  };

  // 일자 선택
  const clickSelectDate = (e) => {
    if (e.target.classList[2] === "left") {
      if (curMonth === 0) {
        setCurYear(curYear - 1);
        setCurMonth((curMonth = 11));
        setCurSelectedDate(
          (curSelectedDate = `${curYear - 1}-${String(curMonth + 1).padStart(
            2,
            0
          )}-${e.target.innerText}`)
        );
        return;
      }
      setCurMonth(curMonth - 1);
      setCurSelectedDate(
        (curSelectedDate = `${curYear}-${String(curMonth).padStart(2, 0)}-${
          e.target.innerText
        }`)
      );
    } else if (e.target.classList[2] === "right") {
      if (curMonth === 11) {
        setCurYear(curYear + 1);
        setCurMonth((curMonth = 0));
        setCurSelectedDate(
          (curSelectedDate = `${curYear + 1}-${String(curMonth + 1).padStart(
            2,
            0
          )}-${e.target.innerText}`)
        );
        return;
      }

      setCurMonth(curMonth + 1);
      setCurSelectedDate(
        (curSelectedDate = `${curYear}-${String(curMonth + 2).padStart(2, 0)}-${
          e.target.innerText
        }`)
      );
    } else {
      if (e.target.classList[3] === "clicked") {
        e.target.classList.remove("clicked");
      } else {
        e.target.classList.add("clicked");
      }
      setCurSelectedDate(
        (curSelectedDate = `${curYear}-${String(curMonth + 1).padStart(2, 0)}-${
          e.target.innerText
        }`)
      );
    }
  };

  return (
    <>
      <div className="calendar-container">
        <div className="header">
          <button
            className="left-button"
            onClick={checkPreCalendar}
          >{`<`}</button>
          <div className="year-month-text">{`${curYear}.${curMonth + 1}`}</div>
          <div className="right-button" onClick={checkNextCalendar}>{`>`}</div>
        </div>
        <WeekWrapper />
        <div className="calendar-body">
          <div className="week-of-month-ko"></div>
          <div className="days-grid">
            {preCalendarDays.map((date, index) => (
              <button
                key={`dates-${date}-${index}`}
                className={`special-days-in-grid left`}
                onClick={clickSelectDate}
              >
                {date}
              </button>
            ))}
            {curCalendarDays.map((date, index) => {
              if (curSelectedDate === date) {
                return (
                  <button
                    key={`dates-${date}-${index}`}
                    className={`days-in-grid clicked`}
                    onClick={clickSelectDate}
                  >
                    {date.substring(8)}
                  </button>
                );
              } else {
                return (
                  <button
                    key={`dates-${date}-${index}`}
                    className={`days-in-grid ${curYear}-${curMonth + 1}-${
                      index + 1
                    }`}
                    onClick={clickSelectDate}
                  >
                    {date.substring(8)}
                  </button>
                );
              }
            })}
            {nextCalendarDays.map((date, index) => (
              <button
                key={`dates-${date}-${index}`}
                className={`special-days-in-grid right`}
                onClick={clickSelectDate}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .calendar-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .header {
          width: 100%;
          height: 45px;
          background-color: #08555f;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .left-button {
          cursor: pointer;
          outline: none;
          border: none;
          color: white;
          font-size: 2rem;
          padding: 10px;
          border-radius: 12px;
          background: #08555f;
        }

        .year-month-text {
          color: white;
          font-size: 1.5rem;
        }

        .right-button {
          cursor: pointer;
          outline: none;
          border: none;
          color: white;
          font-size: 2rem;
          padding: 10px;
          border-radius: 12px;
          background: #08555f;
        }

        .calendar-body {
          width: 100%;
          background-color: white;
        }

        .days-grid {
          width: 100%;
          margin: 0px auto;
          display: grid;
          grid-template-rows: repeat(6, 40px);
          grid-template-columns: repeat(7, 1fr);
        }

        .days-in-grid {
          cursor: pointer;
          outline: none;
          border: none;
          background-color: white;
          color: black;
          font-weight: bold;
          margin: 3px 12px;
        }

        .days-in-grid:hover {
          background-color: #2b7a5f;
          border-radius: 100px;
          color: white;
        }

        .special-days-in-grid {
          cursor: pointer;
          outline: none;
          border: none;
          background-color: white;
          color: lightgrey;
          font-weight: bold;
          margin: 3px 12px;
        }

        .special-days-in-grid:hover {
          background-color: tomato;
          border-radius: 100px;
          color: white;
        }

        .clicked {
          background-color: #468f5b;
          border-radius: 100px;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Calendar;
