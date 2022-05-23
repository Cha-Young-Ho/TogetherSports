import Link from "next/link";
import { useState, useEffect } from "react";
import ImageSlide from "../../components/imageSlide";
import Calendar from "../../components/calendar/calendar";
import ParticipantList from "../../components/rooms/participantList";
import UserInfoModal from "../../components/modals/userInfoModal";
import ModifyRoomModal from "../../components/modals/modifyRoomModal";
import Chatting from "../../components/chatting";
import FailResponse from "../../api/failResponse";
import { getRoomDetail, leaveRoom, deleteRoom } from "../../api/rooms";
import { getMyInfo } from "../../api/members";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../components/Map";
import AlarmModal from "../../components/modals/alarmModal";
import StompJS from "stompjs";
import SockJS from "sockjs-client";

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { roomId } = router.query;
  const [chatOpen, setChatOpen] = useState(false);

  const [roomContent, setRoomContent] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [roomArea, setRoomArea] = useState("");
  const [exercise, setExercise] = useState("");
  const [limitPeopleCount, setLimitPeopleCount] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);
  const [startAppointmentDate, setStartAppointmentDate] = useState("");
  const [endAppointmentDate, setEndAppointmentDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [host, setHost] = useState("짱구");
  const [creatorNickName, setCreatorNickName] = useState("");
  const [roomImages, setRoomImages] = useState([
    {
      // 임시 데이터
      order: -1,
      imagePath: "logo-sign.png",
    },
  ]);
  const [tags, setTags] = useState([]);
  const [viewCount, setViewCount] = useState(0);

  const webSocketInfo = useSelector(
    (state) => state.saveWebSocketReducer.sockJS
  );

  // 안쓸 것 같지만 일단 받아오는 데이터
  // const [roomId, setRoomId] = useState(0);
  // const [attendance, setAttendance] = useState(false);

  // 참가자 목록에 대한 필드
  const [participants, setParticipants] = useState([
    {
      // 임시 데이터
      id: 1,
      userNickname: "짱구",
      mannerPoint: 10,
      gender: "male",
      activeAreas: ["서울특별시 강남구 강남동"],
      interests: ["축구", "야구", "농구"],
      userProfileImagePath: "",
    },
    {
      // 임시 데이터
      id: 2,
      userNickname: "짱아",
      mannerPoint: 10,
      gender: "female",
      activeAreas: ["서울특별시 강남구 강남동"],
      interests: ["축구", "야구", "농구"],
      userProfileImagePath: "",
    },
  ]);

  // 내가 방장인지 아닌지 확인하기 위한 변수
  const [myNickname, setMyNickname] = useState("짱구");

  // 방 수정하기
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const openModifyModal = () => setModifyModalOpen(true);
  const closeModifyModal = () => setModifyModalOpen(false);

  // 접속자 목록 modal 관련 데이터
  const [participantListModalOpen, setParticipantListModalOpen] =
    useState(false);
  const participantListOpenModal = () => setParticipantListModalOpen(true);
  const participantListCloseModal = () => setParticipantListModalOpen(false);

  // 방 나가기 여부 재차 확인 modal 관련 데이터
  const [alarmModalOpen, setAlarmModalOpen] = useState(false);
  const openAlarmModal = () => setAlarmModalOpen(true);
  const closeAlarmModal = () => setAlarmModalOpen(false);

  // 방 나가기
  const onLeaveRoom = () => {
    leaveRoom(roomId)
      .then((res) => {
        if (res.status.code === 1203) {
          alert("방을 성공적으로 나갔습니다 !"); // 임시 텍스트
          router.push("/room/roomlist"); // 방 목록 페이지로 이동
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });

    router.push("/room/roomlist"); // test를 위한 임시 라우팅
  };

  // 방 삭제하기
  const onDeleteRoom = () => {
    deleteRoom(roomId)
      .then((res) => {
        if (res.status.code === 5000) {
          alert("방을 성공적으로 삭제하였습니다 !"); // 임시 텍스트
          router.push("/room/roomlist"); // 방 목록 페이지로 이동
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });

    router.push("/room/roomlist"); // test를 위한 임시 라우팅
  };

  const updateRoomDataFunc = (content) => {
    setRoomTitle(content.roomTitle);
    setRoomContent(content.roomContent);
    setLimitPeopleCount(content.limitPeopleCount);
    setTags(content.tags);
    setRoomImages(content.roomImages);
    alert("방 정보가 변경되었습니다.");
  };

  useEffect(() => {
    if (roomId) {
      getRoomDetail(roomId)
        .then((res) => {
          if (res.status.code === 5000) {
            const roomInfo = res.content.roomOfInfo;

            // setRoomId(roomId = roomInfo.roomId);
            setRoomContent((roomContent = roomInfo.roomContent));
            setRoomTitle((roomTitle = roomInfo.roomTitle));
            setRoomArea((roomArea = roomInfo.roomArea));
            setExercise((exercise = roomInfo.exercise));
            setLimitPeopleCount((limitPeopleCount = roomInfo.limitPeopleCount));
            setParticipantCount((participantCount = roomInfo.participantCount));
            setStartAppointmentDate(
              (startAppointmentDate = roomInfo.startAppointmentDate)
            );
            setEndAppointmentDate(
              (endAppointmentDate = roomInfo.endAppointmentDate)
            );
            setCreatedTime((createdTime = roomInfo.createdTime));
            setUpdatedTime((updatedTime = roomInfo.updatedTime));
            setHost((host = roomInfo.host));
            setCreatorNickName((creatorNickName = roomInfo.creatorNickName));
            setRoomImages(
              (roomImages =
                roomInfo.roomImages === null
                  ? {
                      order: 0,
                      imagePath: "logo-sign.png",
                    }
                  : roomInfo.roomImages)
            );
            setTags((tags = roomInfo.tags));
            setViewCount((viewCount = roomInfo.viewCount));
            // setAttendance(attendance = roomInfo.attendance);

            setParticipants((participants = res.content.participants));

            dispatch({
              type: "SAVEROOMDATE",
              payload: {
                appointmentDate: `${
                  roomInfo.startAppointmentDate[8] === "0"
                    ? roomInfo.startAppointmentDate.substr(0, 8) +
                      roomInfo.startAppointmentDate[9]
                    : roomInfo.startAppointmentDate.substr(0, 10)
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
        })
        .catch((error) => {
          if (error.response) {
            FailResponse(error.response.data.status.code);
          }
        });

      dispatch({
        type: "SAVEROOMID",
        payload: {
          roomId: roomId,
        },
      });

      setChatOpen(true);
    }
  }, [roomId]);

  // 내 정보 얻기 (방장 확인용)
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        if (res.status.code === 5000) {
          setMyNickname((myNickname = res.content.userNickname));
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });

    dispatch({
      type: "SAVEWEBSOCKET",
      payload: {
        sockJS: new SockJS("http://localhost:8080/api/websocket"),
      },
    });
  }, []);

  useEffect(() => {
    if (webSocketInfo) {
      dispatch({
        type: "SAVECLIENT",
        payload: {
          client: StompJS.over(webSocketInfo),
        },
      });
    }
  }, [webSocketInfo]);

  return (
    <>
      <div className="container">
        <div className="main-info">
          <div className="header">
            <div className="viewCount">
              <p>{`조회수 : ${viewCount}`}</p>
              <p>{`생성 일시 : ${createdTime}`}</p>
              {updatedTime === "" ? (
                <></>
              ) : (
                <p>{`최근 수정 : ${updatedTime}`}</p>
              )}
            </div>

            <div className="long-line"></div>

            <div className="tags">
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

            <div className="title">
              <p>{roomTitle}</p>
              <div>
                {myNickname === host ? (
                  <button className="button-modify" onClick={openModifyModal}>
                    수정하기
                  </button>
                ) : (
                  <></>
                )}

                <button className="button-leave" onClick={openAlarmModal}>
                  나가기
                </button>

                <AlarmModal
                  open={alarmModalOpen}
                  close={closeAlarmModal}
                  content={"정말 방을 나가시겠습니까?"}
                  result={onLeaveRoom}
                  leftButton={"예"}
                  rightButton={"아니오"}
                ></AlarmModal>

                <ModifyRoomModal
                  open={modifyModalOpen}
                  close={closeModifyModal}
                  roomId={roomId}
                ></ModifyRoomModal>
              </div>
            </div>
          </div>

          <div className="sections">
            <div className="left-section">
              <div className="image">
                {roomImages.length !== 0 ? (
                  <ImageSlide imageArr={roomImages} />
                ) : (
                  <></>
                )}
              </div>
              <div className="calendar">
                <Calendar
                  clickDateOptionFunction={true}
                  moveDateButtonOptionFunction={true}
                />
              </div>
            </div>

            <div className="middle-section">
              <div className="options">
                <div className="option">
                  <p>참여인원</p>
                  <p>{participantCount}</p>
                </div>
                <div className="option">
                  <p>모집인원</p>
                  <p>{limitPeopleCount}</p>
                </div>
                <div className="option">
                  <p>종목</p>
                  <p>{exercise}</p>
                </div>
                <div className="option-time">
                  <p>시간</p>
                  <p>{`${startAppointmentDate.substr(
                    11,
                    2
                  )}시 ${startAppointmentDate.substr(-2)}분 ~`}</p>
                  <p>{`${endAppointmentDate.substr(
                    11,
                    2
                  )}시 ${endAppointmentDate.substr(-2)}분`}</p>
                </div>
              </div>

              <div className="participant-list">
                <p>참여자 목록 (10/30)</p>
                <div className="short-line"></div>
                <div className="participants">
                  <ParticipantList
                    participantArr={participants}
                    host={host}
                    participantListOpenModal={participantListOpenModal}
                  />
                </div>
                <UserInfoModal
                  open={participantListModalOpen}
                  close={participantListCloseModal}
                  path={"partyList"}
                />
              </div>
            </div>

            <div className="right-section">
              <div className="chatting-box">
                <div className="master">
                  <p>{`ID : ${host}님의 방`}</p>
                </div>

                <Chatting
                  chatOpen={chatOpen}
                  updateRoomDataFunc={updateRoomDataFunc}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="room-info">
          <p>방 설명 및 안내</p>
          <div className="long-line"></div>
          <div className="info-textarea">{roomContent}</div>
        </div>

        <div className="location-info">
          <div>
            <p>위치 정보</p>
            <p>{roomArea}</p>
          </div>
          <div className="long-line"></div>
          <div className="map-wrapper">
            <Map setPOM={"true"} />
          </div>
        </div>

        {myNickname === host ? (
          <button className="button-deleteRoom">방 삭제하기</button>
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .short-line {
          width: 90%;
          height: 0;
          margin: 15px 25px;
          border: solid 0.3px #707070;
        }

        .long-line {
          width: 1200px;
          height: 0;
          margin: 15px 0px;
          border: solid 0.3px #707070;
        }

        .container > div {
          width: 1200px;
          margin-top: 60px;
        }

        .header {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .header > .long-line {
          margin: 5px 0 10px 0;
        }

        .viewCount {
          display: flex;
          flex-direction: row;
          /* justify-content: right; */
        }

        .viewCount > p {
          font-size: 1.3rem;
          margin-right: 30px;
          /* margin-left: 30px; */
        }

        .tags {
          display: flex;
          flex-direction: row;
          margin-bottom: 10px;
        }

        .tag {
          height: 25px;
          padding: 0 10px;
          margin-right: 10px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          font-weight: bold;
          font-size: 1.3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .title p {
          font-size: 2.7rem;
          font-weight: bold;
        }

        .button-modify,
        .button-leave {
          width: 125px;
          height: 35px;
          border: none;
          border-radius: 20px;
          font-weight: bold;
          letter-spacing: 1px;
          color: white;
          cursor: pointer;
        }

        .button-modify {
          background-color: #d8d8d8;
          margin-right: 10px;
        }

        .button-leave {
          background-color: #00555f;
        }

        .sections {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .sections > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .image {
          width: 315px;
          height: 286px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .calendar {
          width: 100%;
          height: 200px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .options {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .option {
          height: 80px;
          margin-right: 20px;
          padding: 10px 15px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .option-time {
          height: 80px;
          padding: 10px 15px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .option > p:nth-child(1),
        .option-time > p:nth-child(1) {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .option > p:nth-child(2) {
          font-weight: bold;
          font-size: 2.5rem;
        }

        .option-time > p:nth-child(2),
        .option-time > p:nth-child(3) {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .participant-list {
          width: 100%;
          height: 410px;
          margin-top: 15px;
          padding: 20px 15px;
          border-radius: 15px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .participant-list > p {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .participants {
          width: 90%;
        }

        .chatting-box {
          width: 400px;
          height: 100%;
          padding: 15px 15px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .master {
          width: 100%;
          height: 27px;
          padding: 0 10px;
          border-radius: 13.5px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: white;
          display: flex;
          justify-content: right;
          align-items: center;
        }

        .master p {
          font-size: 1.3rem;
        }

        /* .chatting {
          width: 100%;
          height: 433px;
          padding: 15px 15px;
          border-radius: 15px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dialog {
          width: 100%;
          height: 90%;
          margin-bottom: 10px;
          overflow: scroll;
          overflow-x: hidden;
        }

        .dialog-input {
          width: 100%;
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .dialog-input input {
          width: 300px;
          height: 30px;
          padding: 0 10px;
          border: none;
          border-radius: 15px;
          background-color: #f4f4f4;
        }

        .dialog-input button {
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 50%;
          user-select: none;
          cursor: pointer;
        }

        .dialog-input img {
          width: 28px;
          height: 28px;
        } */

        .room-info > p,
        .location-info > div:nth-child(1) > p:nth-child(1) {
          font-size: 2.5rem;
          font-weight: bold;
        }

        .info-textarea {
          padding: 10px;
          width: 1200px;
          height: 420px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          background-color: #f4f4f4;
          resize: none;
          font-size: 1.4rem;
          scroll: auto;
          overflow-x: hidden;
        }

        .location-info {
          margin-bottom: 60px;
        }

        .location-info > div:nth-child(1) {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .location-info > div:nth-child(1) > p:nth-child(2) {
          font-size: 2.5rem;
        }

        .map-wrapper {
          width: 1200px;
          height: 420px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          background-color: #f2f2f2;
        }

        .button-deleteRoom {
          width: 250px;
          height: 40px;
          border: none;
          border-radius: 20px;
          font-size: 1.6rem;
          font-weight: bold;
          letter-spacing: 1px;
          color: white;
          background-color: #00555f;
          margin-bottom: 60px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Room;
