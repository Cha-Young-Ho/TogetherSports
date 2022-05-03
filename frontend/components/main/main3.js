import TextLogo from "./textLogo";
import useScrollFadeIn from "./useScrollFadeIn";

/* 수정 필요 */
// 1. 방 생성하러 갈 때 로그인 했는지 확인 필요

const Main3 = () => {
  const animatedItem1 = useScrollFadeIn("up", 0.5, 0.1);
  const animatedItem2 = useScrollFadeIn("up", 0.5, 0.2);
  const animatedItem3 = useScrollFadeIn("up", 0.5, 0.3);
  const animatedItem4 = useScrollFadeIn("up", 0.5, 0.4);
  const animatedItem5 = useScrollFadeIn("up", 0.5, 0.5);
  const animatedItem6 = useScrollFadeIn("up", 0.5, 0.8);
  const animatedItem7 = useScrollFadeIn("up", 0.5, 1.0);

  return (
    <>
      <div className="container">
        <TextLogo color={"#468f5b"} />
        <p>할 사람을 직접 모집할 수도 있어요 ~</p>

        <div className="guide">
          <div {...animatedItem1}>
            <p>
              원하는 <b>종목</b> 선택
            </p>
            <img src={"/main3-img1.png"} />
          </div>

          <p {...animatedItem2}>▶</p>

          <div {...animatedItem3}>
            <p>
              가능한 <b>일정</b> 선택
            </p>
            <img src={"/main3-img2.png"} />
          </div>

          <p {...animatedItem4}>▶</p>

          <div {...animatedItem5}>
            <p>
              같이할 <b>인원</b> 선택
            </p>
            <img src={"/main3-img3.png"} />
          </div>
        </div>

        <img src="/main3-arrow.png" {...animatedItem6} />

        <p {...animatedItem7}>방 생성 완료 !</p>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 700px;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .container > p:nth-child(2) {
          font-size: 2.5rem;
          margin-top: 20px;
          margin-bottom: 50px;
        }

        .guide {
          width: 1050px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .guide > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .guide p {
          font-size: 2rem;
        }

        .guide > p {
          font-size: 3rem;
        }

        .guide img {
          width: 200px;
          height: 200px;
          margin-top: 20px;
        }

        .container > p:nth-child(5) {
          font-size: 3rem;
          font-weight: bold;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default Main3;
