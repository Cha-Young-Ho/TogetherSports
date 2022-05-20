import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";

const RoomSetting = () => {
  const dispatch = useDispatch();
  //방 제목
  const [roomTitle, setRoomTitle] = useState("");

  //종목
  const [exercise, setExercise] = useState("");

  //인원
  const [limitPeopleCount, setLimitPeopleCount] = useState("");

  //지역
  const [roomArea, setRoomArea] = useState({
    area: "", //시구동
    areaDetail: "", //상세 주소
  });

  useEffect(() => {
    getMap();
  }, []);

  const getMap = () => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    mapScript.addEventListener("load", onLoadKakaoMap);
  };

  const onLoadKakaoMap = () => {
    kakao.maps.load(() => {
      const container = document.querySelector(".map");
      const options = {
        center: new kakao.maps.LatLng(37.56682420062817, 126.97864093976689), //지도의 중심좌표
        level: 5, //지도의 확대 레벨
      };
      const map = new kakao.maps.Map(container, options); //지도 생성
      const geocoder = new kakao.maps.services.Geocoder(); //주소-좌표 변환 객체 생성
      const marker = new kakao.maps.Marker(); //클릭한 위치를 표시할 마커

      getCenter(map); //지도의 중심좌표 얻기
      getArea(map, geocoder, marker);
    });
  };

  const getCenter = (map) => {
    //사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude,
          lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }
    //아니라면 서울시청이 기본 중심좌표
    else {
      const locPosition = new kakao.maps.LatLng(
        37.56682420062817,
        126.97864093976689
      );
      map.setCenter(locPosition);
    }
  };

  const getArea = (map, geocoder, marker) => {
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 시구동 정보 얻기
      searchAddrFromCoords(
        geocoder,
        mouseEvent.latLng,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const addr = result[0].address_name;

            // 시구동 정보 설정
            setRoomArea((prev) => ({
              ...prev,
              area: addr,
            }));

            //클릭된 지역 마커표시
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
          }
        }
      );

      // 상세 주소 정보 얻기
      searchDetailAddrFromCoords(
        geocoder,
        mouseEvent.latLng,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const detailAddr = result[0].address.address_name;

            // 상세 주소 정보 설정
            setRoomArea((prev) => ({
              ...prev,
              areaDetail: detailAddr,
            }));
          }
        }
      );
    });
  };

  // 시구동 정보
  const searchAddrFromCoords = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  // 상세 지번 주소
  function searchDetailAddrFromCoords(geocoder, coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  //예외 처리 및 다음 페이지 이동
  const getNext = (e) => {
    // 빈칸 제어
    if (
      roomTitle === "" ||
      exercise === "" ||
      limitPeopleCount === "" ||
      roomArea.area === "" ||
      roomArea.areaDetail === ""
    ) {
      e.preventDefault();
      alert("빈칸을 모두 설정해주세요!");
    }

    // 종목 선택 안 한 경우
    if (exercise === "선택") {
      e.preventDefault();
      alert("종목을 선택해주세요!");
    }

    dispatch({
      type: "ROOMSETTING",
      payload: {
        roomTitle: roomTitle,
        exercise: exercise,
        limitPeopleCount: limitPeopleCount,
        roomArea: roomArea.areaDetail,
      },
    });
  };

  return (
    <>
      <div className="container">
        <RoomInfoNavBar
          roomSetting_atv={"activation"}
          roomSchedule_atv={"deactivation"}
          roomTagInfo_atv={"deactivation"}
        />

        <div>
          <div className="contents-info">
            <p>방의 기본 정보 입력하기</p>
          </div>

          <div className="content-title">
            <p>🔥 방의 이름을 설정해주세요 🔥</p>

            <div>
              <p>방 이름</p>
              <input
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                type="text"
                minLength="1"
                maxLength="20"
              />
            </div>
          </div>

          <div className="line"></div>

          <div className="content-exercise-limitpeoplecount">
            <p>🏀 종목과 인원을 입력해주세요 ! 🏀</p>

            <div>
              <div className="exercise">
                <p>종목</p>
                <select
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                >
                  <option>선택</option>
                  <option>축구</option>
                  <option>야구</option>
                  <option>농구</option>
                  <option>당구</option>
                  <option>탁구</option>
                  <option>헬스</option>
                  <option>자전거</option>
                  <option>골프</option>
                  <option>등산</option>
                  <option>런닝</option>
                  <option>배드민턴</option>
                  <option>기타</option>
                </select>
              </div>

              <div className="limitpeoplecount">
                <p>인원</p>
                <input
                  type="number"
                  min="2"
                  value={limitPeopleCount}
                  onKeyUp={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onChange={(e) => setLimitPeopleCount(e.target.value)}
                />
              </div>
            </div>

            <p>* 본인을 포함한 인원을 입력해주셔야 합니다.</p>
          </div>

          <div className="line"></div>

          <div className="content-map">
            <div className="unselected-area">
              <p>모이는 지역을 지도에서 선택해주세요 !</p>
              <div className="map"></div>
            </div>
            <div className="selected-area">
              <div className="area">
                <p>지역</p>
                <input readOnly value={roomArea.area} />
              </div>
              <div className="detail-area">
                <p>주소</p>
                <input readOnly value={roomArea.areaDetail} />
              </div>
            </div>
          </div>
        </div>

        <Link href="/room/createroom/roomschedule">
          <button className="button-next" onClick={getNext}>
            다음
          </button>
        </Link>
      </div>
      <style jsx>{`
        input:focus {
          outline: none;
        }

        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          border-top: solid 1px #e4e8eb;
        }

        .line {
          width: 100%;
          border-top: 1px solid #e4e8eb;
          border-bottom: none;
        }

        .contents-info {
          width: 600px;
          border-top: solid 1px #e4e8eb;
          border-bottom: solid 1px #e4e8eb;
        }

        .contents-info p {
          margin: 5px 0;
          text-align: center;
          font-size: 1.5rem;
        }

        .content-title {
          width: 100%;
          height: 130px;
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .content-title > p {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .content-title > div {
          width: 500px;
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
        }

        .content-title > div > p {
          font-size: 1.5rem;
          font-weight: bold;
          margin-left: 10px;
          margin-right: 5px;
        }

        .content-title input {
          width: 85%;
          padding: 10px;
          border: none;
          font-size: 1.4rem;
        }

        .content-exercise-limitpeoplecount {
          width: 100%;
          height: 150px;
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .content-exercise-limitpeoplecount > p:nth-child(1) {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .content-exercise-limitpeoplecount > p:nth-child(3) {
          font-size: 1.2rem;
          color: #b5b5b5;
        }

        .content-exercise-limitpeoplecount > div {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 10px;
        }

        .exercise p,
        .limitpeoplecount p {
          font-size: 1.5rem;
          font-weight: bold;
          margin-right: 10px;
        }

        .exercise,
        .limitpeoplecount {
          display: flex;
          flex-direction: row;
          justify-content: left;
          align-items: center;
          margin: 0 10px;
        }

        .exercise select {
          width: 105px;
          height: 30px;
          padding: 0 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-size: 1.5rem;
        }

        .limitpeoplecount input {
          width: 105px;
          height: 30px;
          padding: 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-size: 1.5rem;
        }

        .content-map {
          width: 583px;
          margin-top: 30px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
        }

        .unselected-area {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .unselected-area p {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .map {
          width: 100%;
          height: 370px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .selected-area p {
          font-size: 1.5rem;
          font-weight: bold;
          margin-right: 10px;
        }

        .selected-area {
          width: 100%;
          height: 40px;
          margin: 30px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .area,
        .detail-area {
          width: 50%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .selected-area input {
          width: 240px;
          height: 30px;
          padding: 10px;
          font-size: 1.3rem;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .button-next {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default RoomSetting;
