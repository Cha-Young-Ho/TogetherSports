import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Map = () => {
  const dispatch = useDispatch();
  let activeareas = [];

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
      const container = document.getElementById("map");
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
          let Region = result[0].region_1depth_name; //시도
          let District = result[0].region_2depth_name; //구군
          let EupMyunDong = result[0].region_3depth_name; //읍면동

          const idx = activeareas.findIndex(function (item) {
            if (item.district === "정보 없음") {
              District = "정보 없음";
            }
            return (
              item.region === Region &&
              item.district === District &&
              item.eupMyunDong === EupMyunDong
            );
          });
          if (idx !== -1) {
            activeareas.splice(idx, 1);
          }
          console.log(activeareas);
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
            let Region = result[0].region_1depth_name; //시도
            let District = result[0].region_2depth_name; //구군
            let EupMyunDong = result[0].region_3depth_name; //읍면동

            //예외 처리
            if (District === "") {
              District = "정보 없음";
            }

            activeareas.push({
              region: Region,
              district: District,
              eupMyunDong: EupMyunDong,
            });

            //중복된 지역은 push X
            activeareas = activeareas.filter((area, idx, arr) => {
              return (
                arr.findIndex(
                  (item) =>
                    item.region === area.region &&
                    item.district === area.district &&
                    item.eupMyunDong === area.eupMyunDong
                ) === idx
              );
            });

            console.log(activeareas);
          }

          getMarker(map, mouseEvent.latLng, geocoder);
        }
      );
    });
  };

  //좌표로 행정동 주소 정보 요청
  const searchAddrFromCoords = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  return (
    <>
      <div id="map"></div>

      <style jsx>{`
        #map {
          width: 600px;
          height: 500px;
          margin: 30px 72.5px 20px 72.5px;
          padding: 11px 13px 12px 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }
      `}</style>
    </>
  );
};

export default Map;
