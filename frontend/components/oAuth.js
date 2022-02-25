import Link from "next/link";
import { signIn } from "next-auth/react";

const OAuth = () => {
  return (
    <>
      <div className="signup-page">
        <section className="section-left">
          <div className="logo">
            <img src="/logo-sign.png" alt="Together Sports"></img>
          </div>
          <div className="signup-box">
            <h1 className="signup-text">회원 가입</h1>
            <div className="signup-button">
              <button
                className="signup-button-naver"
                onClick={() => signIn("naver")}
              >
                네이버 회원가입
              </button>
              <button
                className="signup-button-kakao"
                onClick={() => signIn("kakao")}
              >
                카카오톡 회원가입
              </button>
              <button
                className="signup-button-google"
                onClick={() => signIn("google")}
              >
                구글 회원가입
              </button>
            </div>
          </div>
        </section>
        <section className="section-right"></section>
      </div>
      <style jsx>{`
        .signup-page {
          width: 100%;
          /* height: -webkit-calc(100vh - 80px); */
          height: 100%;
          display: flex;
          flex-direction: row;
        }

        .section-left {
          float: left;
          width: 50%;
          display: grid;
          justify-content: center;
          align-content: center;
          background-color: #f2f2f2;
        }

        .logo {
          text-align: center;
          height: 100px;
        }

        .logo img {
          width: auto;
          max-height: 100%;
        }

        .signup-box {
          margin: 20px;
          padding: 20px;
          width: 350px;
          height: 430px;
          border-radius: 20px;
          background-color: #ffffff;
          -webkit-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          -moz-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.2);
          display: flex;
          flex-direction: column;
        }

        .signup-text {
          text-align: center;
          font-size: 2rem;
        }

        .signup-button button {
          width: 90%;
          margin: 15px;
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
        }

        .signup-button-naver {
          color: white;
          background-color: #00c73c;
          cursor: pointer;
        }

        .signup-button-kakao {
          background-color: #fee934;
          cursor: pointer;
        }

        .signup-button-google {
          background-color: #ffffff;
          -webkit-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          -moz-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.25);
          cursor: pointer;
        }

        .section-right {
          //배너 이미지
          float: left;
          width: 50%;
          background-color: #468f5b;
        }

        @media (max-width: 900px) {
          .section-left {
            float: left;
            width: 100%;
            display: grid;
            justify-content: center;
            align-content: center;
          }

          .section-right {
            //배너 이미지
            float: left;
            width: 0%;
            background-color: #468f5b;
          }
        }
      `}</style>
    </>
  );
};

export default OAuth;
