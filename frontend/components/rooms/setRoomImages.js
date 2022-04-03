import { useEffect, useState } from "react";

const SetRoomImages = (props) => {
  const [inputImageName, setInputImageName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [roomImage, setRoomImage] = useState([]); //서버로 보낼 데이터
  const [imagePreview, setImagePreview] = useState([]);
  const [representativeIndex, setRepresentativeIndex] = useState(0);

  // 상위 컴포넌트로 이미지 전달
  useEffect(() => {
    if (props.getData) {
      props.getData(roomImage);
      return;
    }
  }, [roomImage]);

  // 이미지 source 인코딩
  const encodeFileToBase64 = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const baseURL = "";
      reader.readAsDataURL(file); // 파일을 base64 text로 전환

      reader.onload = () => {
        baseURL = reader.result;
        const sliceIndex = baseURL.indexOf(",");
        setImageSrc((imageSrc = baseURL.substr(sliceIndex + 1)));
        setImagePreview((prev) => [...prev, (imagePreview = baseURL)]);
        resolve(baseURL);
      };
    });
  };

  // 이미지 선택 함수
  const onClickImage = (e) => {
    const file = e.target.files[0];
    if (file === undefined) {
      e.preventDefault();
      return;
    }
    const imageFileExtension = file.type.split("/")[1];

    if (roomImage.length < 5) {
      setInputImageName(file.name);
      encodeFileToBase64(file).then(() => {
        setRoomImage([
          ...roomImage,
          {
            roomImageExtension: imageFileExtension,
            imageSource: imageSrc,
          },
        ]);
      });
    } else {
      e.preventDefault();
      alert("이미지는 최대 5개까지 설정할 수 있습니다!");
    }
  };

  // 이미지 삭제 함수
  const deleteImage = (e) => {
    const selectedImageIndex = e.target.classList[1];
    const imageIndex = selectedImageIndex.slice(4);
    const selectedImg = document.querySelector(`.img-${imageIndex}`);

    // input 비우기
    setInputImageName((inputImageName = ""));

    // 프리뷰에서 삭제
    setImagePreview((prev) =>
      prev.filter((el) => {
        return el !== selectedImg.src;
      })
    );

    // 서버에게 전달할 객체배열 안에서 데이터 삭제
    const sliceIndex = selectedImg.src.indexOf(",");
    const src = selectedImg.src.substr(sliceIndex + 1);
    setRoomImage((prev) =>
      prev.filter((el) => {
        return el.imageSource !== src;
      })
    );
  };

  // 대표사진을 위해 배열의 index 변경
  const changeArrayOrder = (arr, targetIndex, moveValue) => {
    const newPositionIndex = targetIndex + moveValue; // 이동할 index
    if (newPositionIndex < 0 || newPositionIndex >= arr.length) return;
    const tempArr = JSON.parse(JSON.stringify(arr));
    const target = tempArr.splice(targetIndex, 1)[0];
    tempArr.splice(newPositionIndex, 0, target);
    setRoomImage((roomImage = tempArr));
  };

  const onChangeRepresentativeImage = (e) => {
    const targetIndex = e.target.classList[1].slice(-1);
    const moveValue = Math.abs(targetIndex) * -1;

    setInputImageName((inputImageName = "")); // input 비우기
    setRepresentativeIndex((representativeIndex = Number(targetIndex))); // 대표사진 바꾸기
    changeArrayOrder(roomImage, targetIndex, moveValue);
  };

  return (
    <>
      <div className="content-images">
        <div className="images">
          <p>사진추가</p>
          <input readOnly className="image-name" value={inputImageName} />
          <label htmlFor="filename">
            <div>파일찾기</div>
          </label>
          <input
            type="file"
            id="filename"
            accept=".jpg, .jpeg, .png"
            onChange={onClickImage}
          />
        </div>

        <p>* 선택된 사진이 대표사진이 됩니다!</p>

        <div className="previews">
          {imagePreview.map((preview, index) => {
            if (index === representativeIndex) {
              return (
                <div className="preview" key={index}>
                  <div
                    className={`preview-${index} preview-clicked`}
                    onClick={onChangeRepresentativeImage}
                  >
                    <img src={preview} className={`img-${index}`} />
                  </div>
                  <button className={`btn-${index}`} onClick={deleteImage}>
                    X
                  </button>
                </div>
              );
            } else {
              return (
                <div className="preview" key={index}>
                  <div
                    className={`preview-${index} preview-unclicked`}
                    onClick={onChangeRepresentativeImage}
                  >
                    <img src={preview} className={`img-${index}`} />
                  </div>
                  <button className={`btn-${index}`} onClick={deleteImage}>
                    X
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
      <style jsx>{`
        .content-images {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 50px 0;
        }

        .images {
          width: 550px;
          height: 40px;
          padding: 5px 10px 5px 14px;
          margin-bottom: 10px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .images p {
          font-size: 1.5em;
          font-weight: bold;
        }

        .image-name {
          width: 380px;
          height: 30px;
          border-style: none;
          font-size: 1.4em;
          padding: 5px;
        }

        .images label {
          width: 70px;
          height: 28px;
          background-color: #08555f;
          color: white;
          font-size: 1.3em;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .images input[type="file"] {
          position: absolute;
          width: 0;
          height: 0;
          padding: 0;
          border: 0;
          overflow: hidden;
        }

        .content-images > p {
          margin-bottom: 20px;
          font-size: 1.2em;
          color: #b5b5b5;
        }

        .previews {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .preview {
          height: 100px;
          display: table;
          text-align: center;
        }

        .preview-unclicked {
          width: 97px;
          height: 90px;
          margin: 0 10px;
          border: none;
          border-radius: 10px;
          background-color: #d8d8d8;
          overflow: hidden;
          display: table-cell;
          vertical-align: middle;
          cursor: pointer;
        }

        .preview-clicked {
          width: 97px;
          height: 90px;
          margin: 0 10px;
          border: solid 3px #468f5b;
          border-radius: 10px;
          background-color: #d8d8d8;
          overflow: hidden;
          display: table-cell;
          vertical-align: middle;
          cursor: pointer;
        }

        .preview img {
          max-width: 90px;
          max-height: 90px;
        }

        .preview button {
          position: relative;
          bottom: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 50%;
          opacity: 0.8;
          background-color: darkgray;
          font-weight: bold;
          font-size: 1.2em;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default SetRoomImages;
