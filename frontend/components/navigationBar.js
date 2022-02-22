import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavigationBar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

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
                <a>
                  <div className="tag">소개</div>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <div className="tag">방 목록</div>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <div className="tag">방 개설</div>
                </a>
              </Link>
            </div>
          </div>
          <div>
            {!loading ? (
              <div className="sign">
                {!session ? (
                  <>
                    <Link href="/signup/oauth">
                      <a>
                        <div className="tag">회원가입</div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a>
                        <div className="tag">로그인</div>
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="logOn">
                      {session.user.name} 님 반갑습니다!
                    </div>
                    <button className="btn_signout" onClick={signOut}>
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
          height: 120px;
          min-height: 8vh;
          font-family: "NanumBarunGothic";
          border-bottom: 1px solid #e4e8eb;
        }

        .container_bg {
          display: flex;
          margin-top: 50px;
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
          width: 250px;
          display: flex;
          position: relative;
          justify-content: space-between;
          font-size: 1.5rem;
        }

        .tag {
          padding: 2rem;
        }

        .logOn {
          position: relative;
          top: 20px;
        }

        .btn_signout {
          position: relative;
          top: 20px;
          background: #fff;
          color: black;
          border: none;
          padding: 0.2rem;
          position: relative;
          cursor: pointer;
          transition: 800ms ease all;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
        }

        .btn_signout:hover {
          background: #fff;
          color: #1aab8a;
        }
        .btn_signout:before,
        .btn_signout:after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          height: 2px;
          width: 0;
          background: #1aab8a;
          transition: 400ms ease all;
        }
        .btn_signout:after {
          right: inherit;
          top: inherit;
          left: 0;
          bottom: 0;
        }
        .btn_signout:hover:before,
        .btn_signout:hover:after {
          width: 100%;
          transition: 800ms ease all;
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
