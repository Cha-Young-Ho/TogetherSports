import { useEffect, useState } from "react";
import SetRoomImages from "../rooms/setRoomImages";
import { getRoomInfo, postUpdateRoom } from "../../api/rooms";
import failResponse from "../../api/failResponse";

const ModifyRoomModal = ({ open, close, sequenceId }) => {
  // 방 제목, 설명, 인원
  const [roomTitle, setRoomTitle] = useState("");
  const [roomContent, setRoomContent] = useState("");
  const [limitPeopleCount, setLimitPeopleCount] = useState("");

  // post 하기위한 정보들
  const [roomArea, setRoomArea] = useState({});
  const [exercise, setExercise] = useState("");
  const [tag, setTag] = useState("");
  const [startAppointmentDate, setStartAppointmentDate] = useState("");
  const [endAppointmentDate, setEndAppointmentDate] = useState("");

  // 서버로 보내기 위한 방 이미지 정보(확장자, 원본주소)
  const [roomImage, setRoomImage] = useState([]);
  const getData = (imageData) => {
    setRoomImage(imageData);
  };

  const setData = () => {
    return roomImage;
  };

  // 화면에 표시되는 프리뷰 이미지
  const [imagePreview, setImagePreview] = useState([]);
  const getPreview = (previewData) => {
    setImagePreview(previewData);
  };

  const setPreview = () => {
    return imagePreview;
  };

  // 완료 버튼 클릭 시
  const clickDoneBtn = () => {
    if (roomTitle === "" || limitPeopleCount === "") {
      alert("입력이 올바르지 않은 정보가 있습니다");
      e.preventDefault();
      return;
    }

    postUpdateRoom(
      roomTitle,
      roomContent,
      roomArea,
      exercise,
      tag,
      startAppointmentDate,
      endAppointmentDate,
      roomImage
    ).then((res) => {
      if (res.status.code === 5000) {
        console.log(res.status.message);
        alert("수정되었습니다.");

        //수정 성공 후 실시간으로 방 정보 변경되어야 함
        //아마도 소켓?
        close();
      }
    });
  };

  // 제목 인풋 변경사항
  const changeTitle = (e) => {
    setRoomTitle(e.target.value);
  };

  // 인원 수 변경사항
  const changePplCnt = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setLimitPeopleCount(e.target.value);
  };

  // 방 설명 변경사항
  const changeContent = (e) => {
    setRoomContent(e.target.value);
  };

  // 방에 대한 정보 조회
  useEffect(() => {
    if (open) {
      getRoomInfo(sequenceId).then((res) => {
        if (res.status.code === 5000) {
          console.log(res.status.message);

          //초기값 받아오기
          setRoomTitle(res.content.roomTitle);
          setRoomContent(res.content.roomContent);
          setRoomArea(res.content.roomArea);
          setExercise(res.content.exercise);
          setTag(res.content.tag);
          setStartAppointmentDate(res.content.startAppointmentDate);
          setEndAppointmentDate(res.content.endAppointmentDate);
          setImagePreview(
            (imagePreview = res.content.roomImage.imageSource.map(preview))
          );
          setLimitPeopleCount(res.content.limitPeopleCount);
        } else {
          failResponse(res.status.code);
        }
      });
    }
  }, [open]);

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        <div className="box-container">
          <h1>방 정보 수정</h1>
          <div className="picture-wrapper">
            <SetRoomImages
              getData={getData}
              setPreview={setPreview}
              getPreview={getPreview}
              setData={setData}
            />
          </div>
          <div className="roomTitle-wrapper">
            <p>방 제목</p>
            <input
              type="text"
              placeholder={roomTitle}
              onChange={changeTitle}
            ></input>
          </div>
          <div className="peopleCount-wrapper">
            <p>인원 수 조절</p>
            <input
              type="text"
              placeholder={limitPeopleCount}
              onChange={changePplCnt}
            ></input>
            <p>명</p>
          </div>
          <div className="roomNotice-wrapper">
            <p>방 설명 작성</p>
            <textarea onChange={changeContent}>{roomContent}</textarea>
          </div>
          <div className="button-wrapper">
            <button className="done-btn" onClick={clickDoneBtn}>
              완료
            </button>
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
          height: 670px;
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
          height: 250px;
          display: flex;
          align-items: center;
          margin-top: 25px;
          flex-direction: column;
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
