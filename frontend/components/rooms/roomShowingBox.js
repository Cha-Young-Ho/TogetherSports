const RoomShowingBox = (props) => {
  return (
    <>
      <div
        className="room-container"
        onClick={() => {
          props.setRoomID ? props.setRoomID(props.datas.roomId) : "";
          props.openRoomExplainModal ? props.openRoomExplainModal() : "";
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
