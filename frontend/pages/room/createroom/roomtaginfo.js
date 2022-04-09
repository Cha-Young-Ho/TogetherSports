import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postCreateRoom } from "../../../api/rooms";
import { FailResponse } from "../../../api/failResponse";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";
import SetRoomImages from "../../../components/rooms/setRoomImages";

/* 수정 필요 */
// 1. 완료 버튼 클릭 시, 새로 만들어진 방으로 이동

const RoomTagInfo = () => {
  const roomInfo = useSelector((state) => state.createRoomReducer);

  // 방 설명
  const [roomContent, setRoomContent] = useState("");

  // 방 이미지
  const [roomImages, setRoomImages] = useState([]);

  // 방 태그
  const [tag, setTag] = useState([]);
  const tagsAge = ["10대", "20대", "30대", "40대", "50대", "60대", "70대"];
  const tagsLevel = ["입문만", "초보만", "중수만", "고수만"];
  const tagsGender = ["남자만", "여자만"];

  // setRoomImages 컴포넌트에서 데이터 받기
  const getRoomImages = (roomImage) => {
    setRoomImages(roomImage);
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

  // 예외 처리 및 서버에 방 생성 요청
  const callCreateRoomRequest = (e) => {
    if (tag.length === 0) {
      e.preventDefault();
      alert("태그는 최소 1개를 선택해주세요!");
      return;
    }

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
  };

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
              value={roomContent}
              onChange={(e) => setRoomContent(e.target.value)}
            ></textarea>
          </div>

          <SetRoomImages getData={getRoomImages} />

          <div className="content-tag">
            <p>빠른 태그 추가 (최대 10개)</p>
            <div className="tags">
              <div className="tags-age">
                {tagsAge.map((age, index) => {
                  return (
                    <div className="tag" onClick={onClickTag} key={index}>
                      {age}
                    </div>
                  );
                })}
                <div className="tag-nomatter" onClick={onClickTag}>
                  연령 무관
                </div>
              </div>
              <div className="tags-level-gender">
                {tagsLevel.map((level, index) => {
                  return (
                    <div className="tag" onClick={onClickTag} key={index}>
                      {level}
                    </div>
                  );
                })}
                <div className="tag-nomatter" onClick={onClickTag}>
                  실력 무관
                </div>
                {tagsGender.map((gender, index) => {
                  return (
                    <div className="tag" onClick={onClickTag} key={index}>
                      {gender}
                    </div>
                  );
                })}
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
