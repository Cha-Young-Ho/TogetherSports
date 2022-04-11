import { useEffect, useState } from "react";

/* 수정 필요 */
// 1. 컴포넌트화

const ImageSlide = ({ imageArr }) => {
  const img1 = imageArr[0];
  const img2 = imageArr[1];
  const img3 = imageArr[2];
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  });

  const onChangeImage = (index) => {
    showSlides((slideIndex += index));
  };

  const showSlides = (index) => {
    let slides = document.getElementsByClassName("slide");

    if (index > slides.length) setSlideIndex((slideIndex = 1));
    if (index < 1) setSlideIndex((slideIndex = slides.length));

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "table";
  };

  return (
    <>
      <div className="slideshow-container">
        <div className="slide fade">
          <div className="number-text">1 / 3</div>
          <div className="image">
            <img src={img1} />
          </div>
        </div>

        <div className="slide fade">
          <div className="number-text">2 / 3</div>
          <div className="image">
            <img src={img2} />
          </div>
        </div>

        <div className="slide fade">
          <div className="number-text">3 / 3</div>
          <div className="image">
            <img src={img3} />
          </div>
        </div>

        <div className="buttons">
          <button className="prev-button" onClick={() => onChangeImage(-1)}>
            &#10094;
          </button>
          <button className="next-button" onClick={() => onChangeImage(1)}>
            &#10095;
          </button>
        </div>
      </div>

      <style jsx>{`
        .slideshow-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide {
          display: none;
          width: 100%;
          height: 100%;
          text-align: center;
        }

        .image {
          display: table-cell;
          vertical-align: middle;
        }

        img {
          max-width: 100%;
          max-height: 100%;
          user-select: none;
        }

        .number-text {
          color: black;
          font-size: 1em;
          font-weight: bold;
          padding: 10px 10px;
          position: absolute;
          top: 0;
        }

        .buttons {
          position: absolute;
          top: 50%;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .prev-button,
        .next-button {
          cursor: pointer;
          width: 40px;
          height: 40px;
          color: white;
          font-weight: bold;
          font-size: 1.5em;
          transition: 0.6s ease;
          user-select: none;
          border: none;
          opacity: 0.8;
          background-color: #e5e5e5;
          border-radius: 50%;
          margin-top: -25px;
        }

        .prev-button {
          left: 0;
          margin-left: 15px;
        }

        .next-button {
          right: 0;
          margin-right: 15px;
        }

        .prev-button:hover,
        .next-button:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .fade {
          animation-name: fade;
          animation-duration: 1.5s;
        }

        @keyframes fade {
          from {
            opacity: 0.4;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ImageSlide;
