import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";

const NavBarUserInfoModal = (props) => {
  // reducer에 저장된 내 정보 불러오기
  const myInfo = useSelector((state) => state.myInfoReducer);

  // 조회하고자 하는 회원의 정보들
  const [imageSrc, setImageSrc] = useState("/base_profileImage.jpg");
  const [nickname, setNickname] = useState("");
  const [mannerPoint, setMannerPoint] = useState(0);
  const [interest, setInterest] = useState([]);
  const [gender, setGender] = useState("");
  const [activeAreas, setActiveAreas] = useState([]);

  useEffect(() => {
    // 회원 추가정보 입력이 완료되지 않은 경우
    if (props.open && myInfo.userNickname === "익명") {
      alert("회원 추가 정보가 없어 내 정보를 요청할 수 없습니다.");
      props.close();
      return;
    } else {
      setImageSrc((imageSrc = myInfo.userProfileImagePath));
      setNickname((nickname = myInfo.userNickname));
      setMannerPoint((mannerPoint = myInfo.mannerPoint));
      setInterest((interest = myInfo.interests));
      setGender((gender = myInfo.gender));
      setActiveAreas((activeAreas = myInfo.activeAreas));
    }
  });

  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        <div className="userinfo-modal-body">
          <div className="header">
            <button onClick={props.close}>&times;</button>
          </div>

          <div className="section">
            <div className="left-section">
              <img src={imageSrc} className="pf-image"></img>

              <div className="buttons">
                <Link href="/usermodification">
                  <button className="modify-button" onClick={props.close}>
                    회원 정보 수정하기
                  </button>
                </Link>
              </div>
            </div>

            <div className="right-section">
              {gender === "male" ? (
                <div className="pf-nickName">
                  <div>
                    {nickname}
                    <span style={{ color: "#00a6ed" }}>♂️</span>
                  </div>
                  <div>님의 프로필</div>
                </div>
              ) : (
                <div className="pf-nickName">
                  <div>
                    {nickname}
                    <span style={{ color: "#f70a8d" }}>♀️</span>
                  </div>
                  <div>님의 프로필</div>
                </div>
              )}

              <div className="pf-mannerPoint">
                <img src="/mannerPoint.png"></img>
                {mannerPoint}
              </div>

              <div className="pf-interest">
                <p>관심 종목</p>
                <div className="interests">
                  {interest.map((exercise, index) => {
                    return <div key={index}>{exercise}</div>;
                  })}
                </div>
              </div>

              <div className="pf-activearea">
                <p>활동 지역</p>
                <div className="areas">
                  {activeAreas.map((area, index) => {
                    return <div key={index}>{area.location}</div>;
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
          min-width: 680px;
          width: 45%;
          min-height: 410px;
          border-radius: 22px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 15px;
          /* overflow: auto; */
        }

        .header {
          width: 100%;
          position: relative;
        }

        .header > button {
          position: absolute;
          top: 0px;
          right: 0px;
          color: #999;
          font-size: 3rem;
          background-color: white;
          border: none;
          cursor: pointer;
        }

        .section {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .left-section {
          width: 40%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .buttons > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .delegate-button,
        .expulsion-button,
        .modify-button {
          width: 100%;
          height: 40px;
          border: none;
          border-radius: 20px;
          background-color: #00555f;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .delegate-button {
          margin-bottom: 10px;
        }

        .expulsion-button {
          background-color: #d8d8d8;
        }

        .right-section {
          width: 55%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .pf-nickName {
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
        }

        .pf-nickName > div {
          font-size: 1.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pf-nickName > div:nth-child(1) {
          padding: 5px 15px;
          border-radius: 10px;
          border: solid 1px #e2e2e2;
          background-color: #fff;
          font-weight: bold;
          margin-right: 10px;
        }

        .pf-nickName span {
          margin-left: 5px;
        }

        .pf-mannerPoint {
          font-size: 2rem;
          font-weight: bold;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 20px;
        }

        .pf-mannerPoint > img {
          width: 24px;
          height: 20px;
          margin-right: 10px;
        }

        .pf-mannerPoint > div {
          margin-left: 20px;
          display: flex;
          flex-direction: row;
        }

        .pf-mannerPoint button {
          font-size: 2rem;
          font-weight: bold;
          border: none;
          color: #08555f;
          background-color: white;
          margin-right: 10px;
          cursor: pointer;
        }

        .pf-interest,
        .pf-activearea {
          display: flex;
          flex-direction: column;
        }

        .pf-interest {
          margin-bottom: 20px;
        }

        .pf-interest > p,
        .pf-activearea > p {
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .interests {
          display: flex;
          flex-direction: row;
        }

        .interests div {
          display: flex;
          align-items: center;
          padding: 5px 10px;
          margin-right: 10px;
          border-radius: 6px;
          background-color: #efefef;
          font-size: 1.3rem;
        }

        .areas div {
          display: flex;
          justify-content: center;
          width: 210px;
          margin-bottom: 5px;
          padding: 5px 10px;
          border-radius: 6px;
          background-color: #efefef;
          font-size: 1.3rem;
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

export default NavBarUserInfoModal;
