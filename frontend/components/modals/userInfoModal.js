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
  const [imageSrc, setImageSrc] = useState("/base_profileImage.jpg");
  const [nickname, setNickname] = useState("피렐라");
  const [mannerPoint, setMannerPoint] = useState("10");
  const [interest, setInterest] = useState([
    "축구",
    "야구",
    "배드민턴",
    "자전거",
    "기타",
  ]);
  const [gender, setGender] = useState("male");
  const [activeAreas, setActiveAreas] = useState([
    "서울시 서초구 서초동",
    "대구시 달서구 진천동",
    "대구시 달서구 송현동",
  ]);

  useEffect(() => {
    // 다른 회원 정보 조회
    if (myInfo.userNickname !== userNickname) {
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
            {gender === "male" ? (
              <div className="header-text">
                {`${nickname} 님의 프로필`}
                <span style={{ color: "#00a6ed" }}>♂️</span>
              </div>
            ) : (
              <div className="header-text">
                {`${nickname} 님의 프로필`}
                <span style={{ color: "#f70a8d" }}>♀️</span>
              </div>
            )}
            <button onClick={props.close}>&times;</button>
          </div>

          <div className="section">
            <div className="left-section">
              <img src={imageSrc} className="pf-image"></img>

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

            <div className="right-section">
              <div className="pf-mannerPoint">
                {`❤️ ${mannerPoint}`}
                <div>
                  <button>➕</button>
                  <button>➖</button>
                </div>
              </div>

              <div className="pf-interest">
                <p>관심 종목</p>
                <div className="interests">
                  {interest.map((exercise, index) => {
                    return (
                      <div key={index} className="pf-exercise">
                        {exercise}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pf-activearea">
                <p>활동 지역</p>
                <div className="areas">
                  {activeAreas.map((area, index) => {
                    return (
                      <div key={index} className="pf-area">
                        {area}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
          width: 1000px;
          height: 600px;
          border-radius: 22px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          overflow: auto;
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
          font-size: 3rem;
          background-color: white;
          border: none;
          cursor: pointer;
        }

        .header-text {
          font-size: 3rem;
          font-weight: bold;
          margin: 10px;
        }

        .header-text > span {
          margin-left: 5px;
        }

        .section {
          width: 100%;
          display: flex;
          flex-direction: row;
        }

        .left-section {
          width: 35%;
          height: 100%;
          margin: 10px 30px 10px 10px;
          display: flex;
          flex-direction: column;
        }

        .pf-image {
          width: 100%;
          height: width;
          border-radius: 22px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          border: solid 1px #e2e2e2;
          background-color: #efefef;
          margin-bottom: 30px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
        }

        .buttons > div {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .delegate-button,
        .expulsion-button,
        .modify-button {
          width: 300px;
          height: 45px;
          border: none;
          border-radius: 20px;
          background-color: #00555f;
          color: white;
          font-weight: 200px;
          font-size: 1.7rem;
          cursor: pointer;
        }

        .delegate-button {
          margin-bottom: 20px;
        }

        .expulsion-button {
          background-color: #d8d8d8;
        }

        .pf-mannerPoint {
          font-size: 5rem;
          font-weight: bold;
          display: flex;
          flex-direction: row;
          margin-bottom: 40px;
        }

        .pf-mannerPoint > div {
          margin-left: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .pf-mannerPoint button {
          font-size: 2.5rem;
          border: none;
          background-color: white;
          margin-right: 10px;
          cursor: pointer;
        }

        .pf-interest,
        .pf-activearea {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
        }

        .pf-interest > p,
        .pf-activearea > p {
          font-size: 2.6rem;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .interests,
        .areas {
          display: flex;
          flex-direction: row;
        }

        .interests div,
        .areas div {
          display: flex;
          align-items: center;
          height: 35px;
          padding: 10px;
          margin-right: 10px;
          border-radius: 6px;
          background-color: #efefef;
          font-size: 1.5rem;
          font-weight: bold;
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
