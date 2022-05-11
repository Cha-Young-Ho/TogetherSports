import RoomInfoNavBar from "../../../components/roomInfoNavBar";
import Calendar from "../../../components/calendar/calendar";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import moment from "moment";

const RoomSchedule = () => {
  const dispatch = useDispatch();
  const [curSelectedDate, setCurSelectedDate] = useState("");

  // calendar의 현재 선택된 날 받아오기 위한 함수
  const setSelectedDate = (date) => {
    setCurSelectedDate((curSelectedDate = date));
  };

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [runningTime, setRunningTime] = useState("");

  const optionHour = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const optionRunningTime = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
    9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
    17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5,
  ];

  const clickNextBtn = (e) => {
    //예외 처리
    if (curSelectedDate === "") {
      e.preventDefault();
      alert("달력에서 원하시는 날짜를 선택해 주세요.");
      return;
    }

    if (hour === "" || minute === "" || runningTime === "") {
      e.preventDefault();
      alert("시간을 입력해 주세요.");
      return;
    }

    if (minute < 0 || minute > 59) {
      e.preventDefault();
      alert("0~59의 숫자만 입력 가능합니다.");
      return;
    }

    let runningHour = 0;
    let runningMinute = 0;

    if (runningTime % 1 !== 0) {
      runningMinute = 30;
      runningHour = Math.floor(runningTime / 1);
    } else {
      runningHour = runningTime;
    }

    let endTime = moment(
      new Date(
        curSelectedDate.substring(0, 4),
        curSelectedDate.substring(5, 7) - 1,
        curSelectedDate.substring(8, 10),
        hour,
        minute
      )
    );
    endTime.add(runningHour, "hours");
    endTime.add(runningMinute, "minutes");

    dispatch({
      type: "ROOMSCHEDULE",
      payload: {
        startAppointmentDate: `${curSelectedDate}T${String(hour).padStart(
          2,
          0
        )}:${String(minute).padStart(2, 0)}`,
        endAppointmentDate: `${endTime.year()}-${String(
          endTime.month() + 1
        ).padStart(2, 0)}-${String(endTime.date()).padStart(2, 0)}T${String(
          endTime.hours()
        ).padStart(2, 0)}:${String(endTime.minutes()).padStart(2, 0)}`,
      },
    });
  };

  return (
    <>
      <div className="bg-container">
        <RoomInfoNavBar
          roomSetting_atv={`deactivation`}
          roomSchedule_atv={`activation`}
          roomTagInfo_atv={`deactivation`}
        />

        <div className="content-showbox">
          <p>모이는 일정 설정하기</p>
        </div>

        <p>🗓️ 달력에서 날짜를 선택해주세요 ! 🗓️</p>

        <div className="calendar">
          <Calendar setDateFunction={setSelectedDate} />
        </div>

        <div className="line"></div>

        <div className="dateTime">
          <p>⏰ 시작시간을 입력해주세요 ! ⏰</p>
          <div>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {optionHour.map((hour, index) => (
                <option key={index}>{hour}</option>
              ))}
            </select>
            <p>시</p>
            <p>:</p>
            <input
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              onKeyUp={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              type="number"
              min="0"
              max="59"
            />
            <p>분</p>
          </div>

          <p>⏰ 소요되는 시간을 입력해주세요 ! ⏰</p>
          <div>
            <select
              value={runningTime}
              onChange={(e) => setRunningTime(e.target.value)}
            >
              {optionRunningTime.map((time, index) => (
                <option key={index}>{time}</option>
              ))}
            </select>
            <p>시간</p>
          </div>
        </div>

        <div className="button-wrapper">
          <Link href="/room/createroom/roomsetting">
            <button className="button-prev">이전</button>
          </Link>
          <Link href="/room/createroom/roomtaginfo">
            <button className="button-done" onClick={clickNextBtn}>
              다음
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .bg-container {
          margin-top: 10px;
          border-top: 1px solid #e4e8eb;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .content-showbox {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 20px 0;
          font-weight: bold;
        }

        .line {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: none;
        }

        .content-showbox > p {
          margin: 5px 0;
          font-weight: normal;
        }

        .bg-container > p {
          font-weight: normal;
        }

        .calendar {
          width: 400px;
          height: 300px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          margin-bottom: 30px;
        }

        .dateTime {
          width: 600px;
          height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dateTime > p {
          font-weight: normal;
        }

        .dateTime > div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .dateTime > div > p:nth-child(2) {
          margin-right: 10px;
        }

        select,
        input {
          width: 85px;
          height: 40px;
          padding: 0 10px;
          margin: 0 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-size: 1.5em;
        }

        .dateTime > div:nth-child(4) > select {
          width: 150px;
        }

        .button-wrapper {
          margin: 50px 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .button-prev {
          width: 120px;
          height: 40px;
          background-color: #d8d8d8;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-right: 10px;
        }

        .button-done {
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default RoomSchedule;
