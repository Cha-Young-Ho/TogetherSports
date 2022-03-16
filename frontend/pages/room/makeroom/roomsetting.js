import Link from "next/link";
import { useEffect } from "react";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";

const RoomSetting = () => {
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

  const getMarker = (map, position, geocoder) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position),
    });

    //마커를 클릭한 위치에 표시
    marker.setPosition(position);
    marker.setMap(map);

    kakao.maps.event.addListener(marker, "click", function () {
      marker.setMap(null); //지도에서 마커제거
      searchAddrFromCoords(geocoder, position, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const area = result[0].address_name;

          setTagAreas((prev) =>
            prev.filter((el) => {
              return el !== area;
            })
          );

          //배열에서 클릭된 마커의 지역 인덱스 찾기
          const index = activeAreas.findIndex(function (element) {
            return element === area;
          });

          if (index !== -1) {
            activeAreas.splice(index, 1);
          }
        }
      });
    });
  };

  const getArea = (map, geocoder) => {
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchAddrFromCoords(
        geocoder,
        mouseEvent.latLng,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const area = result[0].address_name;

            //배열에 담긴 지역이 5개 이하라면
            if (activeAreas.length < 5) {
              activeAreas.push(area);
              //중복 지역 담기지 않게 하기
              activeAreas = activeAreas.filter((element, index) => {
                return activeAreas.indexOf(element) === index;
              });

              setTagAreas((prev) => [...prev, area]);

              getMarker(map, mouseEvent.latLng, geocoder); //클릭된 지역 마커표시
            } else {
              alert("최대 설정 가능한 개수를 초과하였습니다!");
            }
          }
        }
      );
    });
  };

  const searchAddrFromCoords = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  //예외 처리 및 다음 페이지 이동
  const getNext = () => {
    /* 예외 처리 목록들 */
    // 1.방 제목 글자 수 제한 >> ?
    // 2. 인원 수 음수 값
    // 3. 인원 수 지수 표기법으로 인한 영문자 e, E 처리
    // 4. 인원 수 한글 입력되는 문제
    // 정보) number가 아닌 알파벳 혹은 문자가 들어간 경우 target.value가 null이 아닌 빈 값이 됨
    // 5. 종목 datalist에 없는거 입력하면 안되게 하기
  };

  return (
    <>
      <div className="container">
        <RoomInfoNavBar
          roomSetting_atv={"activation"}
          roomSchedule_atv={"deactivation"}
          roomTagInfo_atv={"deactivation"}
        />

        <div className="contents">
          <div className="content-title">
            <p>방 제목</p>
            <input />
          </div>

          <div className="content-exercise-limitpeoplecount">
            <div className="exercise">
              <p>종목</p>
              <input list="exercise" />
              <datalist id="exercise">
                <option value="축구" />
                <option value="야구" />
                <option value="농구" />
                <option value="당구" />
                <option value="탁구" />
                <option value="헬스" />
                <option value="자전거" />
                <option value="골프" />
                <option value="등산" />
                <option value="런닝" />
                <option value="배드민턴" />
                <option value="기타" />
              </datalist>
            </div>
            <div className="limitpeoplecount">
              <p>인원</p>
              <input type="number" />
            </div>
          </div>

          <div className="content-map">
            <div className="unselected-area">
              <p>장소를 선택해주세요!</p>
              <div className="map"></div>
            </div>
            <div className="selected-area">
              <p>지역</p>
              <input readOnly />
            </div>
          </div>
        </div>

        <Link href="/room/makeroom/roomschedule">
          <button className="button-next" onClick={getNext}>
            다음
          </button>
        </Link>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          border-top: solid 1px #e4e8eb;
        }

        .contents {
          width: 600px;
          border-top: solid 1px #e4e8eb;
          border-bottom: solid 1px #e4e8eb;
        }

        .content-title {
          width: 100%;
          height: 40px;
          margin: 30px 0;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .content-title p {
          font-size: 1.5em;
          font-weight: bold;
          margin-right: 3px;
        }

        .content-title input {
          width: 520px;
          height: 30px;
          padding: 10px;
          border-style: none;
          font-size: 1.5em;
        }

        .content-exercise-limitpeoplecount {
          width: 100%;
          margin: 30px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .content-exercise-limitpeoplecount p {
          font-size: 1.5em;
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

        .exercise input,
        .limitpeoplecount input {
          width: 105px;
          height: 30px;
          padding: 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-size: 1.5em;
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

        .content-map .unselected-area p {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .map {
          width: 100%;
          height: 370px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .content-map .selected-area p {
          font-size: 1.5em;
          font-weight: bold;
          margin-right: 10px;
        }

        .selected-area {
          width: 100%;
          height: 40px;
          margin: 30px 0;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .selected-area input {
          width: 520px;
          height: 30px;
          padding: 5px;
          border-style: none;
          font-size: 1.5em;
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
