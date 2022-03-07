import { useState, useEffect } from "react";

function Map({ latitude, longitude }) {
  const [area, setArea] = useState([]);
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map"); //지도를 표시할 div
        let options = {
          center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표
          level: 5, //지도의 확대 레벨
        };
        let map = new kakao.maps.Map(container, options); //지도 생성
        let geocoder = new kakao.maps.services.Geocoder(); //주소-좌표 변환 객체 생성
        let marker = new kakao.maps.Marker(); //클릭한 위치를 표시할 마커

        //사용자의 위치를 받아와 초기중심좌표 설정
        if (navigator.geolocation) {
          //사용자의 위치를 정상적으로 받아오면
          navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude,
              lon = position.coords.longitude;

            let locPosition = new kakao.maps.LatLng(lat, lon);
            map.setCenter(locPosition);
          });
        } else {
          //아니라면 서울시청이 기본 중심좌표
          let locPosition = new kakao.maps.LatLng(
            37.56682420062817,
            126.97864093976689
          );
          map.setCenter(locPosition);
        }

        //지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          searchAddrFromCoords(mouseEvent.latLng, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              for (let i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === "H") {
                  console.log(result[i].address_name.split(" "));
                  break;
                }
              }

              //마커를 클릭한 위치에 표시
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
            }
          });
        });

        //시구동 정보
        function searchAddrFromCoords(coords, callback) {
          //좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

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
}

export default Map;
