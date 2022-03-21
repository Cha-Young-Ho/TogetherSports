import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postCreateRoom } from "../../../api/rooms";
import { FailResponse } from "../../../api/failResponse";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";

const RoomTagInfo = () => {
  const [roomContent, setRoomContent] = useState("");
  const [tag, setTag] = useState([]);
  const roomInfo = useSelector((state) => state.createRoomReducer);

  /* 수정 필요 */
  // 1. 태그 UI 완성본에 맞게 수정
  // 2. 완료 버튼 클릭 시, 새로 만들어진 방으로 이동

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
        roomInfo.roomImages
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

  const onClickTag = (e) => {
    if (e.target.classList[2] === "tag-clicked") {
      e.target.classList.remove("tag-clicked");
      setTag((prev) =>
        prev.filter((el) => {
          return el !== e.target.innerText;
        })
      );
    } else {
      e.target.classList.add("tag-clicked");
      setTag((prev) => [...prev, e.target.innerText]);
    }
  };

  useEffect(() => {
    console.log(roomContent);
    console.log(tag);
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

          <div className="content-tag">
            <p>태그 추가</p>
            <div className="tags">
              <div className="tags-age1">
                <div className="tag" onClick={onClickTag}>
                  20대
                </div>
                <div className="tag" onClick={onClickTag}>
                  30대
                </div>
                <div className="tag" onClick={onClickTag}>
                  10대
                </div>
                <div className="tag" onClick={onClickTag}>
                  40대
                </div>
              </div>
              <div className="tags-age2">
                <div className="tag" onClick={onClickTag}>
                  50대
                </div>
                <div className="tag" onClick={onClickTag}>
                  60대
                </div>
                <div className="tag" onClick={onClickTag}>
                  70대 이상
                </div>
                <div className="tag" onClick={onClickTag}>
                  연령 무관
                </div>
              </div>
              <div className="tags-level">
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
                <div className="tag" onClick={onClickTag}>
                  실력 무관
                </div>
              </div>
              <div className="tags-gender">
                <div className="tag" onClick={onClickTag}>
                  남자만
                </div>
                <div className="tag" onClick={onClickTag}>
                  여자만
                </div>
                <div className="tag" onClick={onClickTag}>
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
          width: 450px;
          height: 130px;
          border: none;
          border-radius: 10px;
          background-color: #f4f4f4;
          resize: none;
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

        .tags-age1,
        .tags-age2,
        .tags-level,
        .tags-gender {
          display: flex;
          flex-direction: row;
        }

        .tag {
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
