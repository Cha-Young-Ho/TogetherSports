import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOtherInfo } from "../../api/members";
import { FailResponse } from "../../api/failResponse";

const UserInfoModal = (props) => {
  const myInfo = useSelector((state) => state.myInfoReducer);

  // participantList 에서 조회 선택된 회원의 닉네임 (내정보조회, 다른회원정보조회 모두 가능)
  const userNickname = useSelector(
    (state) => state.saveNicknameReducer.userNickname
  );

  // 모달에 필요한 데이터들
  const [imageSrc, setImageSrc] = useState("");
  const [nickname, setNickname] = useState("");
  const [mannerPoint, setMannerPoint] = useState("");
  const [interest, setInterest] = useState([]);
  const [gender, setGender] = useState("");
  const [activeAreas, setActiveAreas] = useState([]);

  useEffect(() => {
    // 다른 회원 정보 조회
    if (myInfo.userNickname !== userNickname) {
      if (props.open) {
        getOtherInfo(userNickname)
          .then((res) => {
            if (res.status.code === 5000) {
              setNickname(res.content.userNickname);
              setMannerPoint(res.content.mannerPoint);
              setInterest(res.content.interests);
              setImageSrc(res.content.userProfileImagePath);
              setGender(res.content.gender);
              setActiveAreas(res.content.activeAreas);
            }
          })
          .catch((error) => {
            FailResponse(error.response.data.status.code);
            props.close();
          });
        return;
      }
    }
    // 내 정보 조회 및 익명의 유저 정보 조회
    else {
      if (props.open && myInfo.userNickname === "익명") {
        alert("회원 추가 정보가 없어 내 정보를 요청할 수 없습니다.");
        props.close();
        return;
      }

      // 내정보 조회
      setImageSrc(myInfo.userProfileImagePath);
      setNickname(myInfo.userNickname);
      setMannerPoint(myInfo.mannerPoint);
      setInterest(myInfo.interests);
      setGender(myInfo.gender);
      setActiveAreas(myInfo.activeAreas);
    }
  }, [props.open]);

  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        <div className="userinfo-modal-body">
          <div className="header">
            <button onClick={props.close}>&times;</button>
          </div>

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
          </div>

          <div className="buttons">
            {myInfo.userNickname !== userNickname ? (
              <div>
                <button className="delegate-button" onClick={props.close}>
                  방장 위임하기
                </button>
                <button className="expulsion-button" onClick={props.close}>
                  이 방에서 내보내기
                </button>
              </div>
            ) : (
              <Link href="/usermodification">
                <button className="modify-button" onClick={props.close}>
                  회원 정보 수정하기
                </button>
              </Link>
            )}
          </div>
        </div>
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

        .modal.openModal {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modal-bg-show 0.3s; // 스르륵 효과
        }

        .userinfo-modal-body {
          width: 30%;
          height: 80%;
          border-radius: 22px;
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 15px;
          /* overflow: auto; */
        }

        .header {
          width: 100%;
          position: relative;
        }

        .header button {
          position: absolute;
          top: 1px;
          right: 1px;
          color: #999;
          font-size: 2rem;
          font-weight: bold;
          background-color: white;
          border: none;
          cursor: pointer;
        }

        .profile-body {
          width: 100%;
          /* height: 495px; */ // 수정 필요
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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

        .buttons {
          display: flex;
          flex-direction: column;
        }

        .buttons > div {
          display: flex;
          flex-direction: column;
        }

        .delegate-button,
        .modify-button {
          width: 300px;
          height: 40px;
          border: none;
          border-radius: 20px;
          background-color: #00555f;
          color: white;
          font-weight: 200px;
          font-size: 1.5rem;
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
