import { useState, useEffect } from "react";
import $ from "jquery";
import { getNicknameDuplicationCheck, postUserRequest } from "../api/members";
import { useDispatch, useSelector } from "react-redux";
import { FailResponse } from "../api/failResponse";
import Map from "../components/Map";

const UserModification = () => {
  const dispatch = useDispatch();

  // 회원정보 초기값
  const userInfo = useSelector((state) => state.myInfoReducer);

  const activeAreas = useSelector(
    (state) => state.saveActiveAreaReducer.activeAreas
  );

  // 닉네임
  const [nickname, setNickname] = useState(userInfo.userNickname);
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);

  // 생년월일
  const setBirth = userInfo.userBirth.split("-");
  const [birthYear, setBirthYear] = useState(setBirth[0]);
  const [birthMonth, setBirthMonth] = useState(setBirth[1]);
  const [birthDay, setBirthDay] = useState(setBirth[2]);
  const userBirth = `${birthYear}-${birthMonth}-${birthDay}`;

  // 성별
  const [gender, setGender] = useState(userInfo.gender);

  // 프로필
  const setProfileTemp = userInfo.userProfileImagePath.split("/");
  const [profile, setProfile] = useState(
    setProfileTemp[setProfileTemp.length - 1]
  );
  const [extension, setExtension] = useState("");
  const [imagesrc, setImagesrc] = useState("");

  // 관심종목
  const [interests, setInterests] = useState({});
  // 종목 유형
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

  // 닉네임 중복확인
  const checkNicknameDuplication = () => {
    if (nickname.length < 2) {
      alert("닉네임은 최소 2글자 이상 입력해주세요.");
    } else {
      getNicknameDuplicationCheck(nickname).then((res) => {
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

  // 생년월일 dropdown 데이터 가져오기
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

  // 성별 설정
  const getGender = (genderType) => {
    setGender(genderType);
  };

  // 프로필 이미지 source 인코딩
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

  // 프로필 이미지 선택 함수
  const onClickProfileImage = (e) => {
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

  // 관심 종목 선택시
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

  // 예외처리 및 수정버튼
  const clickUpdateUserInfo = (e) => {
    const checkNickname = $("#input-nickname").val();

    if (checkNickname === "" || checkNickname === null) {
      e.preventDefault();
      alert("닉네임을 입력해주세요.");
      return false;
    }

    // 닉네임에 공백이 있을 경우
    const blank_pattern = /[\s]/g;
    if (blank_pattern.test(checkNickname) === true) {
      e.preventDefault();
      alert("닉네임을 공백없이 입력해주세요.");
      return false;
    }

    // 닉네임에 특수문자 사용했을 경우 (추후 수정 예정)
    // const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    // if (special_pattern.test(checkNickname) === true) {
    //   e.preventDefault();
    //   alert("닉네임에 특수문자는 사용할 수 없습니다.");
    //   return false;
    // }

    // 닉네임 길이 제한
    if (checkNickname.length < 2 && checkNickname.length > 8) {
      e.preventDefault();
      alert("닉네임은 최소 2글자 최대 8글자까지 입력 가능합니다.");
      return false;
    }

    // 닉네임 중복체크를 하지 않은 경우
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

    if (extension === "" || imagesrc === "") {
      setExtension(null);
      setImagesrc(null);
    }

    // 회원가입 요청 및 회원정보 수정
    postUserRequest(
      nickname,
      userBirth,
      activeAreas,
      gender,
      extension,
      imagesrc,
      Object.entries(interests)
        .filter((exer) => {
          if (exer[1]) return true;
        })
        .map((el) => el[0])
    )
      .then((res) => {
        if (res.status.code === 5000) {
          getMyInfo((res) => {
            if (res.status.code === 5000) {
              dispatch({
                type: "SAVEMYINFO",
                payload: {
                  userEmail: res.content.userEmail,
                  userName: res.content.userName,
                  userNickname: res.content.userNickname,
                  userBirth: res.content.userBirth,
                  gender: res.content.gender,
                  userProfileImagePath: res.content.userProfileImagePath,
                  activeAreas: res.content.activeAreas,
                  interests: res.content.interests,
                  mannerPoint: res.content.mannerPoint,
                  isInformationRequired: res.content.isInformationRequired,
                },
              });
              alert("성공적으로 수정 되었습니다.");
              window.history.back();
              return;
            }
          }).catch((error) => {
            FailResponse(error.response.data.status.code);
            return;
          });
        }
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code);
        return;
      });
  };

  // 초기값 세팅
  useEffect(() => {
    // if (userInfo.id === 0) {
    //   alert("먼저 추가정보를 입력해주세요.");
    //   window.history.back();
    //   return;
    // }

    // 관심 종목 세팅
    for (const exercise of userInfo.interests) {
      setInterests((prev) => ({
        ...prev,
        [exercise]: true,
      }));
    }

    // const tempAreasInfo = [];
    // // 활동 지역 세팅
    // userInfo.activeAreas.forEach((area) => {
    //   tempAreasInfo.push(area);
    // });

    dispatch({
      type: "SAVEACTIVEAREA",
      payload: {
        activeAreas: userInfo.activeAreas,
      },
    });

    dispatch({
      type: "SAVETAGAREAS",
      payload: {
        tagAreas: userInfo.activeAreas,
      },
    });

    getBirthDay();
  }, []);

  return (
    <>
      <div className="container">
        <div className="personalInfo-wrapper">
          <div className="title">인적사항</div>
          <div className="widthBar"></div>
          <div className="contents">
            <div className="content-nickname">
              <p className="essential-mark">*</p>
              <p>닉네임</p>
              <input
                type="text"
                id="input-nickname"
                minLength={2}
                maxLength={8}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button onClick={checkNicknameDuplication}>중복확인</button>
            </div>

            <div className="content-birth">
              <div>
                <p className="essential-mark">*</p>
                <p>생년월일</p>
              </div>

              <div>
                <select
                  className="dropdown-year"
                  title="년도"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                ></select>
                <select
                  className="dropdown-month"
                  title="월"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                ></select>
                <select
                  className="dropdown-day"
                  title="일"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                ></select>
              </div>
            </div>

            <div className="content-gender">
              <div>
                <p className="essential-mark">*</p>
                <p>성별</p>
              </div>

              <div>
                <div className="male">
                  <label htmlFor="radio-male">남</label>
                  <input
                    type="radio"
                    name="gender"
                    id="radio-male"
                    checked={gender === "male"}
                    onChange={() => getGender("male")}
                  />
                </div>

                <div className="female">
                  <label htmlFor="radio-female">여</label>
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

            <div className="content-profile">
              <p>프로필</p>
              <input readOnly value={profile} />
              <label htmlFor="filename">
                <p>파일찾기</p>
              </label>
              <input
                type="file"
                id="filename"
                accept=".jpg, .jpeg, .png"
                onChange={onClickProfileImage}
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
          <div className="map-wrapper">
            <Map />
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
        input:focus {
          outline: none;
        }

        .container {
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
          margin: 5px 0;
          width: 100%;
          border-top: 0.1px solid #eaeaea;
        }

        .personalInfo-wrapper {
          display: flex;
          flex-direction: column;
          margin-top: 90px;
          width: 100%;
          height: 400px;
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
        }

        .contents {
          width: 600px;
        }

        .essential-mark {
          color: red;
        }

        .content-nickname p, .content-birth p, .content-gender p, .content-profile > p {
          font-weight: bold;
          font-size: 1.5em;
          margin-right: 3px;
        }

        .content-nickname {
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

        .content-nickname input {
          width: 440px;
          height: 30px;
          border-style: none;
          font-size: 1.4em;
          padding: 5px;
          margin-left: 2px;
          margin-right: 5px;
        }

        .content-nickname button {
          width: 70px;
          height: 28px;
          background-color: #08555f;
          color: white;
          border: none;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
        }

        .content-birth {
          width: 100%;
          margin: 30px 0;
          padding: 5px 10px 5px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content-birth > div {
          display: flex;
          flex-direction: row:
          justify-content: space-between;
        }

        .dropdown-year {
          width: 180px;
          padding: 10px 10px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .dropdown-month, .dropdown-day {
          width: 120px;
          padding: 10px 10px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .map-wrapper {
          width: 800px;
          height: 500px;
          margin-bottom: 30px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #f2f2f2;
        }

        .content-gender {
          width: 100%;
          margin: 30px 0;
          padding: 5px 10px 5px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content-gender > div:nth-child(1) {
          display: flex;
          flex-direction: row:
          justify-content: space-between;
        }

        .content-gender > div:nth-child(2) {
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

        .male label,
        .female label {
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

        .content-profile {
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

        .content-profile input {
          width: 450px;
          height: 30px;
          border-style: none;
          font-size: 1.4em;
          padding: 5px;
          margin-left: 2px;
          margin-right: 5px;
        }

        .content-profile label {
          width: 70px;
          height: 28px;
          background-color: #08555f;
          color: white;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3em;
          cursor: pointer;
        }

        .content-profile input[type="file"] {
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
