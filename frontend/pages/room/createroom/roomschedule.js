import RoomInfoNavBar from "../../../components/roomInfoNavBar";
import { useState } from "react";
import styled from "styled-components";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate);

  // const Wrapper = styled(DatePicker)`
  //   border-radius: 20px;
  //   border: 1px solid tomato;
  // `;

  const Wrapper = styled(DatePicker)`
    .react-datepicker {
      font-family: "Helvetica Neue", helvetica, arial, sans-serif;
      font-size: 1.5rem;
      background-color: #fff;
      color: #000;
      border: 20px solid #aeaeae !important;
      border-radius: 0.3rem;
      display: inline-block;
      position: relative;
    }
  `;

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
        <Wrapper
          locale={ko}
          selected={startDate}
          inline
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          withPortal
        />
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
      `}</style>
    </>
  );
};

export default RoomSchedule;
