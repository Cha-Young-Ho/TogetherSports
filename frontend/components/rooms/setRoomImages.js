import { useEffect, useState } from "react";

/* 수정 필요 */
// 1. 대표사진에 대한 구현

const SetRoomImages = (props) => {
  const [image, setImage] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [roomImage, setRoomImage] = useState([]); //서버로 보낼 데이터
  const [imagePreview, setImagePreview] = useState([]);

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
        setImagesrc((imagesrc = baseURL.substr(sliceIndex + 1)));
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
      setImage(file.name);
      encodeFileToBase64(file).then(() => {
        setRoomImage([
          ...roomImage,
          {
            roomImageExtension: imageFileExtension,
            imageSource: imagesrc,
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
    setImage((image = ""));

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

  return (
    <>
      <div className="content-images">
        <div className="images">
          <p>사진추가</p>
          <input readOnly className="image-name" value={image} />
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

        <div className="previews">
          {imagePreview.map((preview, index) => {
            return (
              <div className="preview" key={index}>
                <div>
                  <img src={preview} alt="preview" className={`img-${index}`} />
                </div>
                <button className={`btn-${index}`} onClick={deleteImage}>
                  X
                </button>
              </div>
            );
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
          margin-bottom: 20px;
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

        .content-images label {
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

        .content-images input[type="file"] {
          position: absolute;
          width: 0;
          height: 0;
          padding: 0;
          border: 0;
          overflow: hidden;
        }

        .previews {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .preview {
          display: table;
          text-align: center;
        }

        .preview div {
          width: 90px;
          height: 90px;
          margin: 0 10px;
          border: none;
          border-radius: 10px;
          background-color: #d8d8d8;
          overflow: hidden;
          display: table-cell;
          vertical-align: middle;
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
          background-color: #f2f2f2;
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
