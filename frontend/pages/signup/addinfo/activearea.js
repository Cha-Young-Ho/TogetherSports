import Link from "next/link";
import { useEffect } from "react";
import { postUserRequest } from "../../../api/members";
import { useSelector } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";

const ActiveArea = () => {
  const userInfo = useSelector((state) => state);

  let activeAreas = [];

  // 서버에 회원가입 요청
  const callUserRequest = () => {
    postUserRequest(
      activeAreas,
      userInfo.userRequestReducer.gender,
      userInfo.userRequestReducer.interests,
      userInfo.userRequestReducer.provider,
      userInfo.userRequestReducer.userBirthDay,
      userInfo.userRequestReducer.userBirthMonday,
      userInfo.userRequestReducer.userBirthYear,
      userInfo.userRequestReducer.userEmail,
      userInfo.userRequestReducer.userName,
      userInfo.userRequestReducer.userNickname,
      userInfo.userRequestReducer.userProfileImage
    ).then((res) => {
      console.log(res.message);
      if (res.code === 5000) {
        alert("회원가입이 성공했습니다.");
      } else {
        alert("알 수 없는 이유로 요청이 실패했습니다.");
      }
    });
  };

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
          const area = result[0].address_name;

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
              getMarker(map, mouseEvent.latLng, geocoder); //클릭된 지역 마커표시
            } else {
              alert("최대 설정 가능한 개수를 초과하였습니다!");
            }
          }
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
      <div className="bg-container">
        <UserInfoNavBar
          personal_atv={"deactivation"}
          interest_atv={"deactivation"}
          activearea={"activation"}
        />
        <div className="content-showbox">
          <p>원하는 활동지역을 선택해주세요! (최대 5개)</p>
        </div>
        <div id="map"></div>
        <div className="tag-map">위치 태그</div>

        <Link href="/login">
          <button
            className="button-done"
            onClick={() => {
              callUserRequest();
            }}
          >
            완료
          </button>
        </Link>
      </div>

      <style jsx>{`
        .bg-container {
          margin-top: 10px;
          border-top: 1px solid #e4e8eb;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          padding: 35px 0;
          font-weight: bold;
          font-size: 2.5rem;
        }

        .title {
          width: 500px;
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .title-circle-personalinfo,
        .title-circle-interest,
        .title-circle-activearea {
          border-radius: 50px;
          width: 90px;
          height: 90px;
          margin: 10px;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 5px 0;
        }

        .content-showbox {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        #map {
          width: 600px;
          height: 500px;
          margin: 30px 72.5px 20px 72.5px;
          padding: 11px 13px 12px 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .tag-map {
          width: 580px;
          align-items: left;
        }

        .button-done {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin-top: 25px;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};

export default ActiveArea;
