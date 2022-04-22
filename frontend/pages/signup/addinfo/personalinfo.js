import Link from "next/link";
import { useState, useEffect } from "react";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { getNicknameDuplicationCheck } from "../../../api/members";
import UserInfoNavBar from "../../../components/userInfoNavBar";

const PersonalInfo = () => {
  const dispatch = useDispatch();

  //닉네임
  const [nickname, setNickname] = useState("");
  const [isNicknameCheck, setIsNicknameCheck] = useState(true);

  //생년월일
  const [birthYear, setBirthYear] = useState("YYYY");
  const [birthMonth, setBirthMonth] = useState("MM");
  const [birthDay, setBirthDay] = useState("DD");
  const userBirth = `${birthYear}-${birthMonth}-${birthDay}`;

  //성별
  const [gender, setGender] = useState("male");

  //프로필
  const [profile, setProfile] = useState("");
  const [extension, setExtension] = useState("정보 없음");
  const [imagesrc, setImagesrc] = useState("정보 없음");

  // 닉네임 중복확인
  const checkNicknameDuplication = () => {
    if (nickname.length < 2 || nickname.length > 8) {
      alert("닉네임은 2글자 이상 ~ 8글자 이내로 입력해주세요.");
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

    setProfile(file.name);
    encodeFileToBase64(file);
    setExtension(imageFileExtension);
  };

  // 예외처리 및 다음 페이지 실행
  const getNext = (e) => {
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

    // 닉네임에 특수문자 사용했을 경우
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (special_pattern.test(checkNickname) === true) {
      e.preventDefault();
      alert("닉네임에 특수문자는 사용할 수 없습니다.");
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

    dispatch({
      type: "PERSONALINFO",
      payload: {
        userNickname: nickname,
        userBirth: userBirth,
        gender: gender,
        userProfileExtension: extension,
        imageSource: imagesrc,
      },
    });
  };

  useEffect(getBirthDay, []);

  return (
    <>
      <div className="container">
        <UserInfoNavBar
          personal_atv={"activation"}
          interest_atv={"deactivation"}
          activearea_atv={"deactivation"}
        />

        <div className="contents">
          <div className="content-nickname">
            <p className="essential-mark">*</p>
            <p>닉네임</p>
            <input
              type="text"
              id="input-nickname"
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

        <Link href="/signup/addinfo/interest">
          <button className="button-next" onClick={getNext}>
            다음
          </button>
        </Link>
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
        }

        .contents {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
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
          margin: 40px 0;
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
          margin: 40px 0;
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

        .content-gender {
          width: 100%;
          margin: 40px 0;
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
          margin: 40px 0;
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

        .button-next {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin-top: 25px;
          margin-bottom: 30px;
          border: none;
          border-radius: 10px;
          outline: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default PersonalInfo;
