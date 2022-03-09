import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavigationBar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // 여기에 어떤 화면이든 로컬에 담긴 토큰 확인하고,
  // 로컬에 토큰이 없으면 비 로그인 상태로
  // 로컬에 토큰이 있으면, 서버에 토큰 전달하고,
  // 서버가 토큰이 올바른 정보가 아니라고 하면 정보주고
  // 만약 여기서 토큰이 틀린 값이면 refresh 토큰도 보내기
  // 만약 refresh 토큰도 틀리다면 새로 로그인하게 유도

  return (
    <>
      <div className="header">
        <div className="container_bg">
          <div className="groups">
            <div className="logo">
              <Link href="/">
                <a>
                  <div>
                    TOGETHER
                    <br />
                    SPORTS
                  </div>
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
                {!session ? (
                  <>
                    <Link href="/signup/oauth">
                      <div className="tag">회원가입</div>
                    </Link>
                    <Link href="/">
                      <div className="tag">로그인</div>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="logOn">
                      {session.user.name} 님 반갑습니다!
                    </div>
                    <button
                      className="btn_signout"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
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
          font-family: "NanumBarunGothic";
          border-bottom: 1px solid #e4e8eb;
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
          font-weight: bold;
        }

        .category {
          width: 420px;
          display: flex;
          justify-content: space-around;
          font-size: 1.5rem;
        }

        .sign {
          width: 300px;
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

        .logOn {
          position: relative;
          top: 20px;
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
