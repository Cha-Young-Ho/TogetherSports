import { useEffect } from "react";

const ImageSlide = ({ imageArr }) => {
  const img1 = imageArr[0];
  const img2 = imageArr[1];
  const img3 = imageArr[2];

  let slideIndex = 1;
  useEffect(() => {
    showSlides(slideIndex);
  });

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
  }

  return (
    <>
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="number-text">1 / 3</div>
          <img src={img1} style={{ width: "100%" }} />
        </div>
        <div className="mySlides fade">
          <div className="number-text">2 / 3</div>
          <img src={img2} style={{ width: "100%" }} />
        </div>
        <div className="mySlides fade">
          <div className="number-text">3 / 3</div>
          <img src={img3} style={{ width: "100%" }} />
        </div>

        <a className="prev" onClick={plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={plusSlides(1)}>
          &#10095;
        </a>
      </div>

      <style jsx>{`
        .slideshow-container {
          max-width: 680px;
          position: relative;
          margin: auto;
        }

        .mySlides {
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

        .next {
          right: 0;
          border-radius: 3px 0 0 3px;
        }

        .prev:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .numbertext {
          color: #f2f2f2;
          font-size: 12px;
          padding: 8px 12px;
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
