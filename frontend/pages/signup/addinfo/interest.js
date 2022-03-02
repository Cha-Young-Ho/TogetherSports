import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Interest = () => {
  const dispatch = useDispatch();
  const [interests, setInterests] = useState({});

  const changeInterests = (e) => {
    if (e.target.classList[2] === "clicked") {
      e.target.classList.remove("clicked");
    } else {
      e.target.classList.add("clicked");
    }

    setInterests({
      ...interests,
      [e.target.innerText]: !interests[e.target.innerText],
    });
  };

  const BtnClickedNext = () => {
    dispatch({
      type: "INTERESTS",
      payload: {
        interests: interests,
      },
    });
  };

  // useEffect(() => {
  //   console.log(interests);
  // }, [interests]);

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
          <p>관심있는 종목에 맞는 방을 추천 해드립니다!</p>
        </div>
        <div className="grid-interest">
          <div onClick={changeInterests} className="grid-items">
            축구
          </div>
          <div onClick={changeInterests} className="grid-items">
            야구
          </div>
          <div onClick={changeInterests} className="grid-items">
            농구
          </div>
          <div onClick={changeInterests} className="grid-items">
            풋살
          </div>
          <div onClick={changeInterests} className="grid-items">
            배구
          </div>
          <div onClick={changeInterests} className="grid-items">
            배드민턴
          </div>
          <div onClick={changeInterests} className="grid-items">
            테니스
          </div>
          <div onClick={changeInterests} className="grid-items">
            골프
          </div>
          <div onClick={changeInterests} className="grid-items">
            9
          </div>
          <div onClick={changeInterests} className="grid-items">
            10
          </div>
          <div onClick={changeInterests} className="grid-items">
            11
          </div>
        </div>
        <div onClick={BtnClickedNext} className="next-button">
          다음
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

        .title-circle-interest {
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
          font-family: "NanumBarunGothic";
          margin-top: 25px;
          border: 0;
          outline: 0;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Interest;
