import TextLogo from "./textLogo";

const Main1 = () => {
  // 이미지로 대체
  const sports = [
    "축구",
    "야구",
    "농구",
    "당구",
    "탁구",
    "헬스",
    "자전거",
    "골프",
    "등산",
    "런닝",
    "배드민턴",
    "기타",
    "축구",
    "야구",
    "농구",
    "당구",
    "탁구",
    "헬스",
    "자전거",
    "골프",
    "등산",
    "런닝",
    "배드민턴",
    "기타",
  ];

  return (
    <>
      <div className="container">
        <p>다양한 종목 🏀</p>

        <div className="line"></div>

        <div className="slider">
          <div className="slide-track">
            {sports.map((sport, index) => {
              return (
                <div key={index} className="slide">
                  {sport}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text">
          <p>운동모임 일정은 편하게</p>
          <TextLogo />
          <p>로 잡아보세요 !</p>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 430px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .container > p {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .line {
          width: 32px;
          height: 2px;
          background-color: black;
          margin-bottom: 40px;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-150px * 12));
          }
        }

        .slider {
          width: 100%;
          margin-bottom: 40px;
          overflow: hidden;
          position: relative;
        }

        .slide-track {
          animation: scroll 25s linear infinite;
          display: flex;
          width: calc(150px * 24);
        }

        .slide {
          width: 150px;
          height: 150px;
          border: none;
          border-radius: 10px;
          font-size: 2rem;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          /* margin: 0 100px; */
          background-color: #67a74d;
        }

        .text {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .text > p {
          font-size: 2rem;
        }

        .text > p:nth-child(1) {
          margin-right: 15px;
        }

        .text > p:nth-child(3) {
          margin-left: 15px;
        }
      `}</style>
    </>
  );
};

export default Main1;
