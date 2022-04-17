import { useEffect, useState } from "react";
import ModifyRoomModal from "../modals/modifyRoomModal";
import { getRoomList } from "../../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import RoomModal from "../modals/roomModal";

const FilteredRooms = () => {
  // 방 수정 임시
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const openModifyModal = () => {
    setModifyModalOpen(true);
  };

  const closeModifyModal = () => {
    setModifyModalOpen(false);
  };

  const dispatch = useDispatch();

  const roomFilteringData = useSelector(
    (state) => state.roomFilteringDataReducer
  );

  const changeDectection = useSelector(
    (state) => state.filteringButtonClickDetectionReducer
  );

  // 방 설명 페이지 모달
  const [roomExplainModalOpen, setRoomExplainModalOpen] = useState(false);
  const [roomID, setRoomID] = useState();

  // 현재 임시 데이터
  const [eachRoomInfo, setEachRoomInfo] = useState([
    // {
    //   roomId: "121",
    //   roomTitle: "축구 한판 뛰실분?",
    //   limitPeopleCount: "22",
    //   paricipantCount: "1",
    //   tag: ["20대만", "고수만"],
    //   startAppointmentDate: "2022-04-18T19:00",
    //   roomImagePath: "",
    // },
    // {
    //   roomId: "123",
    //   roomTitle: "야구 한판 뛰실분?",
    //   limitPeopleCount: "30",
    //   paricipantCount: "1",
    //   tag: ["20대만", "초보만"],
    //   startAppointmentDate: "2022-04-19T22:30",
    //   roomImagePath: "",
    // },
  ]);

  const openRoomExplainModal = () => {
    setRoomExplainModalOpen(true);
  };

  const closeRoomExplainModal = () => {
    setRoomExplainModalOpen(false);
  };

  const requestFilteringToFalse = () => {
    dispatch({
      type: "FILTERBUTTONCLICK",
      payload: {
        detection: "false",
      },
    });
  };

  // 첫 화면 렌더 시 아무런 필터 없이 요청
  useEffect(() => {
    getRoomList(
      roomFilteringData.roomTitle,
      roomFilteringData.roomContent,
      roomFilteringData.area,
      roomFilteringData.exercise,
      roomFilteringData.tag,
      roomFilteringData.startAppointmentDate,
      roomFilteringData.endAppointmentDate,
      roomFilteringData.containTimeClosing,
      roomFilteringData.containNoAdmittance,
      roomFilteringData.requiredPeopleCount
    ).then((res) => {
      if (res.status.code === 5000) {
        setEachRoomInfo(res.content.rooms);
      }
    });
  }, []);

  useEffect(() => {
    if (changeDectection.detection === "true") {
      /* 시간 예외처리 수정 필요합니다.
      1. startdate나 enddate가 비었을때 각 time은 빌 수 없음
      2. date가 있을때 각 time이 비었다면 00:00시와 23:59로보냄 */
      if (
        roomFilteringData.startDate === "" &&
        roomFilteringData.startTime !== ""
      ) {
        alert("시간을 입력 시 날짜도 입력하여야 합니다.");
        requestFilteringToFalse();
        return;
      } else if (
        roomFilteringData.endDate === "" &&
        roomFilteringData.endTime !== ""
      ) {
        alert("시간을 입력 시 날짜도 입력하여야 합니다.");
        requestFilteringToFalse();
        return;
      }

      // 시작일자는 있고, 마감일자는 없을때
      if (
        roomFilteringData.startDate !== "" &&
        roomFilteringData.endDate === ""
      ) {
        roomFilteringData.startAppointmentDate =
          roomFilteringData.startDate +
          (roomFilteringData.startTime === ""
            ? "T00:00"
            : "T" + String(roomFilteringData.startTime).padStart(2, 0) + ":00");
      } else if (
        roomFilteringData.startDate === "" &&
        roomFilteringData.endDate !== ""
      ) {
        roomFilteringData.endAppointmentDate =
          roomFilteringData.endDate +
          (roomFilteringData.endTime === ""
            ? "T00:00"
            : "T" + String(roomFilteringData.endTime).padStart(2, 0) + ":00");
      } else if (
        roomFilteringData.startDate !== "" &&
        roomFilteringData.endDate !== ""
      ) {
        roomFilteringData.startAppointmentDate =
          roomFilteringData.startDate +
          "T" +
          String(roomFilteringData.startTime).padStart(2, 0) +
          ":00";
        roomFilteringData.endAppointmentDate =
          roomFilteringData.endDate +
          "T" +
          String(roomFilteringData.endTime).padStart(2, 0) +
          ":00";
      }

      // 그 정보를 토대로 필터를 서버에게 전송
      getRoomList(
        roomFilteringData.roomTitle,
        roomFilteringData.roomContent,
        roomFilteringData.area,
        roomFilteringData.exercise,
        roomFilteringData.tag,
        roomFilteringData.startAppointmentDate,
        roomFilteringData.endAppointmentDate,
        roomFilteringData.containTimeClosing,
        roomFilteringData.containNoAdmittance,
        roomFilteringData.requiredPeopleCount
      ).then((res) => {
        if (res.status.code === 5000) {
          setEachRoomInfo(res.content.rooms);
        }
      });

      requestFilteringToFalse();
    }
  }, [changeDectection.detection]);

  return (
    <>
      <div className="filteredRooms-wrapper">
        <div className="centerLine">
          <div>
            <button className="buttons" onClick={openModifyModal}>
              최신순
            </button>
            <button className="buttons">시간순</button>
            <button className="buttons">참여자순</button>
            <ModifyRoomModal
              open={modifyModalOpen}
              close={closeModifyModal}
              sequenceId={"test"}
            ></ModifyRoomModal>
          </div>
          <div className="rooms-wrapper">
            <div className="rooms-grid">
              {eachRoomInfo.map((datas, index) => {
                return (
                  <div
                    key={index}
                    className="room-container"
                    onClick={() => {
                      setRoomID(datas.roomId);
                      openRoomExplainModal();
                    }}
                  >
                    <div className="thumbs-box">
                      <img
                        src={
                          datas.roomImagePath === ""
                            ? "/base_profileImage.jpg"
                            : `localhost:8080/${datas.roomImagePath}`
                        }
                      ></img>
                      <div className="tags">
                        {datas.tag.map((tag, index) => {
                          return <p key={index}>{tag}</p>;
                        })}
                      </div>
                      <div className="participants">
                        <p>{`${datas.paricipantCount} / ${datas.limitPeopleCount}`}</p>
                      </div>
                    </div>
                    <div className="bodyLine">
                      <h1>{`${datas.roomTitle}`}</h1>
                      <p>
                        {`${datas.startAppointmentDate.slice(
                          0,
                          10
                        )} x요일 ${datas.startAppointmentDate.slice(11)} 모임`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <RoomModal
              open={roomExplainModalOpen}
              close={closeRoomExplainModal}
              roomID={roomID}
            ></RoomModal>
          </div>
        </div>
      </div>
      <style jsx>{`
        .filteredRooms-wrapper {
          width: 100%;
          max-width: 1920px;
          margin-bottom: 30px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
        }

        .centerLine {
          width: 1200px;
          height: 100%;
          padding-top: 15px;
        }

        .buttons {
          width: 80px;
          height: 20px;
          border-radius: 6px;
          background-color: #fff;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          border: solid 0.5px #d8d8d8;
          border: none;
          margin-right: 10px;
          cursor: pointer;
        }

        .rooms-wrapper {
          width: 100%;
          margin-top: 20px;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(4, 300px);
          grid-template-rows: auto;
          place-items: center;
          row-gap: 30px;
          margin-bottom: 100px;
        }

        .room-container {
          width: 250px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .thumbs-box {
          width: 100%;
          height: 170px;
          background-color: #53927d;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .thumbs-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tags {
          position: relative;
          bottom: 170px;
          margin: 10px;
          display: flex;
        }

        .tags p {
          margin-left: 10px;
          padding: 5px;
          border: solid 1px #f0376f;
          color: #f0376f;
          font-size: 0.9rem;
          border-radius: 24px;
          background-color: rgba(0, 0, 0, 0.7);
        }

        .participants {
          position: relative;
          bottom: 90px;
          margin: 10px;
          display: flex;
          justify-content: right;
        }

        .participants p {
          color: white;
          font-size: 1rem;
          border: solid 0.5px white;
          border-radius: 24px;
          background-color: rgba(0, 0, 0, 0.7);
          padding: 5px;
        }

        .bodyLine {
          width: 100%;
          height: 80px;
          display: flex;
          border-top: solid 0.5px #d8d8d8;
          flex-direction: column;
          justify-content: space-between;
        }

        .bodyLine h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 10px;
        }

        .bodyLine p {
          font-weight: 300;
          margin: 10px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default FilteredRooms;
