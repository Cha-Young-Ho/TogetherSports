import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postCreateRoom } from "../../../api/rooms";
import { FailResponse } from "../../../api/failResponse";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";

const RoomTagInfo = () => {
  const roomInfo = useSelector((state) => state.createRoomReducer);

  // 방 설명
  const [roomContent, setRoomContent] = useState("");

  // 방 이미지
  const [image, setImage] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [roomImage, setRoomImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  // 방 태그
  const [tag, setTag] = useState([]);

  /* 수정 필요 */
  // 1. 완료 버튼 클릭 시, 새로 만들어진 방으로 이동
  // 2. 이미지 불러와서 객체배열 형태로 저장 O
  // 3. 선택된 이미지 프리뷰 뜨게 하기 및 다른 파일을 선택하면 또 다른 프리뷰 생성 O
  // 4. X 버튼 누르면 프리뷰 삭제하고 객체배열에서도 데이터 빼기
  // 5. 프리뷰 이미지를 선택하면 테두리가 초록색으로 변하고 대표사진으로 됨(대표사진에 대한 API 수정 필요) + 다른걸 누르면 그걸로 대체(중복X)

  // 예외 처리 및 서버에 방 생성 요청
  const callCreateRoomRequest = (e) => {
    if (roomContent === "") {
      e.preventDefault();
      alert("방 정보를 입력해주세요!");
    } else if (tag.length === 0) {
      e.preventDefault();
      alert("태그는 최소 1개를 선택해주세요!");
    } else {
      postCreateRoom(
        roomInfo.roomTitle,
        roomContent,
        roomInfo.roomArea,
        roomInfo.limitPeopleCount,
        roomInfo.exercise,
        tag,
        roomInfo.startAppointmentDate,
        roomInfo.endAppointmentDate,
        roomImages
      ).then((res) => {
        console.log(res.status.message);
        if (res.status.code === 5000) {
          alert("방을 성공적으로 생성하였습니다.");
        } else {
          FailResponse(res.status.code);
        }
      });
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

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const index = getExtension(file.name);
    const imageFileRealName = file.name.substring(0, index - 1);
    const imageFileExtension = file.type.split("/")[1];

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
  };

  // 태그 선택 함수
  const onClickTag = (e) => {
    if (e.target.classList[2] === "tag-clicked") {
      e.target.classList.remove("tag-clicked");
      setTag((prev) =>
        prev.filter((el) => {
          return el !== e.target.innerText;
        })
      );
    } else {
      if (tag.length > 9) {
        e.preventDefault();
        alert("태그는 최대 10개 선택 가능합니다!");
      } else {
        e.target.classList.add("tag-clicked");
        setTag((prev) => [...prev, e.target.innerText]);
      }
    }
  };

  // test
  useEffect(() => {
    //console.log(roomContent);
    //console.log(roomImage);
    //console.log(imagePreview);
    //console.log(tag);
  });

  return (
    <>
      <div className="container">
        <RoomInfoNavBar
          roomSetting_atv={"deactivation"}
          roomSchedule_atv={"deactivation"}
          roomTagInfo_atv={"activation"}
        />

        <div className="contents">
          <div className="content-info">
            <p>방에 대한 정보를 입력해주세요!</p>
            <textarea
              rows="450"
              cols="130"
              value={roomContent}
              onChange={(e) => setRoomContent(e.target.value)}
            ></textarea>
          </div>

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
                onChange={onChangeImage}
              />
            </div>

            <div className="previews">
              {imagePreview.map((preview, index) => {
                return (
                  <div className="preview" key={index}>
                    <div>
                      <img src={preview} alt="preview" />
                    </div>
                    <button>X</button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="content-tag">
            <p>빠른 태그 추가 (최대 10개)</p>
            <div className="tags">
              <div className="tags-age">
                <div className="tag" onClick={onClickTag}>
                  10대
                </div>
                <div className="tag" onClick={onClickTag}>
                  20대
                </div>
                <div className="tag" onClick={onClickTag}>
                  30대
                </div>
                <div className="tag" onClick={onClickTag}>
                  40대
                </div>
                <div className="tag" onClick={onClickTag}>
                  50대
                </div>
                <div className="tag" onClick={onClickTag}>
                  60대
                </div>
                <div className="tag" onClick={onClickTag}>
                  70대
                </div>
                <div className="tag-nomatter" onClick={onClickTag}>
                  연령 무관
                </div>
              </div>
              <div className="tags-level-gender">
                <div className="tag" onClick={onClickTag}>
                  입문만
                </div>
                <div className="tag" onClick={onClickTag}>
                  초보만
                </div>
                <div className="tag" onClick={onClickTag}>
                  중수만
                </div>
                <div className="tag" onClick={onClickTag}>
                  고수만
                </div>
                <div className="tag-nomatter" onClick={onClickTag}>
                  실력 무관
                </div>
                <div className="tag" onClick={onClickTag}>
                  남자만
                </div>
                <div className="tag" onClick={onClickTag}>
                  여자만
                </div>
                <div className="tag-nomatter" onClick={onClickTag}>
                  성별 무관
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="buttons">
          <Link href="/room/createroom/roomschedule">
            <button className="button-prev">이전</button>
          </Link>
          <Link href="/">
            <button className="button-done" onClick={callCreateRoomRequest}>
              완료
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          border-top: solid 1px #e4e8eb;
        }

        .contents {
          width: 600px;
          border-top: solid 1px #e4e8eb;
          border-bottom: solid 1px #e4e8eb;
        }

        .content-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px 0;
        }

        .content-info p {
          font-size: 1.5em;
          font-weight: bold;
        }

        .content-info textarea {
          margin-top: 20px;
          padding: 10px;
          width: 550px;
          height: 200px;
          border: none;
          border-radius: 10px;
          background-color: #f4f4f4;
          resize: none;
          font-size: 1.4em;
        }

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

        .content-tag {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px 0;
        }

        .content-tag p {
          font-size: 1.5em;
          font-weight: bold;
        }

        .tags {
          margin-top: 20px;
          width: 550px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tags-age,
        .tags-level-gender {
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        .tag {
          width: 60px;
          height: 30px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          margin: 10px 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2em;
          font-weight: bold;
          cursor: pointer;
        }

        .tag-nomatter {
          width: 70px;
          height: 30px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          margin: 10px 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2em;
          font-weight: bold;
          cursor: pointer;
        }

        .tag:hover,
        .tag-nomatter:hover {
          transition-duration: 0.5s;
          transform: scale(1.2);
          background-color: #468f5b;
          color: white;
        }

        .tag-clicked {
          color: white;
          background-color: #468f5b;
        }

        .buttons {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .button-prev {
          width: 120px;
          height: 40px;
          background-color: #d8d8d8;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-right: 10px;
        }

        .button-done {
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default RoomTagInfo;
