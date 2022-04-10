import { useEffect, useState } from "react";

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
    let i;
    let slides = document.getElementsByClassName("slide");

    if (index > slides.length) setSlideIndex((slideIndex = 1));
    if (index < 1) setSlideIndex((slideIndex = slides.length));

    // console.log(slideIndex);
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  };

  return (
    <>
      <div className="slideshow-container">
        <div className="slide fade">
          <div className="number-text">1 / 3</div>
          <img src={img1} style={{ width: "100%" }} />
        </div>

        <div className="slide fade">
          <div className="number-text">2 / 3</div>
          <img src={img2} style={{ width: "100%" }} />
        </div>

        <div className="slide fade">
          <div className="number-text">3 / 3</div>
          <img src={img3} style={{ width: "100%" }} />
        </div>

        <a className="prev" onClick={() => onChangeImage(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => onChangeImage(1)}>
          &#10095;
        </a>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        img {
          vertical-align: middle;
        }

        .slideshow-container {
          max-width: 680px;
          position: relative;
          margin: auto;
        }

        .slide {
          display: none;
        }

        .prev,
        .next {
          cursor: pointer;
          position: absolute;
          top: 50%;
          width: auto;
          margin-top: -22px;
          padding: 16px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          transition: 0.6s ease;
          border-radius: 0 3px 3px 0;
          user-select: none;
        }

        .prev {
          left: 0;
        }

        .next {
          right: 0;
          border-radius: 3px 0 0 3px;
        }

        .prev:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .number-text {
          color: gray;
          font-size: 1em;
          padding: 10px 10px;
          position: absolute;
          top: 0;
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
