import Link from "next/link";
import { useState, useEffect } from "react";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { getNicknameDuplicationCheck } from "../../../api/members";
import UserInfoNavBar from "../../../components/userInfoNavBar";
import Head from "next/head";
import { useRouter } from "next/router";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 닉네임
  const [nickname, setNickname] = useState("");
  const [validNickname, setValidNickname] = useState("");
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);

  // 생년월일
  const [birthYear, setBirthYear] = useState("YYYY");
  const [birthMonth, setBirthMonth] = useState("MM");
  const [birthDay, setBirthDay] = useState("DD");
  const userBirth = `${birthYear}-${birthMonth}-${birthDay}`;

  // 성별
  const [gender, setGender] = useState("male");

  // 프로필
  const [profile, setProfile] = useState("");
  const [extension, setExtension] = useState("");
  const [imagesrc, setImagesrc] = useState("");

  // 닉네임 중복확인
  const checkNicknameDuplication = () => {
    if (nickname.length < 2 || nickname.length > 8) {
      alert("닉네임은 2글자 이상 ~ 8글자 이내로 입력해주세요.");
      return;
    } else {
      getNicknameDuplicationCheck(nickname).then((res) => {
        if (res.status.code === 5000) {
          setIsNicknameCheck(true);
          setValidNickname(nickname);
          alert("사용 가능한 닉네임입니다.");
        } else {
          setNickname("");
          setValidNickname("");
          setIsNicknameCheck(false);
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

  // 프로필 이미지 삭제 및 초기화 함수
  const deleteProfileImage = () => {
    setProfile((profile = ""));
    setExtension((extension = ""));
    setImagesrc((imagesrc = ""));
  };

  // 예외처리 및 다음 페이지 실행
  const getNext = (e) => {
    if (nickname === "" || nickname === null) {
      e.preventDefault();
      alert("닉네임을 입력해주세요.");
      return false;
    }

    // 닉네임에 공백이 있을 경우
    const blank_pattern = /[\s]/g;
    if (blank_pattern.test(nickname) === true) {
      e.preventDefault();
      alert("닉네임을 공백없이 입력해주세요.");
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

    if (extension === "" || imagesrc === "") {
      setExtension((extension = null));
      setImagesrc((imagesrc = null));
    }

    dispatch({
      type: "PERSONALINFO",
      payload: {
        userNickname: validNickname,
        userBirth: userBirth,
        gender: gender,
        userProfileExtension: extension,
        imageSource: imagesrc,
      },
    });

    router.push("/signup/addinfo/interest");
  };

  useEffect(getBirthDay, []);

  return (
    <>
      <Head>
        <title>회원 정보 입력</title>
      </Head>
      <div className="container">
        <UserInfoNavBar
          personal_atv={"activation"}
          interest_atv={"deactivation"}
          activearea_atv={"deactivation"}
        />

        <div>
          <div className="contents-info">
            <p>활동하실 때 필요한 정보를 추가적으로 입력해주세요 :)</p>
          </div>

          <div className="content-nickname">
            <p>🔥 사용하실 닉네임은요 ? 🔥</p>

            <div>
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
          </div>

          <div className="line"></div>

          <div className="content-birth">
            <p>{`${nickname}님의 🎂생년월일🎂을 선택해주세요 !`}</p>

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

          <div className="dividing-line">
            <div className="line"></div>
            <div>+ 기타 정보도 입력해주세요 !</div>
            <div className="line"></div>
          </div>

          <div className="content-gender">
            <p>성별</p>

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

          <div className="content-profiles">
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
            <button
              className="delete-profile-button"
              onClick={deleteProfileImage}
            >
              삭제
            </button>
          </div>
        </div>

        <button className="next-button" onClick={getNext}>
          다음
        </button>
      </div>

      <style jsx>{`
        input:focus {
          outline: none;
        }

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

        .contents-info {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .line {
          width: 100%;
          border-top: 1px solid #e4e8eb;
          border-bottom: none;
        }

        .contents-info p {
          margin: 5px 0;
          text-align: center;
          font-size: 1.5rem;
        }

        .essential-mark {
          color: red;
        }

        .content-gender p, .content-profile > p {
          font-weight: bold;
          font-size: 1.5rem;
          margin-right: 3px;
        }

        .content-nickname {
          width: 100%;
          height: 130px;
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .content-nickname > p {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .content-nickname input {
          width: 240px;
          height: 40px;
          padding: 10px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-size: 1.4rem;
          font-weight: bold;
          margin-right: 15px;
        }

        .content-nickname button {
          width: 84px;
          height: 30px;
          background-color: #08555f;
          color: white;
          border: none;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
        }

        .content-birth {
          width: 100%;
          height: 150px;
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .content-birth > p {
          font-size: 1.5rem;
          margin-bottom: 20px;
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

        .dividing-line {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center
        }

        .dividing-line > div:nth-child(2) {
          width: 600px;
          height: 37px;
          border-radius: 18.5px;
          background-color: #6db152;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.3rem;
        }

        .content-gender {
          width: 100%;
          margin: 40px 0 30px 0;
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

        .content-profiles {
          width: 100%;
          height: 40px;
          margin: 40px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .content-profile {
          width: 90%;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .content-profile input {
          width: 390px;
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

        .delete-profile-button {
          margin-left: 10px;
          width: 50px;
          height: 30px;
          border-radius: 5px;
          background-color: #08555f;
          color: white;
          border: none;
          cursor: pointer;
        }

        .next-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin-top: 25px;
          margin-bottom: 50px;
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
