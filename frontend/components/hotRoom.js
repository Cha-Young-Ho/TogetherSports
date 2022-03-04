import { useEffect, useRef, useState } from "react";

const HotRoom = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const tempData = [
    {
      image: "#000000",
      title: "Room name1",
      ppl: 10,
      text: "게임/일정 등의 정보",
    },
    {
      image: "#000000",
      title: "Room name2",
      ppl: 12,
      text: "게임/일정 등의 정보",
    },
    {
      image: "#000000",
      title: "Room name3",
      ppl: 13,
      text: "게임/일정 등의 정보",
    },
    {
      image: "#000000",
      title: "Room name4",
      ppl: 15,
      text: "게임/일정 등의 정보",
    },
    {
      image: "#000000",
      title: "Room name5",
      ppl: 20,
      text: "게임/일정 등의 정보",
    },
  ];

  const TOTAL_SLIDES = Math.floor(tempData.length / 2);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const beforeSlide = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translate(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <>
      <div className="root-bg">
        <div className="title">실시간 Hot한 방🔥</div>
        <div className="slider-container">
          <div className="slider-wrapper">
            <div className="slider-view" ref={slideRef}>
              {tempData.map((data) => {
                return (
                  <div className="slider">
                    <div className="room-container">
                      <div className="room-info">
                        <div className="room-title-ppl">
                          <p1>{`${data.title}`}</p1>
                          <p2>{`${data.ppl}`}</p2>
                        </div>
                        <p2>{`${data.text}`}</p2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="next" onClick={nextSlide}>
            {`>`}
          </button>
          <button className="before" onClick={beforeSlide}>
            {`<`}
          </button>
        </div>
      </div>

      <style jsx>{`
        * {
          font-family: "NanumBarunGothic";
        }

        .root-bg {
          z-index: 1;
          margin: 20px 0;
          width: 100%;
          height: 560px;
          display: flex;
          flex-direction: column;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .title {
          margin: 45px 0;
          padding: 0 0 0 250px;
          font-weight: bold;
          font-size: 2.5rem;
        }

        .slider-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .slider-wrapper {
          width: 100%;
          height: 410px;
          overflow: hidden;
        }

        .slider-view {
          width: 500px;
          display: flex;
        }

        .room-container {
          margin-left: 100px;
          width: 400px;
          height: 400px;
          border-radius: 30px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #f4f4f4;
        }

        .room-info {
          position: relative;
          top: 260px;
          width: 400px;
          height: 140px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          border-bottom-right-radius: 30px;
          border-bottom-left-radius: 30px;
          background: #fff;
        }

        .room-title-ppl {
          display: flex;
          justify-content: space-between;
        }

        p1 {
          font-weight: bold;
          margin: 10px;
          font-size: 2rem;
        }

        p2 {
          margin: 10px;
          font-size: 1.5rem;
          color: #a5a5a5;
        }

        .next {
          position: absolute;
          right: 200px;
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          opacity: 0.7;
          background-color: #a8a8a8;
          border: 0;
        }

        .before {
          position: absolute;
          left: 200px;
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          opacity: 0.7;
          background-color: #a8a8a8;
          border: 0;
        }
      `}</style>
    </>
  );
};

export default HotRoom;
