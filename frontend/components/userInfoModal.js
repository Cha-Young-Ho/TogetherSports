import { useDispatch } from "react-redux";
import { getMyInfo } from "../api/members";
import { FailResponse } from "../api/failResponse";
import { useState } from "react";

const UserInfoModal = ({ open, close }) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState();
  const [nickname, setNickname] = useState();
  const [mannerPoint, setMannerPoint] = useState();
  const [interest, setInterest] = useState([]);

  // 내 회원 정보 요청
  getMyInfo().then((res) => {
    if (res.code === 5000) {
      // 현재 정보 값 내부에 저장
      setImageSrc(res.imageSource);
      setNickname(res.userNickname);
      setMannerPoint(res.mannerPoint);
      setInterest(res.interest);

      // redux에 저장
      dispatch({
        type: "SAVEMYINFO",
        payload: {
          userEmail: res.userEmail,
          userName: res.userName,
          userNickname: res.userNickname,
          userBirthYear: res.userBirthYear,
          userBirthMonday: res.userBirthMonday,
          userBirthDay: res.userBirthDay,
          gender: res.gender,
          userProfileImage: {
            userProfileRealName: res.userProfileRealName,
            userProfileExtension: res.userProfileExtension,
            imageSource: res.imageSource,
          },
          activeAreas: res.activeAreas.map((el) => el),
          interests: res.interests.map((el) => el),
          mannerPoint: res.mannerPoint,
        },
      });
    } else {
      FailResponse(res.code);
    }
  });

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {`마이프로필`}
              <button className="exit-button" onClick={close}>
                &times;
              </button>
            </header>
            <div className="profile-body">
              <img
                src="data:image/png;base64,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"
                className="pf-image"
              ></img>
              <div className="pf-nickName">{nickname}</div>
              <div className="pf-mannerPoint">{mannerPoint}</div>
              <div className="pf-interest">
                {interest.map((exercise, index) => {
                  return (
                    <div key={index} className="pf-exercise">
                      {exercise}
                    </div>
                  );
                })}
              </div>
              <button className="next-button">회원 정보 수정하기</button>
            </div>
          </section>
        ) : null}
      </div>
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          background-color: rgba(0, 0, 0, 0.6);
        }

        button {
          outline: none;
          cursor: pointer;
          border: 0;
        }

        section {
          width: 400px;
          height: 540px;
          width: 90%;
          max-width: 450px;
          margin: 0 auto;
          border-radius: 22px;
          background-color: #fff;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-show 0.3s;
          overflow: hidden;
        }

        header {
          width: 100%;
          height: 45px;
          position: relative;
          padding: 16px 16px 16px 16px;
          background-color: #f1f1f1;
          font-weight: bold;
        }

        .exit-button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          color: #999;
          background-color: transparent;
        }

        .profile-body {
          width: 100%;
          height: 495px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-top: 1px solid #dee2e6;
        }

        .pf-image {
          width: 280px;
          height: 300px;
          border: 1px solid black;
          margin-bottom: 20px;
          border-radius: 22px;
        }

        .pf-nickName {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .pf-mannerPoint {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .pf-interest {
          margin-bottom: 10px;
        }

        .next-button {
          width: 300px;
          height: 40px;
          border-radius: 20px;
          background-color: #00555f;
          color: white;
          font-weight: 200px;
          font-size: 1.5rem;
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }

        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default UserInfoModal;
