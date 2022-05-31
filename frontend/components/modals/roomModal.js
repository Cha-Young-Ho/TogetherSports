import { useState, useEffect } from "react";
import Calendar from "../calendar/calendar";
import { getRoomInfo, postEnterRoom } from "../../api/rooms";
import ImageSlide from "../imageSlide";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Map from "../Map";

/* roomList에서 받은 각 room들의 roomId를 props로 받기 */
const RoomModal = (props) => {
  const dispatch = useDispatch();

  /* response content 담을 변수들 */
  const [roomId, setRoomId] = useState(0); // 참여페이지로 넘어가기 위한 roomId
  const [creatorNickName, setCreatorNickName] = useState(""); // 방 생성자
  const [host, setHost] = useState(""); // 방장
  const [roomTitle, setRoomTitle] = useState("");
  const [roomContent, setRoomContent] = useState("");
  const [roomArea, setRoomArea] = useState("");
  const [limitPeopleCount, setLimitPeopleCount] = useState(2); // 초기값 수정할수도
  const [participantCount, setParticipantCount] = useState(2);
  const [exercise, setExercise] = useState("");
  const [tags, setTags] = useState([]);
  const [startAppointmentDate, setStartAppointmentDate] = useState("");
  const [endAppointmentDate, setEndAppointmentDate] = useState("");
  const [viewCount, setViewCount] = useState(0);
  // const [roomImages, setRoomImages] = useState([]);

  const enterRoom = (e) => {
    postEnterRoom(roomId)
      .then((res) => {
        if (res.status.code === 1209) {
          router.push(`/room/${roomId}`);
          return;
        }

        if (res.status.code === 1201) {
          e.preventDefault();
          alert(res.status.message);
          return;
        }

        if (res.status.code === 1202) {
          e.preventDefault();
          alert(res.status.message);
          return;
          // FailResponse(res.status.code);
          // return;
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });
  };

  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
      // 방 정보 받아오기
      getRoomInfo(props.roomId).then((res) => {
        if (res.status.code === 5000) {
          setRoomId((roomId = res.content.roomId));
          setCreatorNickName((creatorNickName = res.content.creatorNickName));
          setHost((host = res.content.host));
          setRoomTitle((roomTitle = res.content.roomTitle));
          setRoomContent((roomContent = res.content.roomContent));
          setRoomArea((roomArea = res.content.roomArea));
          setLimitPeopleCount(
            (limitPeopleCount = res.content.limitPeopleCount)
          );
          setParticipantCount(
            (participantCount = res.content.participantCount)
          );
          setExercise((exercise = res.content.exercise));
          setTags((tags = res.content.tags));
          setStartAppointmentDate(
            (startAppointmentDate = res.content.startAppointmentDate)
          );
          setEndAppointmentDate(
            (endAppointmentDate = res.content.endAppointmentDate)
          );
          setViewCount((viewCount = res.content.viewCount));
          // setRoomImages(
          //   (roomImages =
          //     res.content.roomImages === null
          //       ? {
          //           order: 0,
          //           imagePath: "logo-sign.png",
          //         }
          //       : res.content.roomImages)
          // );

          dispatch({
            type: "SAVEROOMMODALIMAGES",
            payload: {
              roomImages:
                res.content.roomImages === null
                  ? {
                      order: 0,
                      imagePath: "logo-sign.png",
                    }
                  : res.content.roomImages,
            },
          });

          // 캘린더 컴포넌트 date 변경
          dispatch({
            type: "SAVEROOMDATE",
            payload: {
              appointmentDate: `${
                startAppointmentDate[8] === "0"
                  ? startAppointmentDate.substr(0, 8) + startAppointmentDate[9]
                  : startAppointmentDate.substr(0, 10)
              }`,
            },
          });

          dispatch({
            type: "SAVEPOM",
            payload: {
              placeOfMeeting: roomArea,
            },
          });
        } else {
          FailResponse(res.status.code);
        }
      });
    }
  }, [props.open]);

  return (
    <>
      <div
        className={props.open ? "openModal modal" : "modal"}
        onClick={(e) => {
          if (e.target.classList[1] === "openModal") props.close();
        }}
      >
        <div className="room-modal-body">
          <div className="header">
            <div>
              {tags.length !== 0 ? (
                tags.map((tag, index) => {
                  return (
                    <div className="tag" key={index}>
                      {tag}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <div>
              <div className="viewCount">{`조회수 : ${viewCount}`}</div>
              <div className="nickName">{`ID : ${host}님의 방`}</div>
            </div>
          </div>

          <div className="section">
            <div className="left-section">
              <p>{roomTitle}</p>

              <div className="options">
                <div className="option">
                  <p>참여인원</p>
                  <p>{participantCount}</p>
                </div>
                <div className="option">
                  <p>모집인원</p>
                  <p>{limitPeopleCount}</p>
                </div>
                <div className="option-exercise">
                  <p>종목</p>
                  <p>{exercise}</p>
                </div>
                <div className="option-time">
                  <p>시간</p>
                  <p>{`${startAppointmentDate.substr(
                    11,
                    2
                  )}시 ${startAppointmentDate.substr(14, 2)}분 ~`}</p>
                  <p>{`${endAppointmentDate.substr(
                    11,
                    2
                  )}시 ${endAppointmentDate.substr(14, 2)}분`}</p>
                </div>
              </div>

              <div className="calendar">
                <Calendar
                  clickDateOptionFunction={true}
                  moveDateButtonOptionFunction={true}
                />
              </div>

              <div className="location">
                <p>위치 정보</p>
                <div></div>
                <p className="address-info">{roomArea}</p>
                <div className="map-wrapper">
                  <Map setPOM={"true"} />
                </div>
              </div>
            </div>

            <div className="right-section">
              <div className="image">
                <ImageSlide path={"roomInfo"} />
              </div>

              <div className="room-info">
                <p>방 설명 및 안내</p>
                <div className="line"></div>
                <textarea readOnly value={roomContent}></textarea>
              </div>

              <div className="buttons">
                <button className="left-button" onClick={props.close}>
                  닫기
                </button>
                <button className="right-button" onClick={enterRoom}>
                  참여
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        textarea:focus {
          outline: none;
        }

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
          overflow: auto;
          animation: modal-bg-show 0.3s; // 스르륵 효과
        }

        @media (max-height: 720px) {
          .modal.openModal {
            display: flex;
            align-items: stretch;
            justify-content: center;
          }
        }

        @media (max-width: 1150px) {
          .modal.openModal {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
        }

        @media (max-height: 720px) and (max-width: 1150px) {
          .modal.openModal {
            display: flex;
            align-items: stretch;
            justify-content: flex-start;
          }
        }

        .room-modal-body {
          margin: 10px;
          min-width: 1150px;
          height: 720px;
          border-radius: 22px;
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 30px;
          overflow: auto;
        }

        .header {
          width: 100%;
          height: 5%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .header div {
          display: flex;
          flex-direction: row;
        }

        .tag,
        .viewCount,
        .nickName {
          height: 100%;
          padding: 0 10px;
          margin-right: 10px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          font-weight: bold;
          font-size: 1.2rem; // 수정필요한지 확인필요
          display: flex;
          align-items: center;
        }

        .nickName {
          margin-right: 0px;
        }

        .section {
          width: 100%;
          height: 95%;
          display: flex;
          flex-direction: row;
        }

        .left-section {
          width: 40%;
          height: 100%;
        }

        .left-section > div,
        .left-section > p {
          display: flex;
          justify-content: left;
          align-items: center;
          margin-bottom: 10px;
        }

        .left-section > p {
          height: 5%;
          font-size: 2.5rem;
          font-weight: bold;
        }

        .options {
          width: 100%;
          height: 13%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .option,
        .option-exercise,
        .option-time {
          min-height: 80%;
          margin-right: 10px;
          padding: 10px 10px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .option-time {
          margin-right: 0px;
        }

        .options > div > p:nth-child(1) {
          font-size: 1.3rem;
          margin-bottom: 5px;
        }

        .option > p:nth-child(2),
        .option-exercise > p:nth-child(2) {
          font-size: 2rem;
          font-weight: bold;
        }

        .option-time > p:nth-child(2),
        .option-time > p:nth-child(3) {
          font-weight: bold;
          font-size: 1.3rem;
        }

        .calendar {
          width: 100%;
          height: 35%;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .location {
          width: 100%;
          height: 40%;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px;
        }

        .location p:nth-child(1) {
          font-weight: bold;
          margin-top: 5px;
          font-size: 1.3rem;
        }

        .location p:nth-child(3) {
          font-size: 1.3rem;
          margin-bottom: 5px;
        }

        .location > div:nth-child(2) {
          width: 80%;
          height: 0;
          margin: 10px 0;
          border: solid 0.3px #707070;
        }

        .map-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
        }

        .right-section {
          width: 60%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 20px;
        }

        .image {
          width: 100%;
          height: 55%;
        }

        .room-info {
          width: 100%;
          height: 35%;
          margin-top: 10px;
        }

        .buttons {
          width: 100%;
          height: 5%;
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .room-info > p {
          display: flex;
          justify-content: left;
          font-weight: bold;
          font-size: 1.3rem;
        }

        .room-info > div {
          margin: 10px 0;
          width: 100%;
          height: 0;
          border: solid 0.3px #707070;
        }

        .room-info textarea {
          width: 100%;
          height: 70%;
          padding: 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
          resize: none;
        }

        .left-button,
        .right-button {
          padding: 10px 60px;
          border: none;
          border-radius: 25px;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .left-button {
          background-color: #d8d8d8;
          margin-right: 10px;
        }

        .right-button {
          background-color: #00555f;
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

export default RoomModal;
