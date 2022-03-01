import Link from "next/link";
import { useState, useEffect } from "react";

const PersonalInfo = () => {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(false);

  const handleClickRadioButton = (radioBtnName) => {
    setGender(radioBtnName);
  };

  useEffect(() => {
    console.log(nickname);
    console.log(gender);
  });

  return (
    <>
      <div className="bg-container">
        <h1>회원가입</h1>
        <div className="title">
          <div>
            <div className="title-circle-personalinfo"></div>
            <p>인적사항</p>
          </div>
          <div>
            <div className="title-circle-interest"></div>
            <p>관심종목</p>
          </div>
          <div>
            <div className="title-circle-activearea"></div>
            <p>활동지역</p>
          </div>
        </div>
        <div className="content-showbox">
          <div className="nickname">
            <div className="text-nickname">닉네임</div>
            <input
              type="text"
              id="input-nickname"
              value={nickname}
              name="nickname"
              onChange={(e) => setNickname(e.target.value)}
            />
            <button className="button-dup-check">중복확인</button>
          </div>
          <div className="birth">
            <div className="text-birth">생년월일</div>
            <div className="dropdown-birth">
              <div className="year">
                <select className="dropdown-year">
                  <option>1998</option>
                </select>
              </div>
              <div className="month">
                <select className="dropdown-month">
                  <option>1</option>
                </select>
              </div>
              <div className="day">
                <select className="dropdown-day">
                  <option>1</option>
                </select>
              </div>
            </div>
          </div>
          <div className="gender">
            <div className="text-gender">성별</div>
            <div className="radio-gender">
              <div className="male">
                <label className="text-male" for="radio-male">
                  남
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="radio-male"
                  checked={gender === "male"}
                  onClick={() => handleClickRadioButton("male")}
                />
              </div>
              <div className="female">
                <label className="text-male" for="radio-female">
                  여
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="radio-female"
                  checked={gender === "female"}
                  onClick={() => handleClickRadioButton("female")}
                />
              </div>
            </div>
          </div>
        </div>
        <Link href="/signup/addinfo/interest">
          <button className="button-next">다음</button>
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
          font-family: "NanumBarunGothic";
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
          border: 1px solid #e4e8eb;
          background-color: #e4e8eb;
          width: 90px;
          height: 90px;
          margin: 10px;
        }

        .title-circle-personalinfo {
          background-color: #468f5b;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
          align-items: center;
          margin: 5px 0;
        }

        .content-showbox {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .nickname {
          width: 583px;
          height: 40px;
          margin: 44.5px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
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
          font-family: "NanumBarunGothic";
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 5px;
        }

        .birth {
          width: 583px;
          height: 40px;
          margin: 44.5px 5.5px 27px;
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
          margin: 44.5px 5.5px 27px;
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

        .button-next {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
          margin-top: 25px;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default PersonalInfo;
