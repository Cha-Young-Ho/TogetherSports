import { signIn } from "next-auth/react";

const OAuth = () => {
  return (
    <>
      <div className="signup-container">
        <div className="bg-container">
          <div className="signup-box">
            <div className="signup-logo"></div>
            <div className="signup-button">
              <button
                className="signup-button-naver"
                onClick={() =>
                  signIn("naver", {
                    callbackUrl: "/usercheck",
                  })
                }
              ></button>
              <button
                className="signup-button-kakao"
                onClick={() =>
                  signIn("kakao", {
                    callbackUrl: "/usercheck",
                  })
                }
              ></button>
              <button
                className="signup-button-google"
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
        .signup-container {
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

        .signup-box {
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

        .signup-logo {
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

        .signup-button button {
          width: 400px;
          height: 60px;
          border: none;
          margin: 20px 0;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .signup-button-naver {
          cursor: pointer;
          background-image: url("/naver-signup.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .signup-button-kakao {
          cursor: pointer;
          background-image: url("/kakao-signup.png");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .signup-button-google {
          -webkit-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          -moz-box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.15);
          box-shadow: 0px 0px 20px 0px rgba(117, 110, 117, 0.25);
          cursor: pointer;
          background-image: url("/google-signup.png");
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
};

export default OAuth;
