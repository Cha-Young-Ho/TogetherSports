import { useState, useEffect } from "react";
import { postUserRequest } from "../../../api/members";
import { useSelector } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";
import { FailResponse } from "../../../api/failResponse";
import Link from "next/link";
import { useRouter } from "next/router";

let activeAreas = []; // 서버에 보낼 데이터를 담는 변수
const ActiveArea = () => {
  const userRequestInfo = useSelector((state) => state.userRequestReducer);
  const router = useRouter();
  // 위치 태그
  const [tagAreas, setTagAreas] = useState([]);

  // 서버에 회원 추가정보입력 요청
  const callUserRequest = (e) => {
    if (
      userRequestInfo.userNickname === "" ||
      userRequestInfo.userBirth === "" ||
      activeAreas === [] ||
      userRequestInfo.gender === "" ||
      userRequestInfo.interests === []
    ) {
      e.preventDefault();
      alert("입력되지 않은 정보가 있습니다.");
      return;
    } else {
      postUserRequest(
        userRequestInfo.userNickname,
        userRequestInfo.userBirth,
        activeAreas,
        userRequestInfo.gender,
        userRequestInfo.userProfileExtension,
        userRequestInfo.imageSource,
        userRequestInfo.interests
      ).then((res) => {
        console.log(res.status.message);
        if (res.status.code === 5000) {
          alert("추가정보입력에 성공하였습니다!");
        } else {
          FailResponse(res.status.code);
        }
      });
    }
  };

  // 카카오 지도 한번만 렌더링
  useEffect(() => {
    if (
      userRequestInfo.userNickname === "" &&
      !userRequestInfo.interests.length
    ) {
      alert("비정상적인 접근입니다.");
      router.replace("/");
      return;
    }

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
                activeAreas.push(area);
              } else {
                alert("해당 지역은 이미 선택되었습니다.");
              }
              setTagAreas((prev) => [...prev, area]);
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
          setTagAreas((prev) =>
            prev.filter((el) => {
              return el !== area;
            })
          );

          // 배열에서 클릭된 마커의 지역 인덱스 찾기
          const index = activeAreas.findIndex(function (element) {
            return element === area;
          });

          if (index !== -1) {
            activeAreas.splice(index, 1); // 배열에서 해당 지역 삭제
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
      <div className="container">
        <UserInfoNavBar
          personal_atv={"deactivation"}
          interest_atv={"deactivation"}
          activearea_atv={"activation"}
        />

        <div className="title">
          <p>원하는 활동지역을 선택해주세요! (최대 5개)</p>
        </div>

        <div id="map"></div>

        <div className="tags">
          {tagAreas
            .filter((element, idx) => {
              return tagAreas.indexOf(element) === idx;
            })
            .map((area, index) => {
              return (
                <div key={index} className="tag">
                  {area}
                </div>
              );
            })}
        </div>

        <div className="button-wrapper">
          <Link href="/signup/addinfo/interest">
            <button className="prev-button">이전</button>
          </Link>
          <a className="button-done" href="/" onClick={callUserRequest}>
            완료
          </a>
        </div>
      </div>

      <style jsx>{`
        .container {
          margin-top: 10px;
          border-top: 1px solid #e4e8eb;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .title {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .title p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 5px 0;
        }

        #map {
          width: 800px;
          height: 500px;
          margin: 30px 0;
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

        .button-wrapper {
          margin: 50px 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .prev-button {
          width: 120px;
          height: 40px;
          background-color: #d8d8d8;
          color: white;
          font-size: 1.5rem;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-right: 10px;
        }

        .button-done {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;y
          border: 0;
          border-radius: 10px;
          outline: 0;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ActiveArea;
