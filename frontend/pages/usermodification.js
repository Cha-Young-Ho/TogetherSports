import { useState, useEffect, useRef } from "react";
import jquery from "jquery";
import $ from "jquery";
import { getDuplicationCheck } from "../api/members";
import { useSelector } from "react-redux";

const UserModification = () => {
  //회원정보 초기값
  const userInfo = useSelector((state) => state.myInfoReducer);
  //닉네임
  const [nickname, setNickname] = useState(userInfo.userNickname);
  const [isNicknameCheck, setIsNicknameCheck] = useState(true);

  //생년월일
  const [birthYear, setBirthYear] = useState(userInfo.userBirthYear);
  const [birthMonth, setBirthMonth] = useState(userInfo.userBirthMonth);
  const [birthDay, setBirthDay] = useState(userInfo.userBirthDay);

  //성별
  const [gender, setGender] = useState(userInfo.gender);

  //프로필
  const [profile, setProfile] = useState("");
  const [imagesrc, setImagesrc] = useState(
    userInfo.userProfileImage.imageSource
  );
  const [fileName, setFileName] = useState(
    userInfo.userProfileImage.userProfileRealName
  );
  const [extension, setExtension] = useState(
    userInfo.userProfileImage.userProfileExtension
  );

  /* 
  닉네임 중복확인
  Success => nickName = 현재 적혀있는 input
  fail => nickName = 초기화
  */
  const checkDuplication = () => {
    if (nickname.length < 2) {
      alert("닉네임은 최소 2글자 이상 입력해주세요.");
    } else {
      getDuplicationCheck(nickname).then((res) => {
        console.log(res.message);
        if (res.code === 5000) {
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
    });
  };

  const getGender = (genderType) => {
    setGender(genderType);
  };

  //프로필 이미지 source 인코딩
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImagesrc(reader.result);
        resolve();
      };
    });
  };

  const getExtension = (profilename) => {
    if (profilename.indexOf("png") !== -1) {
      return profilename.indexOf("png");
    } else if (profilename.indexOf("jpg") !== -1) {
      return profilename.indexOf("jpg");
    }
    if (profilename.indexOf("jpeg") !== -1) {
      return profilename.indexOf("jpeg");
    }
  };

  //예외처리
  const getNext = (e) => {
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

  const already = ["축구", "야구", "농구"];

  //초기 종목 세팅
  useEffect(() => {
    for (const exercise of already) {
      setInterests((prev) => ({
        ...prev,
        [exercise]: true,
      }));
    }

    getBirthDay();
  }, []);

  //종목 선택시
  const changeInterests = (e) => {
    if (e.target.classList[2] === "clicked") {
      e.target.classList.remove("clicked");
    } else {
      e.target.classList.add("clicked");
    }

    setInterests((prev) => ({
      ...prev,
      [e.target.innerText]: !interests[e.target.innerText],
    }));
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
              <input
                readOnly
                className="upload-name"
                value={profile.substr(12)}
              />
              <label htmlFor="filename">
                <div>파일찾기</div>
              </label>
              <input
                type="file"
                id="filename"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  setProfile((profile = e.target.value));
                  const index = getExtension(profile.substr(12)); // 확장자 index 받아오기
                  const splitData1 = profile.substr(12).substring(0, index - 1);
                  const splitData2 = profile.substr(12).substring(index);
                  setFileName(splitData1);
                  setExtension(splitData2);
                  encodeFileToBase64(e.target.files[0]);
                }}
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
                    already.indexOf(exercise) === -1 ? `` : `clicked`
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
          margin-top: 4.5px;
          width: 100%;
          border: 0.3px solid lightgrey;
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
      `}</style>
    </>
  );
};

export default UserModification;