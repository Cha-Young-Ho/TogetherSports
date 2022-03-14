import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteLogout } from "../api/members";
import Modal from "./userInfoModal";

const NavigationBar = () => {
  // 로그인 상태 임을 판별하는 변수
  const [loginData, setLoginData] = useState(false);

  // 유저 세션 정보(auth name, email, provider)
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // 유저 프로필 클릭 시 뜨는 팝업 창 관리 state
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 로컬 스토리지에 accessToken 가져오기
  useEffect(() => {
    setLoginData((loginData = localStorage.getItem("accessToken")));
  }, []);

  const ClickLogout = () => {
    deleteLogout().then((res) => {
      console.log(res.message);
      if (res.code === 5000) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoginData((loginData = false));
        console.log("로그아웃 완료");
      } else {
        console.log("잘못 된 요청입니다.");
      }
    });
    console.log("로그아웃 시도");
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
              <Link href="/">
                <div className="tag">소개</div>
              </Link>
              <Link href="/">
                <div className="tag">방 목록</div>
              </Link>
              <Link href="/">
                <div className="tag">방 개설</div>
              </Link>
            </div>
          </div>
          <div>
            {!loading ? (
              <div className="sign">
                {!session || !loginData ? (
                  <>
                    <Link href="/signup/oauth">
                      <div className="tag">회원가입</div>
                    </Link>
                    <Link href="/login">
                      <div className="tag">로그인</div>
                    </Link>
                  </>
                ) : (
                  <>
                    <button className="user-box" onClick={openModal}>
                      <div className="ProfileImage"></div>
                      <div className="logOn">
                        {session.user.name} 님 반갑습니다!
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
            ) : null}
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 80px;
          min-height: 8vh;
          border-bottom: 1px solid #e4e8eb;
          z-index: 9999;
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
          width: 300px;
          height: 62px;
          display: flex;
          position: relative;
          justify-content: space-between;
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
