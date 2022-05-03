import TextLogo from "./textLogo";
import Link from "next/link";
import useScrollFadeIn from "./useScrollFadeIn";

/* 수정 필요 */
// 1. 명세 후에 현재 모집중인 방의 개수 입력 필요
// 2. 회원가입 버튼 누를 때 이미 회원인지 아닌지 판단에 따라 다른 link로 보내기

const Main2 = () => {
  const animatedItem1 = useScrollFadeIn("up", 0.5, 0.1);
  const animatedItem2 = useScrollFadeIn("up", 0.5, 0.3);
  const animatedItem3 = useScrollFadeIn("up", 0.5, 0.5);
  const animatedItem4 = useScrollFadeIn("up", 0.5, 0.1);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="left-section">
            <div {...animatedItem1}>
              <p>가까운 동네에서 함께</p>
              <TextLogo color={"white"} />
              <p>일정을 구해보세요 !</p>
            </div>

            <p className="emoji" {...animatedItem2}>
              🏃🏃‍♂️🏃‍♀️
            </p>

            <div className="info-text" {...animatedItem3}>
              <p>
                현재 <b>123</b>개의 방에서
              </p>
              <p>같이 운동할 사람을 구하는 중 !</p>
            </div>
          </div>

          <Link href="/login">
            <div className="right-section" {...animatedItem4}>
              <img src={"/main2.png"} />
            </div>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 600px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          background-color: #2b7a5f;
          display: flex;
          justify-content: center;
        }

        p {
          color: white;
        }

        .section {
          width: 80%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .left-section,
        .right-section {
          display: flex;
          flex-direction: column;
        }

        .left-section > div:nth-child(1) {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 70px;
        }

        .left-section > div:nth-child(1) > p:nth-child(1) {
          font-size: 2.5rem;
          margin-right: 15px;
        }

        .left-section > div:nth-child(1) > p:nth-child(3) {
          font-size: 2.5rem;
          margin-left: 15px;
        }

        .emoji {
          font-size: 10rem;
          margin-bottom: 10px;
        }

        .info-text > p {
          font-size: 3rem;
          letter-spacing: 2px;
        }

        .right-section {
          width: 350px;
          height: 350px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Main2;
