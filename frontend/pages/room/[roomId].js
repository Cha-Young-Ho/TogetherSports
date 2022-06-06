import Link from "next/link";
import { useState, useEffect } from "react";
import ImageSlide from "../../components/imageSlide";
import Calendar from "../../components/calendar/calendar";
import ParticipantList from "../../components/rooms/participantList";
import UserInfoModal from "../../components/modals/userInfoModal";
import ModifyRoomModal from "../../components/modals/modifyRoomModal";
import Chatting from "../../components/chatting";
import FailResponse from "../../api/failResponse";
import { getRoomDetail, deleteLeaveRoom, deleteRoom } from "../../api/rooms";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../components/Map";
import AlarmModal from "../../components/modals/alarmModal";
import StompJS from "stompjs";
import SockJS from "sockjs-client";
import FloatingAlarm from "../../components/rooms/floatingAlarm";
import Head from "next/head";

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomTitle = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomTitle
  );
  const roomContent = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomContent
  );
  const roomArea = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomArea
  );
  const exercise = useSelector(
    (state) => state.roomRealTimeInfoReducer.exercise
  );
  const participantCount = useSelector(
    (state) => state.roomRealTimeInfoReducer.participantCount
  );
  const limitPeopleCount = useSelector(
    (state) => state.roomRealTimeInfoReducer.limitPeopleCount
  );
  const startAppointmentDate = useSelector(
    (state) => state.roomRealTimeInfoReducer.startAppointmentDate
  );
  const endAppointmentDate = useSelector(
    (state) => state.roomRealTimeInfoReducer.endAppointmentDate
  );
  const createdTime = useSelector(
    (state) => state.roomRealTimeInfoReducer.createdTime
  );
  const updatedTime = useSelector(
    (state) => state.roomRealTimeInfoReducer.updatedTime
  );
  const creatorNickName = useSelector(
    (state) => state.roomRealTimeInfoReducer.creatorNickName
  );
  const roomImages = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomImages
  );
  const host = useSelector((state) => state.roomRealTimeInfoReducer.host);
  const tags = useSelector((state) => state.roomRealTimeInfoReducer.tags);
  const viewCount = useSelector(
    (state) => state.roomRealTimeInfoReducer.viewCount
  );
  const participants = useSelector(
    (state) => state.roomRealTimeInfoReducer.participants
  );

  const webSocketInfo = useSelector(
    (state) => state.saveWebSocketReducer.sockJS
  );
  const { roomId } = router.query;
  const [chatOpen, setChatOpen] = useState(false);

  // 내가 방장인지 아닌지 확인하기 위한 변수
  const myNickname = useSelector((state) => state.myInfoReducer.userNickname);

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

  // 우측 하단 고정 알림 관련 데이터
  const [floatingAlarmOpen, setFloatingAlarmOpen] = useState(false);

  const floatingAlarmOpenFunc = (e) => {
    setFloatingAlarmOpen(true);
    e.target.style.display = "none";
  };

  const floatingAlarmCloseFunc = () => {
    const button = document.getElementsByClassName("button-alarm");
    setFloatingAlarmOpen(false);
    button[0].style.display = "block";
  };

  // 방 나가기
  const onLeaveRoom = () => {
    deleteLeaveRoom(roomId)
      .then((res) => {
        if (res.status.code === 1203) {
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
    // 여기서 참가자목록 같은걸 업데이트 할 필요가 있나?
  };

  // 방 삭제하기 -> 보류
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

    // router.push("/room/roomlist"); // test를 위한 임시 라우팅
  };

  useEffect(() => {
    if (roomId) {
      getRoomDetail(roomId)
        .then((res) => {
          if (res.status.code === 5000) {
            const roomInfo = res.content.roomOfInfo;

            dispatch({
              type: "SAVEROOMINFOS",
              payload: {
                roomTitle: roomInfo.roomTitle,
                roomContent: roomInfo.roomContent,
                roomArea: roomInfo.roomArea,
                exercise: roomInfo.exercise,
                participantCount: roomInfo.participantCount,
                limitPeopleCount: roomInfo.limitPeopleCount,
                startAppointmentDate: roomInfo.startAppointmentDate,
                endAppointmentDate: roomInfo.endAppointmentDate,
                createdTime: roomInfo.createdTime,
                updatedTime: roomInfo.updatedTime,
                host: roomInfo.host,
                creatorNickName: roomInfo.creatorNickName,
                roomImages:
                  roomInfo.roomImages === null
                    ? [
                        {
                          order: 0,
                          imagePath: "logo-sign.png",
                        },
                      ]
                    : roomInfo.roomImages,
                tags: roomInfo.tags,
                viewCount: roomInfo.viewCount,
                participants: res.content.participants,
              },
            });

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
                placeOfMeeting: roomInfo.roomArea,
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

  useEffect(() => {
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
      <Head>
        <title>{roomTitle}</title>
      </Head>
      <div className="container">
        <div className="main-info">
          <div className="header">
            <div className="viewCount">
              <p>{`조회수 : ${viewCount}`}</p>
              <p>{`생성 일시 : ${createdTime.substr(0, 16)}`}</p>
              {updatedTime === "" ? (
                <></>
              ) : (
                <p>{`최근 수정 : ${updatedTime.substr(0, 16)}`}</p>
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
                <ImageSlide path={"roomDetail"} />
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
                <p>{`참여자 목록 (${participantCount}/${limitPeopleCount})`}</p>
                <div className="short-line"></div>
                <div className="participants">
                  <ParticipantList
                    participantListOpenModal={participantListOpenModal}
                  />
                </div>
                <UserInfoModal
                  open={participantListModalOpen}
                  close={participantListCloseModal}
                  path={"partyList"}
                  roomId={roomId}
                />
              </div>
            </div>

            <div className="right-section">
              <div className="chatting-box">
                <div className="master">
                  <p>{`ID : ${host}님의 방`}</p>
                </div>

                <Chatting chatOpen={chatOpen} />
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

        <img
          src="/floatingAlarm.png"
          className="button-alarm"
          onClick={floatingAlarmOpenFunc}
        ></img>
        <FloatingAlarm
          open={floatingAlarmOpen}
          close={floatingAlarmCloseFunc}
        />
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

        .button-alarm {
          width: 70px;
          height: 70px;
          border: none;
          border-radius: 50%;
          opacity: 0.94;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.42);
          background-color: #6db152;
          cursor: pointer;
          position: -webkit-fixed; // safari
          position: fixed;
          bottom: 30px;
          right: 30px;
          animation: zoomin 0.3s ease-in-out;
        }

        @keyframes zoomin {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        .none {
          display: none;
        }

        .block {
          display: block;
        }
      `}</style>
    </>
  );
};

export default Room;
