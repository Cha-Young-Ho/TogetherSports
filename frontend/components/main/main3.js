import TextLogo from "./textLogo";
import Link from "next/link";

/* 수정 필요 */
// 1. img 색상 다른거 이미지 받아야함
// 2. 화살표 이미지 받기
// 3. 방 생성하러 갈 때 로그인 했는지 확인 필요

const Main3 = () => {
  return (
    <>
      <div className="container">
        <TextLogo color={"#468f5b"} />
        <p>할 사람을 직접 모집할 수도 있어요 ~</p>

        <div className="guide">
          <div>
            <p>
              원하는 <b>종목</b> 선택
            </p>
            <img src={"/interests-activation.png"} />
          </div>

          <p>▶</p>

          <div>
            <p>
              가능한 <b>일정</b> 선택
            </p>
            <img src={"/roomschedule-activation.png"} />
          </div>

          <p>▶</p>

          <div>
            <p>
              같이할 <b>인원</b> 선택
            </p>
            <img src={"/roomtaginfo-activation.png"} />
          </div>
        </div>

        <div className="arrow"></div>

        <p>방 생성 완료 !</p>

        <Link href="/room/createroom/roomsetting">
          <button>🔥방 생성하러 가기🔥</button>
        </Link>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 788px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
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
          width: 60%;
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

        img {
          width: 200px;
          height: 200px;
          margin-top: 20px;
        }

        .arrow {
          width: 47%;
          height: 42px;
          border-top: none;
          border-left: solid 1px black;
          border-right: solid 1px black;
          border-bottom: solid 1px black;
          margin-bottom: 30px;
        }

        .container > p:nth-child(5) {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 100px;
        }

        button {
          width: 338px;
          height: 81px;
          border: none;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-image: linear-gradient(to bottom, #6db152, #2b7a5f);
          font-size: 3rem;
          font-weight: bold;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Main3;
