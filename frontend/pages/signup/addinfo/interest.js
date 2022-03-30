import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";

const Interest = () => {
  const dispatch = useDispatch();
  const [interests, setInterests] = useState({});
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

  const BtnClickedNext = (e) => {
    if (
      Object.entries(interests).filter((exer) => {
        if (exer[1]) return true;
      }).length === 0
    ) {
      e.preventDefault();
      alert("최소 1개의 종목을 선택하여야 합니다.");
      return false;
    }

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
        <div className="btn-wrapper">
          <Link href="/signup/addinfo/personalinfo">
            <button className="left-button">이전</button>
          </Link>
          <Link href="/signup/addinfo/activearea">
            <button onClick={BtnClickedNext} className="next-button">
              다음
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

        .btn-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
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

export default Interest;
