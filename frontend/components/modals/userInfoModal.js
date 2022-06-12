import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOtherInfo } from "../../api/members";
import { FailResponse } from "../../api/failResponse";
import { patchDelegateHost, deleteKickOutUser } from "../../api/rooms";
import { patchMannerPoint } from "../../api/members";

const UserInfoModal = (props) => {
  const dispatch = useDispatch();

  // reducer에 저장된 내 정보 불러오기
  const myInfo = useSelector((state) => state.myInfoReducer);
  const host = useSelector((state) => state.roomRealTimeInfoReducer.host);

  // 참여자목록에서 조회 선택된 회원의 id와 닉네임
  const clickedUserId = useSelector((state) => state.saveClickedUserReducer.id);
  const clickedUserNickname = useSelector(
    (state) => state.saveClickedUserReducer.userNickname
  );

  // 다른 회원정보 조회에서 받아온 유저의 id
  // 필요없을 수도
  const [userId, setUserId] = useState(0);

  // 조회하고자 하는 회원의 정보들
  const [imageSrc, setImageSrc] = useState("/base_profileImage.jpg");
  const [nickname, setNickname] = useState("");
  const [mannerPoint, setMannerPoint] = useState(0);
  const [interest, setInterest] = useState([]);
  const [gender, setGender] = useState("");
  const [activeAreas, setActiveAreas] = useState([]);
  const [mannerType, setMannerType] = useState("");

  // 방장 위임하기
  const delegateHostFunc = () => {
    patchDelegateHost(props.roomId, userId)
      .then((res) => {
        if (res.status.code === 1208) {
          dispatch({
            type: "SAVEROOMHOST",
            payload: {
              beforeHostNickname: res.content.beforeHostNickname,
              beforeHostId: res.content.beforeHostId,
              afterHostNickname: res.content.afterHostNickname,
              afterHostId: res.content.afterHostId,
            },
          });

          console.log(res.status.message);
          alert("방장이 변경되었습니다 !"); // 임시 텍스트

          props.close;
          return;
        }
        FailResponse(error.response.data.status.code, delegateHostFunc);
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, delegateHostFunc);
        return;
      });
  };

  // 유저 강퇴하기
  const kickOutUserFunc = () => {
    deleteKickOutUser(props.roomId, userId)
      .then((res) => {
        if (res.status.code === 1204) {
          console.log(res.status.message);
          alert(`${res.content.userNickname} 님을 강퇴하였습니다.`);

          props.close;
          return;
        }
        FailResponse(error.response.data.status.code, kickOutUserFunc);
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, kickOutUserFunc);
        return;
      });
  };

  // 다른사람 정보 얻기
  const getOtherInfoFunc = (userId) => {
    getOtherInfo(userId)
      .then((res) => {
        if (res.status.code === 5000) {
          setUserId((userId = res.content.id));
          setImageSrc((imageSrc = res.content.userProfileImagePath));
          setNickname((nickname = res.content.userNickname));
          setMannerPoint((mannerPoint = res.content.mannerPoint));
          setInterest((interest = res.content.interests));
          setGender((gender = res.content.gender));
          setActiveAreas((activeAreas = res.content.activeAreas));
          setMannerType((mannerType = res.content.mannerType));
        }
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, getOtherInfoFunc);
        props.close();
      });
    // return;
  };

  // 매너지수 올리기
  const upMannerPoint = (e) => {
    const downButton = document.getElementsByClassName("button-down");

    patchMannerPoint(myInfo.userNickname, clickedUserId, "UP")
      .then((res) => {
        // 이미 올려져있을때 다시 누르면 올리기 취소
        if (e.target.innerText === "▲") {
          setMannerPoint((mannerPoint = mannerPoint - 1));
          e.target.innerText = "△";
          downButton.innerText = "▽";
          return;
        } else {
          // 올리기
          if (res.status.code === 1109) {
            setMannerPoint((mannerPoint = mannerPoint + 1));
            e.target.innerText = "▲";
            downButton.innerText = "▽";
            console.log(res.status.message);
            return;
          }
          // 내리기 취소
          if (res.status.code === 1108 || downButton.innerText === "▼") {
            setMannerPoint((mannerPoint = mannerPoint + 1));
            e.target.innerText = "△";
            downButton.innerText = "▽";
            console.log(res.status.message);
            return;
          }
        }

        FailResponse(res.status.code, upMannerPoint);
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, upMannerPoint);
        return;
      });
  };

  // 매너지수 내리기
  const downMannerPoint = (e) => {
    const upButton = document.getElementsByClassName("button-up");

    patchMannerPoint(myInfo.userNickname, clickedUserId, "DOWN")
      .then((res) => {
        // 이미 내려져있을때 다시 누르면 내림 취소
        if (e.target.innerText === "▼") {
          setMannerPoint((mannerPoint = mannerPoint + 1));
          upButton.innerText = "△";
          e.target.innerText = "▽";
          return;
        } else {
          // 내리기
          if (res.status.code === 1110) {
            setMannerPoint((mannerPoint = mannerPoint - 1));
            upButton.innerText = "△";
            e.target.innerText = "▼";
            console.log(res.status.message);
            return;
          }
          // 올리기 취소
          if (res.status.code === 1107 || upButton.innerText === "▲") {
            setMannerPoint((mannerPoint = mannerPoint - 1));
            upButton.innerText = "△";
            e.target.innerText = "▽";
            console.log(res.status.message);
            return;
          }
        }

        FailResponse(res.status.code, downMannerPoint);
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, downMannerPoint);
        return;
      });
  };

  useEffect(() => {
    // 다른 회원 정보 조회
    if (myInfo.userNickname !== clickedUserNickname) {
      if (props.open) {
        getOtherInfoFunc(clickedUserId);
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
                {myInfo.userNickname === clickedUserNickname ? (
                  <Link href="/usermodification">
                    <button className="modify-button" onClick={props.close}>
                      회원 정보 수정하기
                    </button>
                  </Link>
                ) : myInfo.userNickname === host ? (
                  <>
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
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="right-section">
              {gender === "male" ? (
                <div className="pf-nickName">
                  <div>
                    {clickedUserNickname}
                    <span style={{ color: "#00a6ed" }}>♂️</span>
                  </div>
                  <div>님의 프로필</div>
                </div>
              ) : (
                <div className="pf-nickName">
                  <div>
                    {clickedUserNickname}
                    <span style={{ color: "#f70a8d" }}>♀️</span>
                  </div>
                  <div>님의 프로필</div>
                </div>
              )}

              <div className="pf-mannerPoint">
                <img src="/mannerPoint.png"></img>
                {mannerPoint}
                {myInfo.userNickname === clickedUserNickname ? (
                  <></>
                ) : mannerType === "UP" ? (
                  <div>
                    <button className="button-up" onClick={upMannerPoint}>
                      ▲
                    </button>
                    <button className="button-down" onClick={downMannerPoint}>
                      ▽
                    </button>
                  </div>
                ) : mannerType === "DOWN" ? (
                  <div>
                    <button className="button-up" onClick={upMannerPoint}>
                      △
                    </button>
                    <button className="button-down" onClick={downMannerPoint}>
                      ▼
                    </button>
                  </div>
                ) : mannerType === "DEFAULT" ? (
                  <div>
                    <button className="button-up" onClick={upMannerPoint}>
                      △
                    </button>
                    <button className="button-down" onClick={downMannerPoint}>
                      ▽
                    </button>
                  </div>
                ) : (
                  // 테스트를 위한 임시 태그
                  // <div>
                  //   <button onClick={upMannerPoint}>△</button>
                  //   <button onClick={downMannerPoint}>▽</button>
                  // </div>
                  <></>
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

export default UserInfoModal;
