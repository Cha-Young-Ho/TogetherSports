import { useState, useEffect } from "react";
import Calendar from "../calendar/calendar";
import { getRoomInfo } from "../../api/rooms";
import ImageSlide from "../imageSlide";

/* roomList에서 받은 각 room들의 roomId를 props로 받기 */
const RoomModal = (props) => {
  const [mapLoaded, setMapLoaded] = useState(false); // 지도 로드 동기화

  /* response content 담을 변수들 */
  const [roomId, setRoomId] = useState(""); // 참여페이지로 넘어가기 위한 roomId
  const [creatorNickName, setCreatorNickName] = useState(""); // 방 생성자
  const [host, setHost] = useState(""); // 방장
  const [roomTitle, setRoomTitle] = useState("");
  const [roomContent, setRoomContent] = useState("");
  const [area, setArea] = useState("서울 송파구 올림픽로 19-2");
  const [limitPeopleCount, setLimitPeopleCount] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [exercise, setExercise] = useState("");
  const [tags, setTags] = useState([]);
  const [startAppointmentDate, setStartAppointmentDate] = useState("");
  const [endAppointmentDate, setEndAppointmentDate] = useState("");
  const [viewCount, setViewCount] = useState("5");
  const [roomImages, setRoomImages] = useState([
    {
      // test를 위한 임시 데이터
      order: -1,
      imagePath: "logo-sign.png",
    },
  ]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (props.open && mapLoaded) {
      console.log(props.roomID);
      // 방 정보 받아오기
      // getRoomInfo(props.roomID).then((res) => {
      //   if (res.status.code === 5000) {
      //     setRoomId((roomId = res.content.roomId));
      //     setCreatorNickName((creatorNickName = res.content.creatorNickName));
      //     setHost((host = res.content.host));
      //     setRoomTitle((roomTitle = res.content.roomTitle));
      //     setRoomContent((roomContent = res.content.roomContent));
      //     setArea((area = res.content.area));
      //     setLimitPeopleCount(
      //       (limitPeopleCount = res.content.limitPeopleCount)
      //     );
      //     setParticipantCount(
      //       (participantCount = res.content.participantCount)
      //     );
      //     setExercise((exercise = res.content.exercise));
      //     setTags((tags = res.content.tags));
      //     setStartAppointmentDate(
      //       (startAppointmentDate = res.content.startAppointmentDate)
      //     );
      //     setEndAppointmentDate(
      //       (endAppointmentDate = res.content.endAppointmentDate)
      //     );
      //     setViewCount((viewCount = res.content.viewCount));
      //     setRoomImages((roomImages = res.content.roomImages));
      //   } else {
      //     FailResponse(res.status.code);
      //   }
      // });

      // 위치 정보 받아오기
      kakao.maps.load(() => {
        const container = document.getElementById("map"),
          options = {
            center: new kakao.maps.LatLng(
              37.56682420062817,
              126.97864093976689
            ),
            level: 4,
          };

        const map = new kakao.maps.Map(container, options); // 지도 생성
        const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

        // 주소로 좌표를 검색
        geocoder.addressSearch(`${area}`, function (result, status) {
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
    }
  }, [props.open]);

  const enterRoom = () => {
    // 방에 참가
  };

  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
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
                  )}시 ${startAppointmentDate.substr(-2)}분 ~`}</p>
                  <p>{`${endAppointmentDate.substr(
                    11,
                    2
                  )}시 ${endAppointmentDate.substr(-2)}분`}</p>
                </div>
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

              <div className="location">
                <p>위치 정보</p>
                <div></div>
                <p className="address-info">{area}</p>
                <div id="map"></div>
              </div>
            </div>

            <div className="right-section">
              <div className="image">
                {roomImages.length !== 0 ? (
                  <ImageSlide imageArr={roomImages} />
                ) : (
                  <></>
                )}
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
          animation: modal-bg-show 0.3s; // 스르륵 효과
        }

        .room-modal-body {
          width: 70%;
          height: 85%;
          border-radius: 22px;
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 30px;
          /* overflow: auto; */
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

        #map {
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
