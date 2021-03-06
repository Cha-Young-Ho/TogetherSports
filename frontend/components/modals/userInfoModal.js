import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOtherInfo, patchMannerPoint } from "../../api/members";
import { FailResponse } from "../../api/failResponse";
import { patchDelegateHost, deleteKickOutUser } from "../../api/rooms";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const UserInfoModal = (props) => {
  const dispatch = useDispatch();

  const myInfo = useSelector((state) => state.myInfoReducer);
  const host = useSelector((state) => state.roomRealTimeInfoReducer.host);

  // 참여자목록에서 조회 선택된 회원의 id와 닉네임
  const clickedUserId = useSelector((state) => state.saveClickedUserReducer.id);
  const clickedUserNickname = useSelector(
    (state) => state.saveClickedUserReducer.userNickname
  );

  // 다른 회원정보 조회에서 받아온 유저의 id
  const [otherUserId, setOtherUserId] = useState(0);

  // 조회하고자 하는 회원의 정보들
  const [imageSrc, setImageSrc] = useState("");
  const [mannerPoint, setMannerPoint] = useState(0);
  const [interest, setInterest] = useState([]);
  const [gender, setGender] = useState("");
  const [activeAreas, setActiveAreas] = useState([]);

  const exerciseArr = {
    soccer: "축구",
    baseball: "야구",
    basketball: "농구",
    "ping-pong": "탁구",
    hiking: "등산",
    running: "런닝",
    billiards: "당구",
    bicycle: "자전거",
    badminton: "배드민턴",
    gym: "헬스",
    golf: "골프",
    etc: "기타",
  };

  // 방장 위임하기
  const delegateHostFunc = () => {
    patchDelegateHost(props.roomId, otherUserId)
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
        FailResponse(res.status.code, delegateHostFunc);
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, delegateHostFunc);
        return;
      });
  };

  // 유저 강퇴하기
  const kickOutUserFunc = () => {
    deleteKickOutUser(props.roomId, otherUserId)
      .then((res) => {
        if (res.status.code === 1204) {
          console.log(res.status.message);
          alert(`${res.content.userNickname} 님을 강퇴하였습니다.`);

          props.close;
          return;
        }
        FailResponse(res.status.code, kickOutUserFunc);
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
          setOtherUserId((otherUserId = res.content.id));
          setImageSrc((imageSrc = res.content.userProfileImagePath));
          setMannerPoint((mannerPoint = res.content.mannerPoint));
          setInterest((interest = res.content.interests));
          setGender((gender = res.content.gender));
          setActiveAreas((activeAreas = res.content.activeAreas));
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status) {
          FailResponse(error.response.data.status.code, getOtherInfoFunc);
          props.close();
        }
      });
  };

  // 매너지수 올리기
  const upMannerPoint = () => {
    patchMannerPoint(otherUserId, "UP")
      .then((res) => {
        // 올리기
        if (res.status.code === 1109) {
          setMannerPoint((mannerPoint = res.content.mannerPoint));
          return;
        }
        // 이미 올린 경우
        if (res.status.code === 1105) {
          alert(res.status.message);
          return;
        }
        FailResponse(res.status.code, upMannerPoint);
      })
      .catch((error) => {
        if (error?.response?.data?.status) {
          FailResponse(error.response.data.status.code, upMannerPoint);
          return;
        }
      });
  };

  // 매너지수 내리기
  const downMannerPoint = () => {
    patchMannerPoint(otherUserId, "DOWN")
      .then((res) => {
        // 내리기
        if (res.status.code === 1110) {
          setMannerPoint((mannerPoint = res.content.mannerPoint));
          return;
        }
        // 이미 내린 경우
        if (res.status.code === 1106) {
          alert(res.status.message);
          return;
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
    else if (myInfo.userNickname === clickedUserNickname) {
      if (props.open) {
        setImageSrc((imageSrc = myInfo.userProfileImagePath));
        setMannerPoint((mannerPoint = myInfo.mannerPoint));
        setInterest((interest = myInfo.interests));
        setGender((gender = myInfo.gender));
        setActiveAreas((activeAreas = myInfo.activeAreas));
      }
    }
  }, [props.open]);

  return (
    <>
      <div
        className={props.open ? "openModal modal" : "modal"}
        onClick={(e) => {
          if (e.target.classList[1] === "openModal") props.close();
        }}
      >
        <div className="userinfo-modal-body">
          <button className="close-popup-button" onClick={props.close}>
            &times;
          </button>

          <div className="section">
            <div className="left-section">
              <img
                src={`${API_ENDPOINT}${imageSrc}`}
                className="pf-image"
              ></img>

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
                ) : (
                  <div>
                    <button onClick={upMannerPoint}>∧</button>
                    <button onClick={downMannerPoint}>∨</button>
                  </div>
                )}
              </div>

              <div className="pf-interest">
                <p>관심 종목</p>
                <div className="interests">
                  {interest.map((exercise, index) => {
                    return <div key={index}>{exerciseArr[exercise]}</div>;
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
          position: relative;
        }

        .close-popup-button {
          position: absolute;
          top: 10px;
          right: 10px;
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
          user-select: none;
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
