import { useSession, signIn } from "next-auth/react";

const OAuth = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <div className="signup-page">
        <section className="section-left">
          <div className="logo">
            <h1>Together Sports</h1>
          </div>
          <div className="signup-box">
            <h1 className="signup-text">회원 가입</h1>
            <div className="signup-button">
              <button className="signup-button-facebook">
                페이스북 회원가입
              </button>
              <button className="signup-button-kakao">카카오톡 회원가입</button>
              <button onClick={signIn} className="signup-button-google">
                구글 회원가입
              </button>
            </div>
          </div>
        </section>
        <section className="section-right"></section>
      </div>
      <style jsx>{`
        .signup-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: row;
        }

        .section-left {
          float: left;
          width: 50%;
          display: grid;
          justify-content: center;
          align-content: center;
        }

        .logo {
          //로고 이미지
          text-align: center;
        }

        .signup-box {
          margin: 20px;
          padding: 20px;
          width: 350px;
          height: 500px;
          border-radius: 20px;
          -webkit-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          -moz-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.2);

          display: flex;
          flex-direction: column;
        }

        .signup-text {
          text-align: center;
        }

        .signup-button button {
          width: 90%;
          margin: 15px;
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
        }

        .signup-button-facebook {
          //로고 이미지
          color: white;
          background-color: #4469b0;
        }

        .signup-button-kakao {
          //로고 이미지
          background-color: #fee934;
        }

        .signup-button-google {
          //로고 이미지
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
