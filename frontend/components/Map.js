import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Map = (props) => {
  const dispatch = useDispatch();
  const placeOfMeeting = useSelector(
    (state) => state.saveActiveAreaReducer.placeOfMeeting
  );
  const preAreaInfo = useSelector(
    (state) => state.saveActiveAreaReducer.activeAreas
  );
  const [activeAreas, setActiveAreas] = useState([]);
  const [tagAreas, setTagAreas] = useState([]);

  const changeActiveAreas = (data) => {
    dispatch({
      type: "SAVEACTIVEAREA",
      payload: {
        activeAreas: data,
      },
    });
  };

  const changeTagAreas = (data) => {
    dispatch({
      type: "SAVETAGAREAS",
      payload: {
        tagAreas: data,
      },
    });
  };

  const getMap = () => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    mapScript.addEventListener("load", onLoadKakaoMap);
  };

  const onLoadKakaoMap = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.56682420062817, 126.97864093976689),
        level: 5, //지도의 확대 레벨
      };
      const map = new kakao.maps.Map(container, options); // 지도 생성
      const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

      if (props.setPOM === "true") {
        // 주소로 좌표를 검색
        geocoder.addressSearch(`${placeOfMeeting}`, function (result, status) {
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

        return;
      }

      const marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커 생성

      getCenter(map); // 지도의 중심좌표 얻기
      getArea(map, geocoder, marker);
    });
  };

  const getCenter = (map) => {
    // 사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude,
          lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }
    // 아니라면 서울시청이 기본 중심좌표
    else {
      const locPosition = new kakao.maps.LatLng(
        37.56682420062817,
        126.97864093976689
      );
      map.setCenter(locPosition);
    }
  };

  const getArea = (map, geocoder) => {
    //기존 위치정보가 있는 경우

    console.log(preAreaInfo);
    if (preAreaInfo.length) {
      preAreaInfo.forEach((area) => {
        const markerPosition = new kakao.maps.LatLng(
          area.longitude,
          area.latitude
        );

        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(markerPosition),
        });

        marker.setPosition(markerPosition);
        marker.setMap(map);
      });
    }

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchAddrFromCoords(
        geocoder,
        mouseEvent.latLng,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const area = {
              location: result[0].address_name,
              latitude: mouseEvent.latLng.La,
              longitude: mouseEvent.latLng.Ma,
            };

            // 중복되는 지역 여부 체크
            const checkAreaDuplication = (element) => {
              if (element.location === area.location) return true;
            };

            // 지역 설정 개수 최대 5개 제한
            if (activeAreas.length < 5) {
              if (activeAreas.some(checkAreaDuplication) === false) {
                getMarker(map, mouseEvent.latLng, geocoder); // 클릭된 지역 마커표시

                setActiveAreas((prev) => (activeAreas = [...prev, area]));
                changeActiveAreas(activeAreas);

                setTagAreas((prev) => (tagAreas = [...prev, area]));
                changeTagAreas(tagAreas);
              } else {
                alert("해당 지역은 이미 선택되었습니다.");
              }
            } else {
              alert("최대 설정 가능한 개수를 초과하였습니다!");
            }
          }
        }
      );
    });
  };

  const getMarker = (map, position, geocoder) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position),
    });

    // 마커를 클릭한 위치에 표시
    marker.setPosition(position);
    marker.setMap(map);

    // 마커 클릭 시, 해당 지역 삭제
    kakao.maps.event.addListener(marker, "click", function () {
      marker.setMap(null); // 지도에서 마커제거
      searchAddrFromCoords(geocoder, position, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const area = {
            location: result[0].address_name,
            latitude: position.La,
            longitude: position.Ma,
          };

          // 태그목록에서 해당 지역 삭제
          setTagAreas(
            (prev) =>
              (tagAreas = prev.filter((el) => {
                return el.location !== area.location;
              }))
          );
          changeTagAreas(tagAreas);

          // 배열에서 클릭된 마커의 지역 인덱스 찾기
          const index = activeAreas.findIndex(function (element) {
            return element.location === area.location;
          });

          if (index !== -1) {
            activeAreas.splice(index, 1);
          }
        }
      });
    });
  };

  // 좌표를 통해 행정동 주소 정보 요청
  const searchAddrFromCoords = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  useEffect(() => {
    if (props.setPOM === "true") {
      if (placeOfMeeting !== "") {
        getMap();
      }
    } else if (!props.setPOM) {
      getMap();
    }
  }, [placeOfMeeting]);

  return (
    <>
      <div id="map" />
      {!props.setPOM ? (
        <div className="tags">
          {tagAreas.map((area, index) => {
            return (
              <div key={index} className="tag">
                <p>{area.location}</p>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      <style jsx>{`
        #map {
          width: 100%;
          height: 100%;
          /* margin: 30px 0; */
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .tags {
          width: 800px;
          align-items: left;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .tag {
          width: 180px;
          height: 24px;
          padding: 5px;
          margin: 5px;
          border: none;
          border-radius: 10px;
          background-color: #e0e0e0;
          color: #747474;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Map;
