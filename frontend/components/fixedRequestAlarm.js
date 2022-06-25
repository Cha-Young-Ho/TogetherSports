import Link from "next/link";
import { useState } from "react";

const FixedRequestAlarm = () => {
  const [miniMode, setMiniMode] = useState(false);

  return (
    <>
      {!miniMode ? (
        <div className="transparent-bg">
          <div className="request-wrapper">
            <div className="warning">!</div>
            <button
              className="simplification"
              onClick={() => setMiniMode(true)}
            >
              &times;
            </button>
            <p>회원추가 정보를 입력하지 않았어요!</p>
            <Link href="/signup/addinfo/personalinfo" passHref>
              <button className="btn-signup">입력하기</button>
            </Link>
          </div>
        </div>
      ) : (
        <button className="miniButton" onClick={() => setMiniMode(false)}>
          <p>+</p>
        </button>
      )}

      <style jsx>{`
        .transparent-bg {
          width: 200px;
          height: 200px;
          position: fixed;
          left: 20px;
          bottom: 20px;
          z-index: 10;
        }

        .request-wrapper {
          width: 200px;
          height: 160px;
          position: absolute;
          top: 40px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0px 0px 93px -42px rgba(0, 0, 0, 0.75);
          border-radius: 20px;
        }

        .warning {
          position: absolute;
          display: flex;
          justify-content: 
          top: -10px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #00555f;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.6rem;
        }

        .request-wrapper p{
          font-size: 1.2rem;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .simplification {
          width: 20px;
          height: 20px;
          border: none;
          cursor: pointer;
          position: absolute;
          right: 5px;
          top: 5px;
          background-color: black;
          color: white;
          border-radius: 20px;
        }

        .btn-signup {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 40px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          color: white;
          background-color: #00555f;
        }

        .miniButton {
          width: 50px;
          height: 50px;
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 20px;
          bottom: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.75);
          border-radius: 50%;
          z-index: 10;
          cursor: pointer;
          border: none;
        }

        .miniButton p {
          color: black;
          font-size: 2.5rem;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default FixedRequestAlarm;
