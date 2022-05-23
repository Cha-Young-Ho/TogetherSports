import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOtherInfo } from "../../api/members";
import { FailResponse } from "../../api/failResponse";
import { patchDelegateHost, kickOutUser } from "../../api/rooms";

const UserInfoModal = (props) => {
  // reducer에 저장된 내 정보 불러오기
  const myInfo = useSelector((state) => state.myInfoReducer);

  // 참여자목록에서 조회 선택된 회원의 닉네임 가져오기
  const clickedUserNickname = useSelector(
    (state) => state.saveNicknameReducer.userNickname
  );

  // 모달에 필요한 데이터들
  const [imageSrc, setImageSrc] = useState("/base_profileImage.jpg");
  const [nickname, setNickname] = useState("");
  const [mannerPoint, setMannerPoint] = useState(0);
  const [interest, setInterest] = useState([]);
  const [gender, setGender] = useState("");
  const [activeAreas, setActiveAreas] = useState([]);

  // 방장 위임하기
  const delegateHostFunc = () => {
    patchDelegateHost(props.roomId, 여기서클릭된유저의id를받아야함)
      .then((res) => {
        if (res.status.code === 1208) {
          // 여기서 성공 response로 받는 값으로
          // redux 방장 값 바꾸기

          console.log(res.status.message);
          alert("방장이 변경되었습니다 !"); // 나중에 지울 것

          close();
        }
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code);
        return;
      });
  };

  // FLOW : 위임 버튼 누르면 patch 요청되고 거기의 매개변수로 roomId, 방장으로 위임선택된 사람의 id(email?)이 전달되고, 성공적으로 위임됐으면 response로 이전 방장닉넴/아디, 현재 방장닉넴/아디를 받게된다.
  // 또한 response로 받은 이전방장과 현재방장을 redux에 담아서 채팅에 뿌려준다.

  // 유저 강퇴하기
  const kickOutUserFunc = () => {};

  useEffect(() => {
    // 네비게이션에서 프로필 조회를 하는 경우 (무조건 내 정보 조회만)
    if (props.path === "navBar") {
      // 회원 추가정보 입력이 완료되지 않은 경우
      if (props.open && myInfo.userNickname === "익명") {
        alert("회원 추가 정보가 없어 내 정보를 요청할 수 없습니다.");
        props.close();
        return;
      }
      // 내 정보 조회
      else {
        setImageSrc((imageSrc = myInfo.userProfileImagePath));
        setNickname((nickname = myInfo.userNickname));
        setMannerPoint((mannerPoint = myInfo.mannerPoint));
        setInterest((interest = myInfo.interests));
        setGender((gender = myInfo.gender));
        setActiveAreas((activeAreas = myInfo.activeAreas));
      }
    }

    // 운동 대기방의 참여자목록에서 프로필 조회를 하는 경우 (내 정보 조회, 다른 회원 정보 조회 모두 가능)
    if (props.path === "partyList") {
      // 다른 회원 정보 조회
      if (myInfo.userNickname !== clickedUserNickname) {
        if (props.open) {
          getOtherInfo(clickedUserNickname)
            .then((res) => {
              if (res.status.code === 5000) {
                setImageSrc((imageSrc = res.content.userProfileImagePath));
                setNickname((nickname = res.content.userNickname));
                setMannerPoint((mannerPoint = res.content.mannerPoint));
                setInterest((interest = res.content.interests));
                setGender((gender = res.content.gender));
                setActiveAreas((activeAreas = res.content.activeAreas));
              }
            })
            .catch((error) => {
              FailResponse(error.response.data.status.code);
              props.close();
            });
          // return;
        }
      }

      // 내 정보 조회
      if (myInfo.userNickname === clickedUserNickname) {
        setImageSrc((imageSrc = myInfo.userProfileImagePath));
        setNickname((nickname = myInfo.userNickname));
        setMannerPoint((mannerPoint = myInfo.mannerPoint));
        setInterest((interest = myInfo.interests));
        setGender((gender = myInfo.gender));
        setActiveAreas((activeAreas = myInfo.activeAreas));
      }
    }
  }, [props.open]);

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
                {(myInfo.userNickname === clickedUserNickname &&
                  props.path === "partyList") ||
                props.path === "navBar" ? (
                  <Link href="/usermodification">
                    <button className="modify-button" onClick={props.close}>
                      회원 정보 수정하기
                    </button>
                  </Link>
                ) : (
                  <div>
                    <button
                      className="delegate-button"
                      onClick={delegateHostFunc}
                    >
                      방장 위임하기
                    </button>
                    <button
                      className="expulsion-button"
                      onClick={kickOutUserFunc}
                    >
                      이 방에서 내보내기
                    </button>
                  </div>
                )}
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
                {`❤️ ${mannerPoint}`}
                {(props.path === "partyList" &&
                  myInfo.userNickname === clickedUserNickname) ||
                props.path === "navBar" ? (
                  <></>
                ) : (
                  <div>
                    <button>➕</button>
                    <button>➖</button>
                  </div>
                )}
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

        .pf-mannerPoint > div {
          margin-left: 20px;
          display: flex;
          flex-direction: row;
        }

        .pf-mannerPoint button {
          font-size: 2rem;
          font-weight: bold;
          border: none;
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

export default UserInfoModal;
