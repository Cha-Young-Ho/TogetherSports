import { useEffect, useState } from "react";
import SetRoomImages from "../rooms/setRoomImages";
import { putUpdateRoom } from "../../api/rooms";
import { FailResponse } from "../../api/failResponse";
import { useSelector } from "react-redux";
import Head from "next/head";

const ModifyRoomModal = (props) => {
  const roomId = props.roomId;

  const [changeRoomTitle, setChangeRoomTitle] = useState("");
  const roomTitle = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomTitle
  );

  const [changeLimitPeopleCount, setChangeLimitPeopleCount] = useState(0);
  const limitPeopleCount = useSelector(
    (state) => state.roomRealTimeInfoReducer.limitPeopleCount
  );

  const [changeRoomContent, setChangeRoomContent] = useState("");
  const roomContent = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomContent
  );

  const roomArea = useSelector(
    (state) => state.roomRealTimeInfoReducer.roomArea
  );
  const exercise = useSelector(
    (state) => state.roomRealTimeInfoReducer.exercise
  );
  const startAppointmentDate = useSelector(
    (state) => state.roomRealTimeInfoReducer.startAppointmentDate
  );
  const endAppointmentDate = useSelector(
    (state) => state.roomRealTimeInfoReducer.endAppointmentDate
  );

  /////////////////// 태그 관련 ///////////////////

  const getTagsFromRedux = useSelector(
    (state) => state.roomRealTimeInfoReducer.tags
  );

  const [tags, setTags] = useState([]);
  const tagsAge = [
    "10대",
    "20대",
    "30대",
    "40대",
    "50대",
    "60대",
    "70대",
    "연령 무관",
  ];
  const tagsLevel = ["입문만", "초보만", "중수만", "고수만", "실력 무관"];
  const tagsGender = ["남자만", "여자만", "성별 무관"];

  // 태그 선택시
  const onClickTag = (e) => {
    if (e.target.classList[3] === "tag-clicked") {
      e.target.classList.remove("tag-clicked");
      setTags((prev) =>
        prev.filter((el) => {
          return el !== e.target.innerText;
        })
      );
    } else {
      if (tags.length > 4) {
        e.preventDefault();
        alert("태그는 최대 5개 선택 가능합니다!");
      } else {
        e.target.classList.add("tag-clicked");
        setTags((prev) => [...prev, e.target.innerText]);
      }
    }
  };

  // 이미 설정된 태그들에 대해 선택처리
  const setPrevTags = (tagName) => {
    let index = 0;

    if (tagsAge.some((tag) => tag === tagName)) {
      index = tagsAge.indexOf(tagName);
      const tagAge = document.getElementsByClassName("tag-age");
      tagAge[index].classList.add("tag-clicked");
    }
    if (tagsLevel.some((tag) => tag === tagName)) {
      index = tagsLevel.indexOf(tagName);
      const tagLevel = document.getElementsByClassName("tag-level");
      tagLevel[index].classList.add("tag-clicked");
    }
    if (tagsGender.some((tag) => tag === tagName)) {
      index = tagsGender.indexOf(tagName);
      const tagGender = document.getElementsByClassName("tag-gender");
      tagGender[index].classList.add("tag-clicked");
    }
  };

  /////////////////// 이미지 관련 ///////////////////

  const [roomImages, setRoomImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // setRoomImages 컴포넌트로부터 받는 데이터들
  const getImageData = (imageData) => setRoomImages(imageData);
  const getThumbnailIndex = (index) => setThumbnailIndex(index);

  const addOrder = (arr, index) => {
    const thumbnail = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr[i].order = 0;
        thumbnail.push(arr[i]);
        arr.splice(i, 1);
      }
    }

    for (let i = 0; i < arr.length; i++) arr[i].order = i + 1;

    return setRoomImages((roomImages = thumbnail.concat(arr)));
  };

  // 방 수정 요청 함수
  const updateRoomFunc = () => {
    putUpdateRoom(
      roomId,
      changeRoomTitle,
      changeRoomContent,
      roomArea,
      changeLimitPeopleCount,
      exercise,
      tags,
      startAppointmentDate,
      endAppointmentDate,
      roomImages
    )
      .then((res) => {
        if (res.status.code === 5000) {
          alert("방을 성공적으로 수정하였습니다 !");
          props.close();
        }
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code, updateRoomFunc);
        return;
      });
  };

  // 수정 완료시
  const clickDoneBtn = (e) => {
    roomImages.length === 0
      ? setRoomImages(null)
      : addOrder(roomImages, thumbnailIndex);

    if (changeRoomTitle === "") {
      alert("제목을 입력해주세요!");
      e.preventDefault();
      return;
    }

    if (changeLimitPeopleCount < 2) {
      alert("최소 인원은 2명 이상이어야 합니다!");
      e.preventDefault();
      return;
    }

    if (changeRoomContent === "") setRoomContent(null);
    if (tags.length === 0) setTags(null);

    updateRoomFunc();
  };

  useEffect(() => {
    tags.map((tag) => setPrevTags(tag));
  }, [tags]);

  useEffect(() => {
    if (props.open) {
      setTags([...getTagsFromRedux]);

      document.body.style.overflow = "hidden";
    }

    if (props.open && roomTitle)
      setChangeRoomTitle((changeRoomTitle = roomTitle));

    if (props.open && roomContent)
      setChangeRoomContent((changeRoomContent = roomContent));

    if (props.open && limitPeopleCount)
      setChangeLimitPeopleCount((changeLimitPeopleCount = limitPeopleCount));
  }, [props.open]);

  return (
    <>
      <div
        className={props.open ? "openModal modal" : "modal"}
        onClick={(e) => {
          if (e.target.classList[1] === "openModal") props.close();
        }}
      >
        {props.open ? (
          <>
            <Head>
              <title>운동 방 수정하기</title>
            </Head>
            <div className="box-container">
              <h1>방 정보 수정</h1>

              <div className="contents-wrapper">
                <div className="roomTitle-wrapper">
                  <p>방 제목</p>
                  <input
                    type="text"
                    minLength="1"
                    maxLength="20"
                    placeholder={roomTitle}
                    onChange={(e) => setChangeRoomTitle(e.target.value)}
                  ></input>
                </div>

                <div className="peopleCount-wrapper">
                  <p>인원 수 조절</p>
                  <input
                    type="number"
                    min="2"
                    placeholder={limitPeopleCount}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      setChangeLimitPeopleCount(e.target.value);
                    }}
                  ></input>
                  <p>명</p>
                  <p className="notice">
                    * 현재 참여 인원보다 많은 인원만 입력 가능합니다.
                  </p>
                </div>

                <div className="roomNotice-wrapper">
                  <p>방 설명 작성</p>
                  <textarea
                    onChange={(e) => setChangeRoomContent(e.target.value)}
                    defaultValue={roomContent}
                  ></textarea>
                </div>

                <div className="picture-wrapper">
                  <SetRoomImages
                    getImageData={getImageData}
                    getThumbnailData={getThumbnailIndex}
                    path={"modifyRoom"}
                    roomId={roomId}
                  />
                </div>

                <div className="tag-wrapper">
                  <p>빠른 태그 추가 (최대 5개)</p>
                  <div className="tags">
                    <div className="tags-age">
                      {tagsAge.map((age, index) => {
                        return (
                          <div
                            className="tag tag-age"
                            onClick={onClickTag}
                            key={index}
                          >
                            {age}
                          </div>
                        );
                      })}
                    </div>

                    <div className="tags-level-gender">
                      {tagsLevel.map((level, index) => {
                        return (
                          <div
                            className="tag tag-level"
                            onClick={onClickTag}
                            key={index}
                          >
                            {level}
                          </div>
                        );
                      })}

                      {tagsGender.map((gender, index) => {
                        return (
                          <div
                            className="tag tag-gender"
                            onClick={onClickTag}
                            key={index}
                          >
                            {gender}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-wrapper">
                <button className="cancel-btn" onClick={props.close}>
                  수정 취소
                </button>
                <button className="done-btn" onClick={(e) => clickDoneBtn(e)}>
                  완료
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <style jsx>{`
        p {
          font-size: 1.5rem;
          font-weight: bold;
        }

        input:focus,
        textarea:focus {
          outline: none;
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
          animation: modal-bg-show 0.3s; // 스르륵 효과
        }

        .box-container {
          min-width: 720px;
          width: 50%;
          height: 85%;
          padding: 40px 50px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contents-wrapper {
          width: 100%;
          /* height: 100%; */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          overflow: auto;
        }

        /* 스크롤에 대한 부분 */
        .contents-wrapper::-webkit-scrollbar {
          width: 15px;
        }

        .contents-wrapper::-webkit-scrollbar-track {
          width: 9px;
          border-radius: 4px;
          background-color: #f5f5f5;
          background-clip: padding-box;
          border: 5px solid transparent;
        }

        .contents-wrapper::-webkit-scrollbar-thumb {
          width: 15px;
          height: 26px;
          border-radius: 4px;
          border: solid 1px #e5e5e5;
          background-color: white;
        }

        h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          font-size: 2rem;
          font-weight: bold;
        }

        .roomTitle-wrapper {
          width: 95%;
          margin-bottom: 20px;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .roomTitle-wrapper > p {
          margin-right: 5px;
        }

        .roomTitle-wrapper input[type="text"] {
          width: 90%;
          height: 30px;
          border: none;
          padding: 0 5px;
        }

        .peopleCount-wrapper {
          width: 95%;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .peopleCount-wrapper input[type="number"] {
          width: 50px;
          height: 35px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: white;
          margin: 0 15px;
          text-align: center;
        }

        .notice {
          margin-left: 10px;
          font-size: 1.2rem;
          color: #b5b5b5;
          font-weight: normal;
        }

        .roomNotice-wrapper {
          width: 95%;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .roomNotice-wrapper textarea {
          width: 100%;
          height: 150px;
          margin-top: 10px;
          border-radius: 10px;
          border: none;
          background-color: #f4f4f4;
          padding: 10px;
          resize: none;
        }

        .picture-wrapper {
          width: 95%;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .tag-wrapper {
          width: 95%;
          display: flex;
          flex-direction: column;
          justify-content: left;
        }

        .tag-wrapper p {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .tags {
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tags-age,
        .tags-level-gender {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .tag {
          padding: 0 10px;
          height: 30px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          margin: 10px 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
        }

        .tag:hover {
          transition-duration: 0.5s;
          transform: scale(1.2);
          background-color: #468f5b;
          color: white;
        }

        .tag-clicked {
          color: white;
          background-color: #468f5b;
        }

        .button-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
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
          margin-right: 10px;
          color: white;
          letter-spacing: 1px;
        }

        .done-btn {
          width: 160px;
          height: 45px;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #00555f;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 1px;
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
