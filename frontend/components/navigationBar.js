import Link from "next/link";

const NavigationBar = () => {
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
          <div className="sign">
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
