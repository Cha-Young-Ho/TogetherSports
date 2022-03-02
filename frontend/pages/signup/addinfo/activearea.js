import Link from "next/link";
import { useState, useEffect } from "react";

const ActiveArea = () => {
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
          <p>위치 클릭 시 지역이 선택됩니다!</p>
        </div>
        <div>map</div>
        <Link href="/login">
          <button className="button-done">회원가입</button>
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

        .title-circle-activearea {
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

        .button-done {
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

export default ActiveArea;
