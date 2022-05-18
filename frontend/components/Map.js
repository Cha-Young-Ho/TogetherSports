import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Map = () => {
  const dispatch = useDispatch();
  const [activeAreas, setActiveAreas] = useState([]);
  const [tagAreas, setTagAreas] = useState([]);

  useEffect(() => {
    getMap();
  }, []);

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
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchAddrFromCoords(
        geocoder,
        mouseEvent.latLng,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const area = result[0].address_name;

            // 중복되는 지역 여부 체크
            const checkAreaDuplication = (element) => {
              if (element === area) return true;
            };

            // 지역 설정 개수 최대 5개 제한
            if (activeAreas.length < 5) {
              if (activeAreas.some(checkAreaDuplication) === false) {
                getMarker(map, mouseEvent.latLng, geocoder); // 클릭된 지역 마커표시

                setActiveAreas((prev) => (activeAreas = [...prev, area]));
                changeActiveAreas(activeAreas);
                // console.log("active", activeAreas, "nextAreas", nextAreas);
              } else {
                alert("해당 지역은 이미 선택되었습니다.");
              }
              setTagAreas((prev) => (tagAreas = [...prev, area]));
              changeTagAreas(tagAreas);
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
          const area = result[0].address_name;

          // 태그목록에서 해당 지역 삭제
          setTagAreas(
            (prev) =>
              (tagAreas = prev.filter((el) => {
                return el !== area;
              }))
          );
          changeTagAreas(tagAreas);

          // 배열에서 클릭된 마커의 지역 인덱스 찾기
          const index = activeAreas.findIndex(function (element) {
            return element === area;
          });

          if (index !== -1) {
            setActiveAreas((prev) => (activeAreas = prev.splice(index, 1)));
            changeActiveAreas(activeAreas);
          }
        }
      });
    });
  };

  // 좌표를 통해 행정동 주소 정보 요청
  const searchAddrFromCoords = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  return (
    <>
      <div id="map" />
      <style jsx>{`
        #map {
          width: 800px;
          height: 500px;
          margin: 30px 0;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }
      `}</style>
    </>
  );
};

export default Map;
