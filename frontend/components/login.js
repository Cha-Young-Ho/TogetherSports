const Login = () => {
  return (
    <>
      <div className="login-page">
        <section className="section-left">
          <div className="logo">
            <h1>Together Sports</h1>
          </div>
          <div className="login-box">
            <h1 className="login-text">로그인</h1>
            <div className="login-button">
              <button className="login-button-facebook">페이스북 로그인</button>
              <button className="login-button-kakao">카카오톡 로그인</button>
              <button className="login-button-google">구글 로그인</button>
            </div>
          </div>
        </section>
        <section className="section-right"></section>
      </div>
      <style jsx>{`
        .login-page {
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

        .login-box {
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

        .login-text {
          text-align: center;
        }

        .login-button button {
          width: 90%;
          margin: 15px;
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
        }

        .login-button-facebook {
          //로고 이미지
          color: white;
          background-color: #4469b0;
        }

        .login-button-kakao {
          //로고 이미지
          background-color: #fee934;
        }

        .login-button-google {
          //로고 이미지
          background-color: #ffffff;
          -webkit-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          -moz-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.25);
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

export default Login;
