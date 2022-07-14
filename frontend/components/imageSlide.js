import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const ImageSlide = (props) => {
  const [slideIndex, setSlideIndex] = useState(1);

  // 운동 대기방 페이지 이미지
  const roomDetailImageArr = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomImages
  );

  // 방 설명 팝업 이미지
  const roomInfoImageArr = useSelector(
    (state) => state.saveRoomModalImagesReducer.roomImages
  );

  const onChangeImage = (index) => {
    showSlides((slideIndex += index));
  };

  const showSlides = (index) => {
    const slides = document.getElementsByClassName("slide");

    if (index > slides.length) setSlideIndex((slideIndex = 1));
    if (index < 1) setSlideIndex((slideIndex = slides.length));

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "table";
  };

  useEffect(() => {
    showSlides(slideIndex);
  }, []);

  return (
    <>
      <div className="slideshow-container">
        {props.path === "roomInfo"
          ? Array.isArray(roomInfoImageArr)
            ? roomInfoImageArr
                .sort((a, b) => a.order - b.order)
                .map((image, index) => {
                  return (
                    <div className="slide fade" key={index}>
                      <div className="number-text">{`${index + 1} / ${
                        roomInfoImageArr.length
                      }`}</div>
                      <div className="image-container">
                        <img
                          src={`${API_ENDPOINT}${image.imagePath}`}
                          className="roomInfoImage"
                        />
                      </div>
                    </div>
                  );
                })
            : ""
          : Array.isArray(roomDetailImageArr)
          ? roomDetailImageArr
              .sort((a, b) => a.order - b.order)
              .map((image, index) => {
                return (
                  <div className="slide fade" key={index}>
                    <div className="number-text">{`${index + 1} / ${
                      roomDetailImageArr.length
                    }`}</div>
                    <div className="image-container">
                      <img
                        src={`${API_ENDPOINT}${image.imagePath}`}
                        className="roomDetailImage"
                      />
                    </div>
                  </div>
                );
              })
          : ""}

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
          width: 100%; // 이것을 건들면 버튼이 문제가 생기옵니다
          height: 100%;
        }

        .slide {
          width: 100%;
          height: 100%;
          text-align: center;
          display: none;
        }

        .image-container {
          display: table-cell;
          vertical-align: middle;
        }

        .roomInfoImage {
          width: 655px;
          height: 345px;
          object-fit: contain;
        }

        .roomDetailImage {
          width: 310px;
          height: 281px;
          object-fit: contain;
        }

        .number-text {
          color: black;
          font-size: 1rem;
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
          font-size: 1.5rem;
          transition: 0.5s ease;
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
          background-color: rgba(0, 0, 0, 1);
        }

        .fade {
          animation-name: fade;
          animation-duration: 0.5s;
        }

        @keyframes fade {
          from {
            opacity: 0.5;
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
