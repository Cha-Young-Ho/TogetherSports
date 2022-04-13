import { useEffect, useState } from "react";

/* 수정 필요 */
// 1. 대표사진 배열 내 index 오류 / 삭제 시 같은 이미지 삭제 되는 점 / 연속으로 같은 사진은 적용안되는 점 => 오류 수정하기
// 2. order 필드 추가하기
// 3. 방 이미지를 받는 모든 곳에 order 추가하기

/* 연습장 */
// imagePreview => 순서 바뀌지 않음. thumbnailIndex의 번호가 바뀌면 roomImage 배열에 영향이 가야 함.

// roomImage 내에서 index 위치를 바꾸지말고 그대로 두고 order를 추가해서 order의 수만 바꾸면됨
// 1. 대표이미지 변경하면 해당 order를 0으로 바꾸기 (나머지 order들은 오름차순으로 바꾸게 해야함)
// 2. 삭제하는 경우에는 roomImage에 해당 order보다 큰 수가있다면 그 수들은 다 -1 해주기
// 3. 대표사진 index로 설정되게 하는거 다르게 생각해보기 -> order가 0인 걸로 바꾸기
// 위 방법은 대표사진이 바뀔 때 다른 order의 값을 제어할 수 없어서 불가능..

// roomImage에 그냥 원래대로 하고 맨 마지막에 서버에 줄때만 order = index로 붙여서 보내기
// 1. 대표사진 index로 설정되게 하는거 그렇게 하면 안되고 다른방법 생각해서 고치기
// 2. 삭제 시 같은 이미지 삭제 되는 점 / 연속으로 같은 사진은 적용안되는 점 => 오류 수정하기
// 3. roomtaginfo에서 완료버튼 누를때 index값인 order 추가해서 보내기

const SetRoomImages = (props) => {
  const [inputImageName, setInputImageName] = useState(""); // input에 표시할 이미지 이름
  const [imageSrc, setImageSrc] = useState(""); // 이미지 소스
  const [roomImage, setRoomImage] = useState([]); // 서버로 보낼 데이터
  const [imagePreview, setImagePreview] = useState([]); // 프리뷰 순서를 담을 배열
  const [thumbnailIndex, setThumbnailIndex] = useState(0); // 대표사진을 설정할 인덱스

  // 상위 컴포넌트로 이미지 전달
  useEffect(() => {
    if (props.setData) {
      setRoomImage(props.setData());
    }

    if (props.setPreview) {
      setImagePreview(props.setPreview());
    }
  }, []);

  useEffect(() => {
    if (props.getData) {
      props.getData(roomImage);
      return;
    }
  }, [roomImage]);

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
        setRoomImage([
          ...roomImage,
          {
            name: file.name, // test 위해 추가
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

  // 대표사진 변경 함수
  // !!!! 지금 문제점 !!!! => roomimage에껀 인덱스값 잘 바뀌는데 imagepreview에 인덱스가 안바뀌는게 문제가돼서 나중에 꼬이는것임
  const onChangeThumbnailImage = (e) => {
    console.log(e.target);
    const targetIndex = Number(e.target.classList[1].slice(-1)); // 변경할 대표사진의 imagePreview에서의 index => 값 잘들어옴
    const thumbnail = roomImage.splice(targetIndex, 1);
    roomImage.splice(0, 0, thumbnail[0]);

    setInputImageName((inputImageName = "")); // input 비우기
    setThumbnailIndex((thumbnailIndex = targetIndex)); // 대표사진 바꾸기
    setRoomImage(roomImage);

    // const moveValue = Math.abs(targetIndex) * -1;
    // changeArrayOrder(roomImage, targetIndex, moveValue);
  };

  // 대표사진을 위해 배열의 index 변경
  // const changeArrayOrder = (arr, targetIndex, moveValue) => {
  //   const newPositionIndex = targetIndex + moveValue; // 이동할 index
  //   if (newPositionIndex < 0 || newPositionIndex >= arr.length) return;
  //   const tempArr = JSON.parse(JSON.stringify(arr));
  //   const target = tempArr.splice(targetIndex, 1)[0];
  //   tempArr.splice(newPositionIndex, 0, target);
  //   setRoomImage((roomImage = tempArr));
  // };

  // test
  // useEffect(() => {
  //   console.log("roomimage:", roomImage);
  //   console.log("iimagepreview:", imagePreview);
  // });

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
          font-size: 1.2em;
          color: white;
          user-select: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default SetRoomImages;
