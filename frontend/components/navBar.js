import Link from "next/link";

const NavBar = () => {
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
            <Link href="/">
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
          //position: fixed;
          top:0
          width: 100vw;
          height: 150px;
          z-index: 2022;
          transform: translateY(0);
          transition: transform 0.3s ease;
          font-family: "NanumBarunGothic";
          border-bottom: 1px solid #e4e8eb;
        }

        .container_bg {
          display: flex;
          width: 100vw;
          height: 100%;
          padding: 0 205px;
          padding-top: 70px;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .groups{
          display: flex;
        }

        .logo {
          width: 138px;
          display: flex;
          font-size: 2rem;
          font-weight: bold;
        }

        .category {
          margin-left: 30px;
          width: 420px;
          position: relative;
          display: flex;
          justify-content: space-between;
          font-size: 1.5rem;
        }

        .sign {
          width: 250px;
          display: flex;
          position: relative;
          justify-content: space-between;
          font-size: 1.5rem;
        }

        .tag{
          padding: 2rem;
        }
      `}</style>
    </>
  );
};

export default NavBar;
