import Link from "next/link";
import { useState, useEffect } from "react";
import jquery from "jquery";
import $ from "jquery";
import Map from "../../../components/map";

const ActiveArea = () => {
  return (
    <>
      <div className="bg-container">
        <h1>회원가입</h1>
        <div className="title">
          <div>
            <div>
              <img
                src="/personalinfo-deactivation.png"
                alt="인적사항"
                className="title-circle-personalinfo"
              ></img>
            </div>
            <p>인적사항</p>
          </div>
          <div>
            <div>
              <img
                src="/interests-deactivation.png"
                alt="관심종목"
                className="title-circle-interest"
              ></img>
            </div>
            <p>관심종목</p>
          </div>
          <div>
            <div>
              <img
                src="/activearea-activation.png"
                alt="활동지역"
                className="title-circle-activearea"
              ></img>
            </div>
            <p>활동지역</p>
          </div>
        </div>
        <div className="content-showbox">
          <p>원하는 활동지역을 선택해주세요!</p>
        </div>
        <Map />
        <div className="tag-map">위치 태그</div>

        <Link href="/login">
          <button className="button-done">완료</button>
        </Link>
      </div>

      <style jsx>{`
        * {
          font-family: "NanumBarunGothic";
        }

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
          width: 90px;
          height: 90px;
          margin: 10px;
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

        .tag-map {
          width: 448px;
          align-items: left;
        }

        /* .area {
          width: 583px;
          height: 40px;
          margin: 44.5px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
        } */

        /* .text-area {
          font-weight: bold;
          font-size: 1.5em;
        }

        .dropdown-area {
          margin: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .sido {
          width: 180px;
          padding: 9px 11.8px 10.3px 27px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .sigugun {
          width: 120px;
          padding: 9px 12.8px 10.3px 15px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        }

        .dong {
          width: 120px;
          padding: 9px 12.8px 10.3px 15px;
          margin: 5px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          font-weight: bold;
        } */

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
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};

export default ActiveArea;
