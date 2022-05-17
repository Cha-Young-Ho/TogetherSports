import { getAvailability } from "../../api/rooms";
import router from "next/router";

const RoomShowingBox = (props) => {
  // 해당 방에 이미 참가중인지 여부 체크
  const isAttendance = () => {
    getAvailability(props.datas.roomId)
      .then((res) => {
        if (res.status.code === 1210 && res.content.attendance === "false") {
          // 이미 참가중이라면 바로 방 상세 페이지로 이동
          router.push(`/room/${props.datas.roomId}`);
          return;
          // 아니라면 방 설명 페이지 (roomModal) 띄우기
        }

        if (res.status.code === 1214 && res.content.attendance === "true") {
          props.setRoomID ? props.setRoomID(props.datas.roomId) : "";
          props.openRoomExplainModal ? props.openRoomExplainModal() : "";
          return;
        }

        alert("알 수 없는 오류입니다.");
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });
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
          <img
            src={
              props.datas.roomImagePath === ""
                ? "/base_profileImage.jpg"
                : `localhost:8080/${props.datas.roomImagePath}`
            }
          ></img>
          <div className="tags">
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
            {`${props.datas.startAppointmentDate.slice(
              0,
              10
            )} x요일 ${props.datas.startAppointmentDate.slice(11)} 모임`}
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
          min-width: 16%;
          margin: 0 2%;
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
          display: flex;
        }

        .tags p {
          margin-left: 10px;
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
