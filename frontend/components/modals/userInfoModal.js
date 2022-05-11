import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOtherInfo } from "../../api/members";
import { FailResponse } from "../../api/failResponse";

const UserInfoModal = (props) => {
  const myInfo = useSelector((state) => state.myInfoReducer);

  // 다른 회원 정보 조회를 위한 nickname
  const userNickname = useSelector(
    (state) => state.saveNicknameReducer.userNickname
  );

  // 모달에 필요한 데이터들
  const [imageSrc, setImageSrc] = useState("");
  const [nickname, setNickname] = useState("심쿵이");
  const [mannerPoint, setMannerPoint] = useState("100");
  const [interest, setInterest] = useState(["놀기", "물어뜯기"]);
  const [gender, setGender] = useState("female");
  const [activeAreas, setActiveAreas] = useState(["대구시 달서구 진천동"]);

  useEffect(() => {
    // 다른 회원 정보 조회
    if (props.info === "other") {
      if (props.open) {
        // getOtherInfo(userNickname)
        //   .then((res) => {
        //     if (res.status.code === 5000) {
        //       setNickname(res.content.userNickname);
        //       setMannerPoint(res.content.mannerPoint);
        //       setInterest(res.content.interests);
        //       setImageSrc(res.content.userProfileImagePath);
        //       setGender(res.content.gender);
        //       setActiveAreas(res.content.activeAreas);
        //     }
        //   })
        //   .catch((error) => {
        //     FailResponse(error.response.data.status.code);
        //     props.close();
        //   });
        // return;
      }
    }
    // 내 정보 조회 및 익명의 유저 정보 조회
    else {
      if (props.open && myInfo.userNickname === "익명") {
        alert("회원 추가 정보가 없어 내 정보를 요청할 수 없습니다.");
        props.close();
        return;
      }

      // 내정보 조회?
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
          <button className="exit-button" onClick={props.close}>
            &times;
          </button>
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

        .room-modal-body {
          width: 70%;
          height: 85%;
          border-radius: 22px;
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 30px;
          /* overflow: auto; */
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
