import { useEffect, useState } from "react";
import ModifyRoomModal from "../modals/modifyRoomModal";
import { getRoomList } from "../../api/rooms";
import { useDispatch, useSelector } from "react-redux";

const FilteredRooms = () => {
  const dispatch = useDispatch();

  const roomFilteringData = useSelector(
    (state) => state.roomFilteringDataReducer
  );

  const changeDectection = useSelector(
    (state) => state.filteringButtonClickDetectionReducer
  );
  // 방 수정 임시
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [eachRoomInfo, setEachRoomInfo] = useState([]);

  const openModifyModal = () => {
    setModifyModalOpen(true);
  };

  const closeModifyModal = () => {
    setModifyModalOpen(false);
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
        <div>
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
                    <div key={index} className="room-container">
                      <div className="thumbnailLine">
                        <div className="tags">태그</div>
                        <div className="participants">
                          <p>3/10</p>
                        </div>
                      </div>
                      <div className="bodyLine">
                        <h1>타이틀</h1>
                        <p>yyyy-mm-dd x요일 hh:mm 모임</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
          display: flex;
          flex-direction: column;
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
        }

        .room-container {
          width: 250px;
          height: 250px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        .thumbnailLine {
          width: 100%;
          height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #53927d;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .tags {
          font-size: 1.5rem;
          margin: 10px;
        }

        .participants {
          margin: 10px;
          text-align: right;
        }

        .participants p {
          color: #fff;
          font-size: 1.5rem;
        }

        .bodyLine {
          width: 100%;
          height: 80px;
          display: flex;
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
