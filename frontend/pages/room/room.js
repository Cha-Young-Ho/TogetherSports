import Link from "next/link";
import { useState, useEffect } from "react";
import ImageSlide from "../../components/imageSlide";
import Calendar from "../../components/calendar/calendar";
import ParticipantList from "../../components/rooms/participantList";
import UserInfoModal from "../../components/modals/userInfoModal";
import ModifyRoomModal from "../../components/modals/modifyRoomModal";
import { useSelector } from "react-redux";
import Chatting from "../../components/chatting";
import { getRoomDetail } from "../../api/rooms";
import { getMyInfo } from "../../api/members";

const Room = () => {
  const getRoomId = useSelector((state) => state.saveRoomIdReducer);
  const roomId = getRoomId.roomId;

  // 방 정보에 대한 필드
  const [creatorNickName, setCreatorNickName] = useState(""); // 방 생성자
  const [host, setHost] = useState("짱구"); // 방장
  const [roomTitle, setRoomTitle] = useState("");
  const [roomContent, setRoomContent] = useState("");
  const [roomArea, setRoomArea] = useState("서울 송파구 올림픽로 19-2"); // 임시 데이터
  const [limitPeopleCount, setLimitPeopleCount] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [exercise, setExercise] = useState("");
  const [tags, setTags] = useState([]);
  const [startAppointmentDate, setStartAppointmentDate] = useState("");
  const [endAppointmentDate, setEndAppointmentDate] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [roomImages, setRoomImages] = useState([
    {
      // 임시 데이터
      order: -1,
      imagePath: "logo-sign.png",
    },
  ]);

  // 참가자 목록에 대한 필드
  const [participants, setParticipants] = useState([
    {
      // 임시 데이터
      userNickname: "짱구",
      mannerPoint: 10,
      activeAreas: ["서울특별시 강남구 강남동"],
      userProfileImagePath: "",
      interests: ["축구", "야구", "농구"],
      gender: "male",
    },
    {
      // 임시 데이터
      userNickname: "짱아",
      mannerPoint: 10,
      activeAreas: ["서울특별시 강남구 강남동"],
      userProfileImagePath: "",
      interests: ["축구", "야구", "농구"],
      gender: "female",
    },
  ]);

  // 내가 방장인지 아닌지 확인하기 위한 변수
  const [myNickname, setMyNickname] = useState("");

  // 방 수정하기
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const openModifyModal = () => {
    setModifyModalOpen(true);
  };
  const closeModifyModal = () => {
    setModifyModalOpen(false);
  };

  // 접속자 목록 modal 관련 데이터
  const [participantListModalOpen, setParticipantListModalOpen] =
    useState(false);

  const participantListOpenModal = () => {
    setParticipantListModalOpen(true);
  };
  const participantListCloseModal = () => {
    setParticipantListModalOpen(false);
  };

  const onLoadKakaoMap = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("map"),
        options = {
          center: new kakao.maps.LatLng(37.56682420062817, 126.97864093976689),
          level: 4,
        };

      const map = new kakao.maps.Map(container, options); // 지도 생성
      const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

      // 주소로 좌표를 검색
      geocoder.addressSearch(`${roomArea}`, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 위치에 마커 표시
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시
          const infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">만남의 장소</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동
          map.setCenter(coords);
        }
      });
    });
  };

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  useEffect(() => {
    getMyInfo().then((res) => {
      if (res.status.code === 5000) {
        setMyNickname((myNickname = res.content.userNickname));
      } else {
        FailResponse(res.status.code);
      }
    });

    getRoomDetail(roomId).then((res) => {
      if (res.status.code === 5000) {
        const roomInfo = res.content.roomOfInfo;

        setCreatorNickName((creatorNickName = roomInfo.creatorNickName));
        setHost((host = roomInfo.host));
        setRoomTitle((roomTitle = roomInfo.roomTitle));
        setRoomContent((roomContent = roomInfo.roomContent));
        setRoomArea((roomArea = roomInfo.roomArea));
        setLimitPeopleCount((limitPeopleCount = roomInfo.limitPeopleCount));
        setParticipantCount((participantCount = roomInfo.participantCount));
        setExercise((exercise = roomInfo.exercise));
        setTags((tags = roomInfo.tags));
        setStartAppointmentDate(
          (startAppointmentDate = roomInfo.startAppointmentDate)
        );
        setEndAppointmentDate(
          (endAppointmentDate = roomInfo.endAppointmentDate)
        );
        setViewCount((viewCount = roomInfo.viewCount));
        setRoomImages((roomImages = roomInfo.roomImages));
        setParticipants((participants = res.content.participants));
      } else {
        FailResponse(res.status.code);
      }
    });
  });

  return (
    <>
      <div className="container">
        <div className="main-info">
          <div className="header">
            <div className="viewCount">
              <p>{`조회수 : ${viewCount}`}</p>
              {/* <p>{`생성일시 : ${}`}</p> */}
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

                <Link href="/room/roomlist">
                  <button className="button-exit">나가기</button>
                </Link>

                <ModifyRoomModal
                  open={modifyModalOpen}
                  close={closeModifyModal}
                  sequenceId={"test"}
                ></ModifyRoomModal>
              </div>
            </div>
          </div>

          <div className="sections">
            <div className="left-section">
              <div className="image">
                <ImageSlide imageArr={roomImages} />
              </div>
              <div className="calendar">
                <Calendar
                  clickDateOptionFunction={`${
                    startAppointmentDate[8] === "0"
                      ? startAppointmentDate.substr(0, 8) +
                        startAppointmentDate[9]
                      : startAppointmentDate.substr(0, 10)
                  }`}
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
                  info={"other"}
                />
              </div>
            </div>

            <div className="right-section">
              <div className="chatting-box">
                <div className="master">
                  <p>{`ID : ${host}님의 방`}</p>
                </div>

                <Chatting />
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
          <div id="map"></div>
        </div>
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
        .button-exit {
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

        .button-exit {
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

        #map {
          width: 1200px;
          height: 420px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
};

export default Room;
