import RoomInfoNavBar from "../../../components/roomInfoNavBar";
import { useState } from "react";
// import ko from "date-fns/locale/ko";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import Calendar from "../../../components/calendar/calendar";

const RoomSchedule = () => {
  return (
    <>
      <div className="bg-container">
        <RoomInfoNavBar
          roomSetting_atv={`deactivation`}
          roomSchedule_atv={`activation`}
          roomTagInfo_atv={`deactivation`}
        />
        <div className="content-showbox">
          <p>달력에서 날짜를 체크해주세요!</p>
        </div>
        <div className="calendar">
          <Calendar />
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
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 20px 0;
          font-weight: bold;
        }

        .calendar {
          width: 400px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }
      `}</style>
    </>
  );
};

export default RoomSchedule;
