import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOtherInfo } from "../../api/members";
import { FailResponse } from "../../api/failResponse";

const UserInfoModal = (props) => {
  const myInfo = useSelector((state) => state.myInfoReducer);

  const userNickname = useSelector(
    (state) => state.saveNicknameReducer.userNickname
  );

  const [imageSrc, setImageSrc] = useState("");
  const [nickname, setNickname] = useState(props.userNickname);
  const [mannerPoint, setMannerPoint] = useState("");
  const [interest, setInterest] = useState([]);

  useEffect(() => {
    if (props.info === "other") {
      if (props.open) {
        getOtherInfo(userNickname)
          .then((res) => {
            if (res.status.code === 5000) {
              setNickname(res.content.userNickname);
              setMannerPoint(res.content.mannerPoint);
              setInterest(res.content.interests);
              setImageSrc(res.content.userProfileImagePath);
            }
          })
          .catch((error) => {
            FailResponse(error.response.data.status.code);
            props.close();
          });
        return;
      }
    } else {
      if (props.open && myInfo.userNickname === "익명") {
        alert("회원 추가 정보가 없어 내 정보를 요청할 수 없습니다.");
        props.close();
        return;
      }

      setImageSrc(myInfo.userProfileImagePath);
      setNickname(myInfo.userNickname);
      setMannerPoint(myInfo.mannerPoint);
      setInterest(myInfo.interests);
    }
  }, [props.open]);

  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        {props.open ? (
          <section>
            <header>
              {props.info === "other" ? `${nickname}님의 프로필` : `마이프로필`}
              <button className="exit-button" onClick={props.close}>
                &times;
              </button>
            </header>
            <div className="profile-body">
              <img src={imageSrc} className="pf-image"></img>
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
              {props.info === "other" ? (
                <button className="next-button" onClick={props.close}>
                  나가기
                </button>
              ) : (
                <Link href="/usermodification">
                  <button className="next-button" onClick={props.close}>
                    회원 정보 수정하기
                  </button>
                </Link>
              )}
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
          //width: 400px;
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
          text-align: center;
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
          display: flex;
        }

        .pf-exercise {
          margin: 5px;
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
