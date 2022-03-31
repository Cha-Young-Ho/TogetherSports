import { useState } from "react";

const ModifyRoomModal = ({ open, close }) => {
  // 방 설명
  const [roomContent, setRoomContent] = useState("");

  // 방 이미지
  const [image, setImage] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [roomImage, setRoomImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  // 방 태그
  const [tag, setTag] = useState([]);

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

  // 이미지 확장자 index 반환 함수
  const getExtension = (profilename) => {
    if (profilename.indexOf("png") !== -1) {
      return profilename.indexOf("png");
    } else if (profilename.indexOf("jpg") !== -1) {
      return profilename.indexOf("jpg");
    }
    if (profilename.indexOf("jpeg") !== -1) {
      return profilename.indexOf("jpeg");
    }
  };

  // 이미지가 선택 함수
  const onClickImage = (e) => {
    const file = e.target.files[0];
    const index = getExtension(file.name);
    const imageFileRealName = file.name.substring(0, index - 1);
    const imageFileExtension = file.type.split("/")[1];

    if (roomImage.length < 5) {
      setImage(file.name);
      encodeFileToBase64(file).then(() => {
        setRoomImage([
          ...roomImage,
          {
            roomImageRealName: imageFileRealName,
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

    // 프리뷰 삭제
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
      <div className={open ? "openModal modal" : "modal"}>
        <div className="box-container">
          <h1>방 정보 수정</h1>
          <div className="picture-wrapper">
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
                      <img
                        src={preview}
                        alt="preview"
                        className={`img-${index}`}
                      />
                    </div>
                    <button className={`btn-${index}`} onClick={deleteImage}>
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pic-preview-wrapper"></div>
          <div className="roomTitle-wrapper">
            <p>방 제목</p>
            <input type="text"></input>
          </div>
          <div className="peopleCount-wrapper">
            <p>인원 수 조절</p>
            <input type="text"></input>
            <p>명</p>
          </div>
          <div className="roomNotice-wrapper">
            <p>방 설명 작성</p>
            <textarea></textarea>
          </div>
          <div className="button-wrapper">
            <button className="done-btn">완료</button>
            <button className="cancel-btn" onClick={close}>
              취소
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        p {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          background-color: rgba(0, 0, 0, 0.6);
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          justify-content: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .box-container {
          width: 700px;
          height: 620px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .box-container h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          margin-top: 20px;
        }

        .picture-wrapper {
          width: 80%;
          height: 100px;
          display: flex;
          align-items: center;
          margin-top: 25px;
          flex-direction: column;
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

        .picture-wrapper label {
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

        .picture-wrapper input[type="file"] {
          position: absolute;
          width: 0;
          height: 0;
          padding: 0;
          border: 0;
          overflow: hidden;
        }

        .pic-preview-wrapper {
          width: 80%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .roomTitle-wrapper {
          width: 80%;
          height: 40px;
          display: flex;
          align-items: center;
        }

        .roomTitle-wrapper input[type="text"] {
          width: 500px;
          height: 40px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          margin-left: 15px;
          padding-left: 10px;
        }

        .peopleCount-wrapper {
          width: 80%;
          height: 40px;
          margin-top: 10px;
          display: flex;
          align-items: center;
        }

        .peopleCount-wrapper input[type="text"] {
          width: 50px;
          height: 40px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          margin: 0 15px;
          text-align: center;
        }

        .roomNotice-wrapper {
          width: 80%;
          height: 160px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
        }

        .roomNotice-wrapper textarea {
          width: 570px;
          height: 130px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          background-color: #f4f4f4;
          padding: 10px;
        }

        .button-wrapper {
          width: 80%;
          height: 40px;
          margin-top: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .done-btn {
          width: 160px;
          height: 45px;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #00555f;
          margin-right: 10px;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .cancel-btn {
          width: 160px;
          height: 45px;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #d8d8d8;
          font-size: 1.5rem;
          font-weight: bold;
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

        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }

        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ModifyRoomModal;
