import Link from "next/link";
import { useState } from "react";

const FixedRequestAlarm = () => {
  const [miniMode, setMiniMode] = useState(false);

  return (
    <>
      {!miniMode ? (
        <div className="request-wrapper">
          <button className="simplification" onClick={() => setMiniMode(true)}>
            &times;
          </button>
          <Link href="/signup/addinfo/personalinfo">
            <button className="btn-signup">가입하기</button>
          </Link>
        </div>
      ) : (
        <button className="miniButton" onClick={() => setMiniMode(false)}>
          <p>+</p>
        </button>
      )}

      <style jsx>{`
        .request-wrapper {
          width: 200px;
          height: 200px;
          position: fixed;
          left: 20px;
          bottom: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0px 0px 93px -42px rgba(0, 0, 0, 0.75);
          border-radius: 20px;
          z-index: 10;
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
          width: 100%;
          height: 30px;
          border: none;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          cursor: pointer;
          background-color: tomato;
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
