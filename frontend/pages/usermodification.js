import { useState, useEffect } from "react";
import $ from "jquery";
import { getDuplicationCheck, putUpdateUserInfo } from "../api/members";
import { useSelector } from "react-redux";
import { FailResponse } from "../api/failResponse";

const UserModification = () => {
  //회원정보 초기값
  const userInfo = useSelector((state) => state.myInfoReducer);

  //닉네임
  const [nickname, setNickname] = useState(userInfo.userNickname);
  const [isNicknameCheck, setIsNicknameCheck] = useState(true);

  //생년월일
  const setBirth = userInfo.userBirth.split("-");
  const [birthYear, setBirthYear] = useState(setBirth[0]);
  const [birthMonth, setBirthMonth] = useState(setBirth[1]);
  const [birthDay, setBirthDay] = useState(setBirth[2]);
  const userBirth = `${birthYear}-${birthMonth}-${birthDay}`;

  //성별
  const [gender, setGender] = useState(userInfo.gender);

  //프로필
  const [profile, setProfile] = useState("");
  const [imagesrc, setImagesrc] = useState(
    userInfo.userProfileImage.imageSource
  );
  const [extension, setExtension] = useState(
    userInfo.userProfileImage.userProfileExtension
  );

  const onClickImage = (e) => {
    const file = e.target.files[0];
    if (file === undefined) {
      e.preventDefault();
      return;
    }
    const imageFileExtension = file.type.split("/")[1];
    setProfile((profile = file.name));
    setExtension(imageFileExtension);
    encodeFileToBase64(file);
  };

  // 활동지역
  let activeAreas = [];
  const [tagAreas, setTagAreas] = useState([]);

  const checkDuplication = () => {
    if (nickname.length < 2) {
      alert("닉네임은 최소 2글자 이상 입력해주세요.");
    } else {
      getDuplicationCheck(nickname).then((res) => {
        console.log(res.status.message);
        if (res.status.code === 5000) {
          setIsNicknameCheck(true);
          alert("사용 가능한 닉네임입니다.");
        } else {
          setNickname("");
          alert("이미 사용중인 닉네임입니다.");
        }
      });
    }
  };

  const getBirthDay = () => {
    $(document).ready(function () {
      const now = new Date();
      const year = now.getFullYear();

      $(".dropdown-year").append("<option value=''>년도</option>");
      for (let i = year; i >= 1920; i--) {
        $(".dropdown-year").append(
          '<option value="' + i + '">' + i + "</option>"
        );
      }

      $(".dropdown-month").append("<option value=''>월</option>");
      for (let i = 1; i <= 12; i++) {
        const mm = i > 9 ? i : "0" + i;
        $(".dropdown-month").append(
          '<option value="' + mm + '">' + mm + "</option>"
        );
      }

      $(".dropdown-day").append("<option value=''>일</option>");
      for (let i = 1; i <= 31; i++) {
        const dd = i > 9 ? i : "0" + i;
        $(".dropdown-day").append(
          '<option value="' + dd + '">' + dd + "</option>"
        );
      }

      // 생년월일 초기값 세팅
      $(".dropdown-year > option[value=" + birthYear + "]").attr(
        "selected",
        "true"
      );
      $(".dropdown-month > option[value=" + birthMonth + "]").attr(
        "selected",
        "true"
      );
      $(".dropdown-day > option[value=" + birthDay + "]").attr(
        "selected",
        "true"
      );
    });
  };

  const getGender = (genderType) => {
    setGender(genderType);
  };

  //프로필 이미지 source 인코딩
  const encodeFileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const baseURL = "";
      reader.readAsDataURL(file); //파일을 base64 text로 전환

      reader.onload = () => {
        baseURL = reader.result;
        const sliceIndex = baseURL.indexOf(",");
        setImagesrc(baseURL.substr(sliceIndex + 1));
        resolve(baseURL);
      };
    });
  };

  //관심종목
  const [interests, setInterests] = useState({});

  //종목 유형
  const interestArray = [
    "축구",
    "야구",
    "농구",
    "당구",
    "탁구",
    "헬스",
    "자전거",
    "골프",
    "등산",
    "런닝",
    "배드민턴",
    "기타종목",
  ];

  // 초기값 세팅
  useEffect(() => {
    // 관심 종목 세팅
    for (const exercise of userInfo.interests) {
      setInterests((prev) => ({
        ...prev,
        [exercise]: true,
      }));
    }

    // 활동 지역 세팅
    userInfo.activeAreas.map((area) => {
      activeAreas.push(area);
      setTagAreas((prev) => [...prev, area]);
    });

    getBirthDay();
    getMap();
  }, []);

  //종목 선택시
  const changeInterests = (e) => {
    if (e.target.classList[2] === "clicked") {
      e.target.classList.remove("clicked");
    } else {
      if (
        Object.entries(interests).filter((exer) => {
          if (exer[1]) return true;
        }).length >= 5
      ) {
        alert("최대 5개 까지만 선택할 수 있습니다.");
        return;
      }
      e.target.classList.add("clicked");
    }

    setInterests((prev) => ({
      ...prev,
      [e.target.innerText]: !interests[e.target.innerText],
    }));
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

  //예외처리 및 수정버튼
  const clickUpdateUserInfo = (e) => {
    const checkNickname = $("#input-nickname").val();

    //닉네임 입력 안했을 경우
    if (checkNickname === "" || checkNickname === null) {
      e.preventDefault();
      alert("닉네임을 입력해주세요.");
      return false;
    }

    //닉네임에 공백이 있을 경우
    const blank_pattern = /[\s]/g;
    if (blank_pattern.test(checkNickname) === true) {
      e.preventDefault();
      alert("닉네임을 공백없이 입력해주세요.");
      return false;
    }

    //특수문자 사용했을 경우
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (special_pattern.test(checkNickname) === true) {
      e.preventDefault();
      alert("닉네임에 특수문자는 사용할 수 없습니다.");
      return false;
    }

    //중복체크를 하지 않은 경우
    if (!isNicknameCheck) {
      e.preventDefault();
      alert("닉네임 중복확인을 해주세요!");
    }

    if (
      birthYear === "YYYY" ||
      birthMonth === "MM" ||
      birthDay === "DD" ||
      birthYear === "" ||
      birthMonth === "" ||
      birthDay === ""
    ) {
      e.preventDefault();
      alert("생년월일을 확인해주세요.");
      return false;
    }

    if (!Object.keys(interests).length) {
      e.preventDefault();
      alert("최소 1개의 종목을 선택하여야 합니다.");
      return false;
    }

    putUpdateUserInfo(
      userInfo.userEmail,
      userInfo.userName,
      nickname,
      userBirth,
      activeAreas,
      gender,
      {
        userProfileRealName: fileName,
        userProfileExtension: extension,
        imageSource: imagesrc,
      },
      userInfo.provider,
      interests
    ).then((res) => {
      if (res.status.code === 5000) {
        alert("성공적으로 수정 되었습니다.");
        window.history.back();
      } else {
        FailResponse(res.status.code);
      }
    });
  };

  return (
    <>
      <div className="container-bg">
        <div className="personalInfo-wrapper">
          <div className="title">인적사항</div>
          <div className="widthBar"></div>
          <div className="content-showbox">
            <div className="nickname">
              <div className="nickname-text-box">
                <div className="essential-mark">*</div>
                <div className="text-nickname">닉네임</div>
              </div>
              <input
                type="text"
                id="input-nickname"
                value={nickname}
                name="nickname"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className="button-dup-check" onClick={checkDuplication}>
                중복확인
              </button>
            </div>
            <div className="birth">
              <div className="birth-text-box">
                <div className="essential-mark">*</div>
                <div className="text-birth">생년월일</div>
              </div>
              <div className="dropdown-birth">
                <div>
                  <select
                    className="dropdown-year"
                    title="년도"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                  ></select>
                </div>
                <div>
                  <select
                    className="dropdown-month"
                    title="월"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                  ></select>
                </div>
                <div>
                  <select
                    className="dropdown-day"
                    title="일"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                  ></select>
                </div>
              </div>
            </div>
            <div className="gender">
              <div className="gender-text-box">
                <div className="essential-mark">*</div>
                <div className="text-gender">성별</div>
              </div>
              <div className="radio-gender">
                <div className="male">
                  <label className="text-male" htmlFor="radio-male">
                    남
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="radio-male"
                    checked={gender === "male"}
                    onChange={() => getGender("male")}
                  />
                </div>
                <div className="female">
                  <label className="text-male" htmlFor="radio-female">
                    여
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="radio-female"
                    checked={gender === "female"}
                    onChange={() => getGender("female")}
                  />
                </div>
              </div>
            </div>
            <div className="profile">
              <div className="text-profile">프로필</div>
              <input readOnly className="upload-name" value={profile} />
              <label htmlFor="filename">
                <div>파일찾기</div>
              </label>
              <input
                type="file"
                id="filename"
                accept=".jpg, .jpeg, .png"
                onChange={onClickImage}
              />
            </div>
          </div>
        </div>
        <div className="interest-wrapper">
          <div className="title">관심종목</div>
          <div className="widthBar"></div>
          <div className="grid-interest">
            {interestArray.map((exercise, index) => {
              return (
                <div
                  key={index}
                  onClick={changeInterests}
                  className={`grid-items ${
                    userInfo.interests.indexOf(exercise) === -1 ? `` : `clicked`
                  }`}
                >
                  {exercise}
                </div>
              );
            })}
          </div>
        </div>
        <div className="activearea-wrapper">
          <div className="title">활동지역</div>
          <div className="widthBar"></div>
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
          <div className="widthBar"></div>
        </div>
        <div className="final-container">
          <button className="button-done" onClick={clickUpdateUserInfo}>
            수정
          </button>
          <button className="button-done" onClick={() => window.history.back()}>
            나가기
          </button>
        </div>
      </div>
      <style jsx>{`
        .container-bg {
          width: 70%;
          min-width: 1000px;
          margin: 0 auto;
          height: 1200px;
        }

        .title {
          font-size: 2.5rem;
          padding-top: 30px;
          font-weight: bold;
        }

        .widthBar {
          margin: 5px;
          width: 100%;
          border-top: 0.1px solid #eaeaea;
        }

        .personalInfo-wrapper {
          display: flex;
          flex-direction: column;
          margin-top: 90px;
          width: 100%;
          height: 350px;
        }

        .interest-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 400px;
        }

        .activearea-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 500px;
        }

        .content-showbox {
          width: 600px;
        }

        .nickname {
          width: 583px;
          height: 40px;
          margin: 30px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
        }

        .nickname-text-box,
        .birth-text-box,
        .gender-text-box { 
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .essential-mark {
          font-size: 1.5em;
          font-weight: bold;
          color: red;
          margin-right: 3px;
        }

        .text-nickname {
          width: 45px;
          height: 30px;
          font-weight: bold;
          font-size: 1.5em;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #input-nickname {
          width: 430px;
          height: 30px;
          border-style: none;
          font-size: 1.5em;
          padding: 5px;
        }

        .button-dup-check {
          width: 70px;
          background-color: #08555f;
          color: white;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 5px;
        }

        .birth {
          width: 583px;
          height: 40px;
          margin: 15px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-birth {
          font-weight: bold;
          font-size: 1.5em;
        }

        .dropdown-birth {
          display: flex;
          flex-direction: row:
          justify-content: space-between;
        }

        .dropdown-year {
          width: 180px;
          padding: 9px 11.8px 10.3px 27px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .dropdown-month {
          width: 120px;
          padding: 9px 12.8px 10.3px 15px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .dropdown-day {
          width: 120px;
          padding: 9px 12.8px 10.3px 15px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .gender {
          width: 583px;
          height: 40px;
          margin: 15px 5.5px 15px;
          padding: 5px 10px 5px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-gender {
          font-weight: bold;
          font-size: 1.5em;
        }

        .radio-gender {
          width: 150px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .male,
        .female {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .text-male,
        .text-female {
          width: 30px;
          font-size: 1.5em;
          font-weight: bold;
        }

        #radio-male,
        #radio-female {
          width: 17px;
          height: 17px;
          -webkit-appearance: none;
          border: 1px solid darkgray;
          border-radius: 50%;
          outline: none;
          background: #ffffff;
        }

        #radio-male:before,
        #radio-female:before {
          content: "";
          display: block;
          width: 70%;
          height: 70%;
          margin: 15% auto;
          border-radius: 50%;
        }

        #radio-male:checked:before,
        #radio-female:checked:before {
          background: #08555f;
        }

        .profile {
          width: 583px;
          height: 40px;
          margin: 0 5.5px 27px;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
        }

        .text-profile {
          width: 45px;
          height: 30px;
          font-weight: bold;
          font-size: 1.5em;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-name {
          width: 430px;
          height: 30px;
          border-style: none;
          font-size: 1.5em;
          padding: 5px;
        }

        .profile label {
          width: 70px;
          background-color: #08555f;
          color: white;
          font-size: 1.3em;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile input[type="file"] {
          position: absolute;
          width: 0;
          height: 0;
          padding: 0;
          border: 0;
          overflow: hidden;
        }

        // 관심 종목 Grid
        .grid-interest {
          display: grid;
          margin-top: 20px;
          grid-auto-rows: minmax(140px, auto);
          grid-template-columns: repeat(6, minmax(120px, auto));
          gap: 10px;
        }

        // 관심 종목 items
        .grid-items {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: gray;
          color: white;
          border-radius: 10px;
          font-size: 1.5rem;
        }

        .grid-items:hover {
          transition-duration: 0.5s;
          transform: scale(1.2);
          background-color: #468f5b;
        }

        .clicked {
          background-color: #468f5b;
        }

        #map {
          width: 800px;
          height: 500px;
          margin: 20px 0 20px 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .tag-wrap {
          width: 800px;
          margin-bottom: 10px;
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

        .final-container{
          width: 300px;
          height: 200px;
          display: flex;
          float: right;
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
          margin-left: 20px;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default UserModification;
