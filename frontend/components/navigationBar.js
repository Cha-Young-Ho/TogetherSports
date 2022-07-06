import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteLogOut } from "../api/members";
import { FailResponse } from "../api/failResponse";
import UserInfoModal from "./modals/navBarUserInfoModal";
import { getMyInfo } from "../api/members";
import { useDispatch, useSelector } from "react-redux";
import SignUpReqModal from "./modals/signUpReqModal";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 로그인 상태 임을 판별하는 변수
  const loginStatus = useSelector(
    (state) => state.loginStatusChangeReducer.loginStatus
  );

  // 로그인 시 저장되는 데이터
  const myInfo = useSelector((state) => state.myInfoReducer);

  // 유저 프로필 클릭 시 뜨는 팝업 창 관리 state
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);

  const openUserInfoModalFunc = () => {
    setUserInfoModalOpen(true);
  };
  const closeUserInfoModalFun = () => {
    setUserInfoModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // 로그아웃 버튼 클릭
  const ClickLogout = () => {
    deleteLogOut()
      .then((res) => {
        if (res.status.code === 5000) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: false,
            },
          });

          dispatch({
            type: "SAVEMYINFO",
            payload: {
              id: "",
              userEmail: "",
              userName: "",
              userNickname: "익명",
              userBirth: "yyyy-mm-dd",
              gender: "",
              userProfileImagePath:
                "https://together-sports.com/images/default_user_profile.jpeg",
              activeAreas: [],
              interests: [],
              mannerPoint: "",
              isInformationRequired: true,
            },
          });

          alert("로그아웃 되었습니다.");
          router.replace("/");
          return;
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code, ClickLogout);
        }
      });
  };

  const func_getMyInfo = () => {
    getMyInfo()
      .then((res) => {
        if (res.status.code === 5000) {
          dispatch({
            type: "SAVEMYINFO",
            payload: {
              id: res.content.id,
              userEmail: res.content.userEmail,
              userName: res.content.userName,
              userNickname: res.content.userNickname,
              userBirth: res.content.userBirth,
              mannerPoint: res.content.mannerPoint,
              activeAreas: res.content.activeAreas.map((el) => el),
              userProfileImagePath: res.content.userProfileImagePath,
              interests: res.content.interests.map((el) => el),
              gender: res.content.gender,
              isInformationRequired: res.content.isInformationRequired,
            },
          });

          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: true,
            },
          });
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: false,
            },
          });
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status) {
          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: false,
            },
          });

          FailResponse(error.response.data.status.code, func_getMyInfo);
        }
      });
  };

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      func_getMyInfo();
    }
  }, []);

  return (
    <>
      <head>
        <meta name="viewport" content="width=1280" />
      </head>

      <div className="header">
        <div className="container_bg">
          <div className="groups">
            <div className="logo">
              <Link href="/" passHref>
                <img src="/logo-navbar.png" alt="Together Sports"></img>
              </Link>
            </div>
            <div className="category">
              <Link href="/room/roomlist" passHref>
                <button className="tag">방 목록</button>
              </Link>
              <button
                className="tag"
                onClick={(e) => {
                  if (myInfo.isInformationRequired) {
                    e.preventDefault();
                    alert("로그인 및 추가정보가 필요한 기능입니다.");
                    return;
                  }
                  router.push("/myroom");
                }}
              >
                내 일정
              </button>
              <button
                className="tag"
                onClick={(e) => {
                  if (myInfo.isInformationRequired) {
                    e.preventDefault();
                    alert("로그인 및 추가정보가 필요한 기능입니다.");
                    return;
                  }
                  router.push("/room/createroom/roomsetting");
                }}
              >
                방 생성
              </button>
            </div>
          </div>
          <div>
            <div className="sign">
              {!loginStatus ? (
                <>
                  <Link href="/login" passHref>
                    <button className="tag">로그인</button>
                  </Link>
                </>
              ) : (
                <>
                  <button className="user-box" onClick={openUserInfoModalFunc}>
                    <img
                      className="ProfileImage"
                      src={`https://together-sports.com/${myInfo.userProfileImagePath}`}
                      alt="프로필 이미지"
                    ></img>
                    <div className="logOn">
                      {`${myInfo.userNickname}`} 님 반갑습니다!
                    </div>
                  </button>

                  <UserInfoModal
                    open={userInfoModalOpen}
                    close={closeUserInfoModalFun}
                  ></UserInfoModal>

                  <button
                    className="btn_signout"
                    onClick={() => {
                      ClickLogout();
                      // signOut({
                      //   callbackUrl: "/",
                      // });
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
      {loginStatus && myInfo.isInformationRequired ? <SignUpReqModal /> : ""}

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 82px;
          max-height: 82px;
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
          margin-bottom: 2px;
          display: flex;
          font-size: 2rem;
          cursor: pointer;
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
          white-space: nowrap;
        }

        .tag {
          padding: 2rem;
          border: none;
          background-color: inherit;
          font-size: 1.5rem;
          cursor: pointer;
          transition: 0.5s ease all;
        }

        .ProfileImage {
          border-radius: 50px;
          background-color: black;
          object-fit: cover;
          width: 40px;
          height: 40px;
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
          margin-bottom: 3px;
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
          margin-bottom: 3px;
          font-size: 1.5rem;
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
      `}</style>
    </>
  );
};

export default NavigationBar;
