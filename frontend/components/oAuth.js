import Link from "next/link";
import { signIn } from "next-auth/react";

const OAuth = () => {
  return (
    <>
      <div className="signup-page">
        <section className="section-left">
          <div className="signup-box">
            <p className="signup-text">🔥오늘도 한 판 ㄱ?🔥</p>
            <div className="signup-button">
              <button
                className="signup-button-naver"
                onClick={() =>
                  signIn("naver", {
                    callbackUrl: "/usercheck",
                  })
                }
              >
                네이버 회원가입
              </button>
              <button
                className="signup-button-kakao"
                onClick={() =>
                  signIn("kakao", {
                    callbackUrl: "/usercheck",
                  })
                }
              >
                카카오톡 회원가입
              </button>
              <button
                className="signup-button-google"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/usercheck",
                  })
                }
              >
                구글 회원가입
              </button>
            </div>
          </div>
        </section>
        <section className="section-right"></section>
      </div>

      <style jsx>{`
        * {
          font-family: "NanumBarunGothic";
        }

        .signup-page {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: row;
          background-image: url("/signup-bg.png");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .section-left {
          float: left;
          width: 50%;
          display: grid;
          justify-content: center;
          align-content: center;
        }

        .signup-box {
          margin: 20px;
          padding: 20px;
          width: 460px;
          height: 625px;
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
          font-size: 3rem;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 30px;
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
          float: left;
          width: 50%;
        }

        /* @media (max-width: 900px) {
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
        } */
      `}</style>
    </>
  );
};

export default OAuth;
