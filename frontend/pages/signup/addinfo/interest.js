import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";

const Interest = () => {
  const dispatch = useDispatch();
  const [interests, setInterests] = useState({});
  const interestArray = [
    "축구",
    "야구",
    "농구",
    "풋살",
    "배구",
    "배드민턴",
    "테니스",
    "골프",
    "수영",
    "핸드볼",
    "기타종목",
  ];

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

  const BtnClickedNext = () => {
    dispatch({
      type: "INTERESTS",
      payload: {
        interests: interests,
      },
    });
  };

  return (
    <>
      <div className="bg-container">
        <UserInfoNavBar
          personal_atv={"deactivation"}
          interest_atv={"activation"}
          activearea={"deactivation"}
        />
        <div className="content-showbox">
          <p>관심있는 종목에 맞는 방을 추천 해드립니다!</p>
        </div>
        <div className="grid-interest">
          {interestArray.map((exercise, index) => {
            return (
              <div key={index} onClick={changeInterests} className="grid-items">
                {exercise}
              </div>
            );
          })}
        </div>
        <Link href="/signup/addinfo/activearea">
          <div onClick={BtnClickedNext} className="next-button">
            다음
          </div>
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

        .grid-interest {
          display: grid;

          margin-top: 20px;
          grid-auto-rows: minmax(140px, auto);
          grid-template-columns: repeat(4, minmax(140px, auto));
          gap: 10px;
        }

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

export default Interest;
