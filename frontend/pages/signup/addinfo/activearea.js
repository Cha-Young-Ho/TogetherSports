import Link from "next/link";
import { useState, useEffect } from "react";
import { postUserRequest } from "../../../api/members";
import { useSelector } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";
import { FailResponse } from "../../../api/failResponse";

let activeAreas = [];
const ActiveArea = () => {
  const userInfo = useSelector((state) => state.userRequestReducer);

  const [tagAreas, setTagAreas] = useState([]);

  // 서버에 회원가입 요청
  const callUserRequest = (e) => {
    console.log(activeAreas);
    if (activeAreas.length === 0) {
      e.preventDefault();
      alert("활동 지역을 최소 한 개 선택해주세요!");
      return;
    }

    if (
      userInfo.userNickname === "" ||
      userInfo.userBirthYear === "" ||
      userInfo.gender === "" ||
      userInfo.interests.length === 0
    ) {
      e.preventDefault();
      alert("비정상적인 접근입니다. 정보를 처음부터 다시 입력해주세요.");
      return;
    }

    postUserRequest(
      activeAreas,
      userInfo.gender,
      userInfo.interests,
      userInfo.userBirthDay,
      userInfo.userBirthMonday,
      userInfo.userBirthYear,
      userInfo.userNickname,
      userInfo.userProfileImage
    ).then((res) => {
      console.log(res.status.message);
      if (res.status.code === 5000) {
        alert("회원가입이 성공했습니다.");
      } else {
        FailResponse(res.status.code);
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

            const checkDuplication = (element) => {
              if (element === area) return true;
            };

            //배열에 담긴 지역이 5개 이하라면
            if (activeAreas.length < 5) {
              if (activeAreas.some(checkDuplication) === false) {
                getMarker(map, mouseEvent.latLng, geocoder); //클릭된 지역 마커표시
              } else {
                alert("해당 지역은 이미 선택되었습니다.");
              }

              activeAreas.push(area);

              //중복 지역 담기지 않게 하기
              activeAreas = activeAreas.filter((element, index) => {
                return activeAreas.indexOf(element) === index;
              });

              setTagAreas((prev) => [...prev, area]);
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
        <div className="tag-wrap">
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

        <div className="btn-wrapper">
          <Link href="/signup/addinfo/interest">
            <button className="left-button">이전</button>
          </Link>
          <Link href="/login">
            <button className="button-done" onClick={callUserRequest}>
              완료
            </button>
          </Link>
        </div>
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
          width: 800px;
          height: 500px;
          margin: 30px 72.5px 20px 72.5px;
          padding: 11px 13px 12px 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .tag-wrap {
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

        .button-tag-delete {
          border: none;
          cursor: pointer;
          background-color: #e0e0e0;
          color: #747474;
          font-weight: bold;
          margin-left: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
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

        .btn-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .left-button {
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
          margin-right: 30px;
        }
      `}</style>
    </>
  );
};

export default ActiveArea;
