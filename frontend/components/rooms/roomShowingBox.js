import { getAvailability } from "../../api/rooms";
import router from "next/router";
import moment from "moment";
import { FailResponse } from "../../api/failResponse";
import { useState } from "react";
import Image from "next/image";

const RoomShowingBox = (props) => {
  const DayOfTheWeek = {
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일",
    6: "토요일",
    7: "일요일",
  };
  const [tagLayout, setTagLayout] = useState(true);

  // 해당 방에 이미 참가중인지 여부 체크
  const isAttendance = () => {
    getAvailability(props.datas.roomId)
      .then((res) => {
        if (res.status.code === 1214 && res.content.attendance) {
          // 이미 참가중이라면 바로 방 상세 페이지로 이동
          router.push(`/room/${props.datas.roomId}`);
          return;
          // 아니라면 방 설명 페이지 (roomModal) 띄우기
        }

        if (res.status.code === 1210 && !res.content.attendance) {
          props.setRoomID ? props.setRoomID(props.datas.roomId) : "";
          props.openRoomExplainModal ? props.openRoomExplainModal() : "";
          return;
        }

        alert("알 수 없는 오류입니다.");
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code, isAttendance);
        }
      });
  };

  const handleTagLayout = () => {
    setTagLayout(!tagLayout);
  };

  return (
    <>
      <div
        className={`${props.slider ? "slider-wrapper" : "room-container"}`}
        onClick={() => {
          isAttendance();
        }}
      >
        <div className="thumbs-box">
          <Image
            src={
              props.datas.roomImagePath === ""
                ? "/base_profileImage.jpg"
                : `/images/${props.datas.roomImagePath}`
            }
            alt="picture of room"
            width={250}
            height={170}
          ></Image>
          <div className="tags" onClick={handleTagLayout}>
            {props.datas.tags.length !== 0
              ? props.datas.tags.map((tag, index) => {
                  return <p key={index}>{tag}</p>;
                })
              : ""}
          </div>
          <div className="participants">
            <p>{`${props.datas.participantCount} / ${props.datas.limitPeopleCount}`}</p>
          </div>
        </div>
        <div className="bodyLine">
          <h1>{`${props.datas.roomTitle}`}</h1>
          <p>
            {`${props.datas.startAppointmentDate.slice(0, 10)} ${
              DayOfTheWeek[
                moment(props.datas.startAppointmentDate).isoWeekday()
              ]
            } ${props.datas.startAppointmentDate.slice(11)} 모임`}
          </p>
        </div>
      </div>
      <style jsx>{`
        .room-container {
          width: 250px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .slider-wrapper {
          min-width: 250px;
          margin: 0 10px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .thumbs-box {
          width: 100%;
          height: 170px;
          background-color: #53927d;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .thumbs-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tags {
          position: relative;
          bottom: 170px;
          margin: 10px;
          height: 29px;
          ${tagLayout && `overflow-y: hidden;`}
        }

        .tags p {
          display: inline-block;
          margin-left: 10px;
          margin-top: 5px;
          padding: 5px;
          border: solid 1px #f0376f;
          color: #f0376f;
          font-size: 0.9rem;
          border-radius: 24px;
          background-color: rgba(0, 0, 0, 0.7);
        }

        .participants {
          position: relative;
          bottom: 90px;
          margin: 10px;
          display: flex;
          justify-content: right;
        }

        .participants p {
          color: white;
          font-size: 1rem;
          border: solid 0.5px white;
          border-radius: 24px;
          background-color: rgba(0, 0, 0, 0.7);
          padding: 5px;
        }

        .bodyLine {
          width: 100%;
          height: 80px;
          display: flex;
          border-top: solid 0.5px #d8d8d8;
          flex-direction: column;
          justify-content: space-between;
        }

        .bodyLine h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .bodyLine p {
          font-weight: 300;
          margin: 10px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default RoomShowingBox;
