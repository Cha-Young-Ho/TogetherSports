import TextLogo from "./textLogo";

/* 수정 필요 */
// 1. 명세 후에 현재 모집중인 방의 개수 입력 필요
// 2. right-section 원 안의 이미지구하기
// 3. right-section의 화살표 이미지 구하기

const Main2 = () => {
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="left-section">
            <div>
              <p>가까운 동네에서 함께</p>
              <TextLogo color={"white"} />
              <p>일정을 구해보세요 !</p>
            </div>

            <p className="emoji">🏃🏃‍♂️🏃‍♀️</p>

            <p>
              현재 <b>123</b>개의 방에서
            </p>
            <p>같이 운동할 사람을 구하는 중 !</p>
          </div>

          <div className="right-section">
            <p>🔥</p>
            <p>참여하실래요 ?</p>
            <img />
            <p>회원가입 바로가기</p>
          </div>
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
          width: 85%;
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
          font-size: 2rem;
          margin-right: 15px;
        }

        .left-section > div:nth-child(1) > p:nth-child(3) {
          font-size: 2rem;
          margin-left: 15px;
        }

        .emoji {
          font-size: 10rem;
          /* margin-bottom: 10px; */
        }

        .left-section > p:nth-child(3),
        .left-section > p:nth-child(4) {
          font-size: 3rem;
          letter-spacing: 2px;
        }

        .right-section {
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .right-section > p:nth-child(1),
        .right-section > p:nth-child(2) {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        .right-section > p:nth-child(4) {
          font-size: 2rem;
        }
      `}</style>
    </>
  );
};

export default Main2;
