import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="bg-container">
          <div className="login-box">
            <div className="login-logo"></div>
            <div className="login-button">
              <button
                className="login-button-naver"
                onClick={() =>
                  signIn("naver", {
                    callbackUrl: "/usercheck",
                  })
                }
              ></button>
              <button
                className="login-button-kakao"
                onClick={() =>
                  signIn("kakao", {
                    callbackUrl: "/usercheck",
                  })
                }
              ></button>
              <button
                className="login-button-google"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/usercheck",
                  })
                }
              ></button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          width: 100%;
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

        .bg-container {
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

        .login-logo {
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

        .login-button button {
          width: 400px;
          height: 60px;
          border: none;
          margin: 20px 0;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .login-button-naver {
          cursor: pointer;
          background-image: url("/naver-login.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .login-button-kakao {
          cursor: pointer;
          background-image: url("/kakao-login.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .login-button-google {
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
