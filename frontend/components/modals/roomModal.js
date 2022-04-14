import { useState, useEffect } from "react";
import Calendar from "../calendar/calendar";
import { getRoomInfo } from "../../api/rooms";
import ImageSlide from "../imageSlide";

/* roomList에서 받은 각 room들의 roomId를 props로 받기 */
const RoomModal = ({ open, close, roomSequenceId }) => {
  const [mapLoaded, setMapLoaded] = useState(false); // 지도 로드 동기화

  /* response content 담을 변수들 */
  const [creatorNickName, setCreatorNickName] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [roomContent, setRoomContent] = useState("");
  const [area, setArea] = useState("");
  const [limitPeopleCount, setLimitPeopleCount] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [exercise, setExercise] = useState("");
  const [tag, setTag] = useState([]);
  const [startAppointmentDate, setStartAppointmentDate] = useState("");
  const [endAppointmentDate, setEndAppointmentDate] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [roomImagePath, setRoomImagePath] = useState([
    "logo-sign.png",
    "signup-bg.png",
    "naver-login.png",
  ]); // 방 이미지 test용 임시 데이터

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (open && mapLoaded) {
      // 방 정보 받아오기
      getRoomInfo(roomSequenceId).then((res) => {
        if (res.status.code === 5000) {
          setCreatorNickName((creatorNickName = res.content.creatorNickName));
          setRoomTitle((roomTitle = res.content.roomTitle));
          setRoomContent((roomContent = res.content.roomContent));
          setArea((area = res.content.area));
          setLimitPeopleCount(
            (limitPeopleCount = res.content.limitPeopleCount)
          );
          setParticipantCount(
            (participantCount = res.content.participantCount)
          );
          setExercise((exercise = res.content.exercise));
          setTag((tag = res.content.tag));
          setStartAppointmentDate(
            (startAppointmentDate = res.content.startAppointmentDate)
          );
          setEndAppointmentDate(
            (endAppointmentDate = res.content.endAppointmentDate)
          );
          setViewCount((viewCount = res.content.viewCount));
          setRoomImagePath((roomImagePath = res.content.roomImagePath));
        } else {
          FailResponse(res.status.code);
        }
      });

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
  }, [open]);

  const enterRoom = () => {
    // 방에 참가
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <div className="room-modal-body">
              <div className="header">
                <div className="tags">
                  {tag.map((tag, index) => {
                    return (
                      <div className="tag" key={index}>
                        {tag}
                      </div>
                    );
                  })}
                </div>

                <p>{`ID : ${creatorNickName}님의 방`}</p>
              </div>

              <div className="section">
                <div className="left-section">
                  <p>{roomTitle}</p>

                  <div className="options">
                    <div className="option">
                      <p className="small-p">참여인원</p>
                      <p className="big-p">{participantCount}</p>
                    </div>
                    <div className="option">
                      <p className="small-p">모집인원</p>
                      <p className="big-p">{limitPeopleCount}</p>
                    </div>
                    <div className="option">
                      <p className="small-p">종목</p>
                      <p className="big-p">{exercise}</p>
                    </div>
                    <div className="option-time">
                      <p className="small-p">시간</p>
                      <p className="big-p">{`${startAppointmentDate.substr(
                        11,
                        2
                      )}시 ${startAppointmentDate.substr(-2)}분 ~`}</p>
                      <p className="big-p">{`${endAppointmentDate.substr(
                        11,
                        2
                      )}시 ${endAppointmentDate.substr(-2)}분`}</p>
                    </div>
                  </div>

                  <div className="calendar">
                    <Calendar
                      clickDateOptionFunction={`${startAppointmentDate.substr(
                        0,
                        10
                      )}`}
                      moveDateButtonOptionFunction={true}
                    />
                  </div>

                  <div className="location">
                    <p className="location-info">위치 정보</p>
                    <div className="line"></div>
                    <p className="address-info">{area}</p>
                    <div id="map"></div>
                  </div>
                </div>

                <div className="right-section">
                  <div className="image">
                    <ImageSlide imageArr={roomImagePath} />
                  </div>

                  <div className="room-info">
                    <p>방 설명 및 안내</p>
                    <div className="line"></div>
                    <textarea readOnly value={roomContent}></textarea>
                  </div>

                  <div className="buttons">
                    <button className="left-button" onClick={enterRoom}>
                      참여
                    </button>
                    <button className="right-button" onClick={close}>
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
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

        section {
          width: 1150px;
          height: 720px;
          margin: 0 auto;
          border-radius: 22px;
          background-color: #fff;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-show 0.3s;
          overflow: hidden;
          display: table;
          text-align: center;
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .room-modal-body {
          width: 100%;
          height: 100%;
          padding: 20px 30px;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .tags {
          display: flex;
          flex-direction: row;
        }

        .tag {
          width: 70px;
          height: 25px;
          margin-right: 10px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          font-weight: bold;
          font-size: 0.9em;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .section {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }

        .left-section {
          width: 440px;
        }

        .left-section > div,
        .left-section > p {
          display: flex;
          justify-content: left;
          align-items: center;
          margin-bottom: 13px;
        }

        .left-section > p {
          font-size: 1.9em;
          font-weight: bold;
        }

        .options {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .option {
          width: 70px;
          height: 70px;
          margin-right: 20px;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .option-time {
          width: 120px;
          height: 70px;
          margin-right: 20px;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .small-p {
          font-size: 0.9em;
          margin-bottom: 4px;
        }

        .big-p {
          font-weight: bold;
          font-size: 1.8em;
        }

        .option-time .big-p {
          font-weight: bold;
          font-size: 1em;
        }

        .calendar {
          width: 100%;
          height: 220px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .location {
          width: 100%;
          height: 265px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px;
        }

        .location-info {
          font-weight: bold;
          margin-top: 10px;
        }

        .address-info {
          margin-bottom: 10px;
        }

        .left-section .line {
          width: 311.5px;
          height: 0;
          margin: 10px 0;
          border: solid 0.3px #707070;
        }

        #map {
          width: 100%;
          height: 170px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
        }

        .right-section {
          width: 710px;
        }

        .right-section div {
          margin-left: 30px;
        }

        .image {
          width: 680px;
          height: 350px;
        }

        .room-info > p {
          margin: 20px 10px 0 0;
          display: flex;
          justify-content: left;
          font-weight: bold;
        }

        .room-info > div {
          margin: 10px 0;
        }

        .right-section .line {
          width: 680px;
          height: 0;
          border: solid 0.3px #707070;
        }

        .room-info textarea {
          width: 680px;
          height: 160px;
          padding: 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
          resize: none;
        }

        .buttons {
          margin-top: 20px;
        }

        .left-button,
        .right-button {
          margin: 0 10px;
          width: 175px;
          height: 40px;
          border: none;
          border-radius: 25px;

          font-size: 15px;
          font-weight: 200px;
          cursor: pointer;
        }

        .left-button {
          background-color: #00555f;
          color: white;
        }

        .right-button {
          background-color: #d8d8d8;
          color: black;
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
