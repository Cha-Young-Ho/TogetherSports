import { useEffect } from "react";
import Geocoder from "react-geocode";

function Map({ latitude, longitude }) {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map"); //지도를 표시할 div
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표
          level: 5, //지도의 확대 레벨
        };

        const map = new kakao.maps.Map(container, options); //지도 생성
        const geocoder = new kakao.maps.services.Geocoder(); //주소-좌표 변환 객체 생성
        const marker = new kakao.maps.Marker(), //클릭한 위치를 표시할 마커
          infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); //클릭한 위치에 대한 주소를 표시할 인포윈도우

        //현재 지도 중심좌표로 주소를 검색해서 지도 좌측상단에 표시
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        kakao.maps.event.addEventListener(map, "click", function (e) {
          searchDetailAddrFromCoords(e.LatLng, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              const detailAddr = !!result[0].road_address
                ? "<div>도로명주소 : " +
                  result[0].road_address.address_name +
                  "</div>"
                : "";
              detailAddr +=
                "<div>지번 주소 : " + result[0].address.address_name + "</div>";

              const content =
                '<div class="bAddr">' +
                '<span class="title">법정동 주소정보</span>' +
                detailAddr +
                "</div>";

              marker.setPosition(e.LatLng);
              marker.setMap(map);

              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          });
        });

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "idle", function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById("centerAddr");

            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === "H") {
                infoDiv.innerHTML = result[i].address_name;
                break;
              }
            }
          }
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude,
              lon = position.coords.longitude;

            const locPosition = new kakao.maps.LatLng(lat, lon);
            map.setCenter(locPosition);
          });
        } else {
          const locPosition = new kakao.maps.LatLng(
            37.56682420062817,
            126.97864093976689
          );
          map.setCenter(locPosition);
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
