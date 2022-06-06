import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { postCreateRoom } from "../../../api/rooms";
import { FailResponse } from "../../../api/failResponse";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";
import SetRoomImages from "../../../components/rooms/setRoomImages";
import Head from "next/head";

const RoomTagInfo = () => {
  const roomInfo = useSelector((state) => state.createRoomReducer);

  // 방 설명
  const [roomContent, setRoomContent] = useState("");

  // 방 이미지
  const [roomImages, setRoomImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // 방 태그
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

  // setRoomImages 컴포넌트에서 데이터(이미지 배열) 받기
  const getRoomImages = (roomImage) => {
    setRoomImages(roomImage);
  };

  // setRoomImages 컴포넌트에서 데이터(대표사진 인덱스) 받기
  const getThumbnailIndex = (index) => {
    setThumbnailIndex(index);
  };

  // 이미지 배열에 order 추가하기
  const addOrder = (arr, index) => {
    const thumbnail = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr[i].order = 0;
        thumbnail.push(arr[i]);
        arr.splice(i, 1);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i].order = i + 1;
    }

    return setRoomImages((roomImages = thumbnail.concat(arr)));
  };

  // 태그 선택 함수
  const onClickTag = (e) => {
    if (e.target.classList[2] === "tag-clicked") {
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

  // 예외 처리 및 서버에 방 생성 요청
  const createRoom = (e) => {
    if (roomImages === []) setRoomImages(null);
    else addOrder(roomImages, thumbnailIndex);

    // 필수입력정보들이 입력되지 않으면
    if (
      roomInfo.roomTitle === "" ||
      roomInfo.roomArea === "" ||
      roomInfo.limitPeopleCount === "" ||
      roomInfo.exercise === "" ||
      roomInfo.startAppointmentDate === "" ||
      roomInfo.endAppointmentDate === ""
    ) {
      e.preventDefault();
      alert("입력되지 않은 정보가 있습니다.");
      return;
    }

    if (roomContent === "") setRoomContent(null);
    if (tags.length === 0) {
      e.preventDefault();
      alert("태그를 입력해주세요.");
      return;
    }

    postCreateRoom(
      roomInfo.roomTitle,
      roomContent,
      roomInfo.roomArea,
      roomInfo.limitPeopleCount,
      roomInfo.exercise,
      tags,
      roomInfo.startAppointmentDate,
      roomInfo.endAppointmentDate,
      roomImages
    )
      .then((res) => {
        if (res.status.code === 5000) {
          alert("방을 성공적으로 생성하였습니다!");
        }
      })
      .catch((error) => {
        FailResponse(error.response.data.status.code);
        return;
      });
  };

  return (
    <>
      <Head>
        <title>운동 방 생성하기</title>
      </Head>
      <div className="container">
        <RoomInfoNavBar
          roomSetting_atv={"deactivation"}
          roomSchedule_atv={"deactivation"}
          roomTagInfo_atv={"activation"}
        />

        <div>
          <div className="contents-info">
            <p>방의 추가적인 정보를 입력해주세요 !</p>
          </div>

          <div className="content-info">
            <p>방을 자유롭게 소개해보세요 😁</p>
            <textarea
              value={roomContent}
              onChange={(e) => setRoomContent(e.target.value)}
            ></textarea>
          </div>

          <div className="line"></div>

          <SetRoomImages
            getImageData={getRoomImages}
            getThumbnailData={getThumbnailIndex}
          />

          <div className="content-tag">
            <p>빠른 태그 추가 (최대 5개)</p>
            <div className="tags">
              <div className="tags-age">
                {tagsAge.map((age, index) => {
                  return (
                    <div className="tag" onClick={onClickTag} key={index}>
                      {age}
                    </div>
                  );
                })}
              </div>

              <div className="tags-level-gender">
                {tagsLevel.map((level, index) => {
                  return (
                    <div className="tag" onClick={onClickTag} key={index}>
                      {level}
                    </div>
                  );
                })}

                {tagsGender.map((gender, index) => {
                  return (
                    <div className="tag" onClick={onClickTag} key={index}>
                      {gender}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="button-wrapper">
          <Link href="/room/createroom/roomschedule">
            <button className="button-prev">이전</button>
          </Link>
          <Link href="/">
            <button className="button-done" onClick={createRoom}>
              완료
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        textarea:focus {
          outline: none;
        }

        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          border-top: solid 1px #e4e8eb;
        }

        .contents-info {
          width: 600px;
          border-top: solid 1px #e4e8eb;
          border-bottom: solid 1px #e4e8eb;
        }

        .contents-info p {
          margin: 5px 0;
          text-align: center;
          font-size: 1.5rem;
        }

        .content-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px 0;
        }

        .content-info p {
          font-size: 1.5rem;
        }

        .content-info textarea {
          margin-top: 20px;
          padding: 10px;
          width: 100%;
          height: 200px;
          border: none;
          border-radius: 10px;
          background-color: #f4f4f4;
          resize: none;
          font-size: 1.4rem;
        }

        .line {
          width: 100%;
          border-top: 1px solid #e4e8eb;
          border-bottom: none;
          margin-bottom: 40px;
        }

        .content-tag {
          display: flex;
          flex-direction: column;
          justify-content: left;
          margin: 30px 0;
        }

        .content-tag p {
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
