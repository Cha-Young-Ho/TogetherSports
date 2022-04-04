const Login = () => {
  // 네이버 로그인
  const naverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  // 카카오 로그인
  const kakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  // 구글 로그인
  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <>
      <div className="container">
        <div>
          <div>
            <div className="login-box">
              <div className="logo"></div>
              <div className="buttons">
                <button className="button-naver" onClick={naverLogin}></button>
                <button className="button-kakao" onClick={kakaoLogin}></button>
                <button
                  className="button-google"
                  onClick={googleLogin}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container > div {
          width: 100%;
          max-width: 1920px;
          height: 1080px;
          background-color: black;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url("/signup-bg.png");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .container > div > div {
          width: 90%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-box {
          position: relative;
          margin-right: 700px;
          width: 450px;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 2;
        }

        .logo {
          width: 130px;
          height: 150px;
          margin-bottom: 30px;
          object-fit: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url("/signup-logo.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .buttons button {
          width: 400px;
          height: 60px;
          border: none;
          margin: 20px 0;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .button-naver {
          cursor: pointer;
          background-image: url("/naver-login.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .button-kakao {
          cursor: pointer;
          background-image: url("/kakao-login.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .button-google {
          -webkit-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          -moz-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.25);
          cursor: pointer;
          background-image: url("/google-login.png");
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
};

export default Login;
