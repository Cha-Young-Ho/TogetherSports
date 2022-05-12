import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteLogout } from "../api/members";
import { FailResponse } from "../api/failResponse";
import Modal from "./modals/userInfoModal";
import { getMyInfo } from "../api/members";
import { useDispatch, useSelector } from "react-redux";
import FixedRequestAlarm from "./fixedRequestAlarm";

const NavigationBar = () => {
  const dispatch = useDispatch();

  // 로그인 상태 임을 판별하는 변수
  const loginStatus = useSelector(
    (state) => state.loginStatusChangeReducer.loginStatus
  );

  // 로그인 시 저장되는 데이터
  const [myinfo, setMyinfo] = useState(
    useSelector((state) => state.myInfoReducer)
  );

  // 유저 프로필 클릭 시 뜨는 팝업 창 관리 state
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 서버로 로그인 요청
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        if (res.status.code === 5000) {
          console.log("*Nav : Success Login Info Request *");

          setMyinfo({
            userEmail: res.content.userEmail,
            userName: res.content.userName,
            userNickname: res.content.userNickname,
            userBirth: res.content.userBirth,
            gender: res.content.gender,
            userProfileImagePath: res.content.userProfileImagePath,
            activeAreas: res.content.activeAreas.map((el) => el),
            interests: res.content.interests.map((el) => el),
            mannerPoint: res.content.mannerPoint,
            isInformationRequired: res.content.isInformationRequired,
          });

          dispatch({
            type: "SAVEMYINFO",
            payload: {
              userEmail: res.content.userEmail,
              userName: res.content.userName,
              userNickname: res.content.userNickname,
              userBirth: res.content.userBirth,
              gender: res.content.gender,
              userProfileImagePath: res.content.userProfileImagePath,
              activeAreas: res.content.activeAreas.map((el) => el),
              interests: res.content.interests.map((el) => el),
              mannerPoint: res.content.mannerPoint,
              isInformationRequired: res.content.isInformationRequired,
            },
          });
          console.log("Nav : Client got this info = " + myinfo);
        } else {
          FailResponse(res.status.code);
        }

        dispatch({
          type: "CHANGELOGINSTATUS",
          payload: {
            loginStatus: "true",
          },
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: "false",
            },
          });

          FailResponse(error.response.data.status.code);
        }
      });
  }, [loginStatus]);

  // 로그아웃 버튼 클릭
  const ClickLogout = () => {
    deleteLogout()
      .then((res) => {
        console.log(res.status.message);
        if (res.status.code === 5000) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: "false",
            },
          });

          dispatch({
            type: "SAVEMYINFO",
            payload: {
              userEmail: "",
              userName: "",
              userNickname: "익명",
              userBirth: "yyyy-mm-dd",
              gender: "",
              userProfileImagePath: "/base_profileImage.jpg",
              activeAreas: [],
              interests: [],
              mannerPoint: "",
              isInformationRequired: "",
            },
          });
          alert("로그아웃 되었습니다.");
          return;
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });
  };

  return (
    <>
      <div className="header">
        <div className="container_bg">
          <div className="groups">
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/logo-navbar.png" alt="Together Sports"></img>
                </a>
              </Link>
            </div>
            <div className="category">
              <Link href="/room/roomlist">
                <div className="tag">일정목록</div>
              </Link>
              <Link href="/myroom">
                <div className="tag">내일정</div>
              </Link>
              <Link href="/room/createroom/roomsetting">
                <div className="tag">방생성</div>
              </Link>
            </div>
          </div>
          <div>
            <div className="sign">
              {loginStatus === "false" ? (
                <>
                  <Link href="/login">
                    <div className="tag">로그인</div>
                  </Link>
                </>
              ) : (
                <>
                  <button className="user-box" onClick={openModal}>
                    <img
                      className="ProfileImage"
                      src={myinfo.userProfileImagePath}
                    ></img>
                    <div className="logOn">
                      {`${myinfo.userNickname}`} 님 반갑습니다!
                    </div>
                  </button>

                  <Modal open={modalOpen} close={closeModal}></Modal>

                  <button
                    className="btn_signout"
                    onClick={() => {
                      ClickLogout();
                      signOut({
                        callbackUrl: "/",
                      });
                    }}
                  >
                    로그아웃
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {loginStatus === "true" && myinfo.isInformationRequired ? (
        <FixedRequestAlarm />
      ) : (
        ""
      )}

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 80px;
          min-height: 8vh;
          border-bottom: 1px solid #e4e8eb;
          z-index: 90;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: #ffffff;
        }

        .container_bg {
          display: flex;
          margin-top: 20px;
        }

        .groups {
          width: 1024px;
          display: flex;
          flex-direction: space-around;
        }

        .logo {
          width: 138px;
          display: flex;
          font-size: 2rem;
        }

        .category {
          width: 420px;
          height: 62px;
          display: flex;
          justify-content: space-around;
          font-size: 1.5rem;
        }

        .sign {
          height: 62px;
          display: flex;
          position: relative;
          justify-content: center;
          font-size: 1.5rem;
        }

        .tag {
          padding: 2rem;
          cursor: pointer;
          transition: 800ms ease all;
        }

        .ProfileImage {
          width: 40px;
          height: 40px;
          border-radius: 50px;
          background-color: black;
          object-fit: cover;
        }

        .logOn {
          margin-left: 20px;
        }

        .user-box {
          display: flex;
          justify-content: space-around;
          align-items: center;
          cursor: pointer;
          border: 0;
          background-color: #fff;
        }

        .btn_signout {
          width: 100px;
          position: relative;
          background: #fff;
          color: black;
          border: none;
          padding: 2rem;
          position: relative;
          cursor: pointer;
          transition: 800ms ease all;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
        }

        .btn_signout:hover,
        .tag:hover {
          color: #23a188;
          box-shadow: 0 2px 0 #23a188;
        }
        .btn_signout:active,
        .tag:active {
          top: 3px;
          box-shadow: none;
        }

        @media (max-width: 1300px) {
          * {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default NavigationBar;
