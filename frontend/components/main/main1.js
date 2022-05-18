import TextLogo from "./textLogo";

const Main1 = () => {
  const sports = [
    "soccer.png",
    "baseball.png",
    "basketball.png",
    "billiards.png",
    "tableTennis.png",
    "health.png",
    "bicycle.png",
    "golf.png",
    "hiking.png",
    "running.png",
    "badminton.png",
    "etc.png",
    "soccer.png",
    "baseball.png",
    "basketball.png",
    "billiards.png",
    "tableTennis.png",
    "health.png",
    "bicycle.png",
    "golf.png",
    "hiking.png",
    "running.png",
    "badminton.png",
    "etc.png",
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
                  <img src={`/${sport}`}></img>
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
            transform: translateX(calc(-250px * 12));
          }
        }

        .slider {
          width: 100%;
          margin-bottom: 40px;
          overflow: hidden;
          position: relative;
        }

        .slide-track {
          animation: scroll 30s linear infinite;
          display: flex;
          width: calc(250px * 24);
        }

        .slide {
          width: 150px;
          height: 150px;
          margin-right: 100px;
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

        .slide img {
          width: 150px;
          height: 150px;
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
