import { useEffect, useState, useSelector } from "react";

const SetRoomImages = (props) => {
  const [inputImageName, setInputImageName] = useState(""); // input에 표시할 이미지 이름
  const [imageSrc, setImageSrc] = useState(""); // 이미지 소스
  const [roomImage, setRoomImage] = useState([]); // 서버로 보낼 데이터
  const [imagePreview, setImagePreview] = useState([]); // 프리뷰를 담을 배열
  const [thumbnailIndex, setThumbnailIndex] = useState(0); // 대표사진을 설정할 인덱스

  // roomtaginfo, modifyroommodal
  useEffect(() => {
    if (props.getImageData) {
      props.getImageData(roomImage);
      return;
    }
  }, [roomImage]);

  // roomtaginfo, modifyroommodal
  useEffect(() => {
    if (props.getThumbnailData) {
      props.getThumbnailData(thumbnailIndex);
      return;
    }
  }, [thumbnailIndex]);

  // modifyroommodal
  useEffect(() => {
    if (props.setData) {
      setRoomImage(props.setData());
    }

    if (props.setPreview) {
      setImagePreview(props.setPreview());
    }
  }, []);

  // modifyroommodal
  useEffect(() => {
    if (props.getPreview) {
      props.getPreview(imagePreview);
      return;
    }
  }, [imagePreview]);

  // 이미지 선택 함수
  const onClickImage = (e) => {
    const file = e.target.files[0];

    if (file === undefined) {
      e.preventDefault();
      return;
    }
    const imageFileExtension = file.type.split("/")[1]; // 이미지 확장자

    if (roomImage.length < 5) {
      setInputImageName(file.name); // input에 이미지 이름 설정하기
      encodeFileToBase64(file).then(() => {
        // 인코딩 이후에 추가
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

  // 이미지 source 인코딩
  const encodeFileToBase64 = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const baseURL = "";
      reader.readAsDataURL(file); // 파일을 base64 text로 전환

      reader.onload = () => {
        baseURL = reader.result;
        const sliceIndex = baseURL.indexOf(",");
        setImageSrc((imageSrc = baseURL.substr(sliceIndex + 1))); // 서버에 전송하기 위해 이미지 소스에 인코딩된 앞부분 떼고 담기
        setImagePreview((prev) => [...prev, (imagePreview = baseURL)]);
        resolve(baseURL);
      };
    });
  };

  // 이미지 삭제 함수
  const deleteImage = (e) => {
    const imageIndex = Number(e.target.classList[1].slice(4)); // 삭제할 이미지의 index

    // input 비우기
    setInputImageName((inputImageName = ""));

    deleteImageData(imageIndex).then(() => {
      if (imageIndex === thumbnailIndex || imageIndex >= roomImage.length)
        setThumbnailIndex(0);
      else if (thumbnailIndex === roomImage.length - 1)
        setThumbnailIndex(thumbnailIndex - 1);
    });
  };

  const deleteImageData = async (imageIndex) => {
    // 프리뷰에서 삭제
    setImagePreview((prev) =>
      prev.filter((el, index) => {
        return index !== imageIndex;
      })
    );

    // 서버에게 전달할 객체배열 안에서 데이터 삭제
    setRoomImage((prev) =>
      prev.filter((el, index) => {
        return index !== imageIndex;
      })
    );
  };

  // 대표사진 변경 함수
  const onChangeThumbnailImage = (e) => {
    const targetIndex = Number(e.target.classList[1].slice(-1)); // 대표사진으로 바꿀 index

    setInputImageName((inputImageName = "")); // input 비우기
    setThumbnailIndex((thumbnailIndex = targetIndex)); // 대표사진 바꾸기
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
            if (index === thumbnailIndex) {
              return (
                <div className="preview" key={index}>
                  <div
                    className={`preview-${index} preview-clicked`}
                    onClick={onChangeThumbnailImage}
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
                    onClick={onChangeThumbnailImage}
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
        input:focus {
          outline: none;
        }

        .content-images {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .images {
          width: 100%;
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
          font-size: 1.5rem;
          font-weight: bold;
        }

        .image-name {
          width: 70%;
          height: 30px;
          margin-right: 10px;
          border-style: none;
          font-size: 1.4rem;
          padding: 5px;
        }

        .images label {
          width: 70px;
          height: 28px;
          background-color: #08555f;
          color: white;
          font-size: 1.3rem;
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
          font-size: 1.2rem;
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

        .preview-unclicked,
        .preview-clicked {
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
          border: solid 3px #468f5b;
        }

        .preview img {
          max-width: 90px;
          max-height: 90px;
          user-select: none;
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
          font-size: 1.2rem;
          color: white;
          user-select: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default SetRoomImages;
