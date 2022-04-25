import { useEffect, useState } from "react";
import { getRoomList } from "../../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import RoomModal from "../modals/roomModal";
import RoomShowingBox from "./roomShowingBox";

const FilteredRooms = () => {
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
    {
      roomId: "121",
      roomTitle: "축구 한판 뛰실분?",
      limitPeopleCount: "22",
      participantCount: "1",
      tags: ["20대만", "고수만"],
      startAppointmentDate: "2022-04-18T19:00",
      roomImagePath: "",
    },
    {
      roomId: "123",
      roomTitle: "야구 한판 뛰실분?",
      limitPeopleCount: "30",
      participantCount: "1",
      tags: ["20대만", "초보만"],
      startAppointmentDate: "2022-04-19T22:30",
      roomImagePath: "",
    },
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
      roomFilteringData.tags,
      roomFilteringData.startAppointmentDate,
      roomFilteringData.endAppointmentDate,
      roomFilteringData.containTimeClosing,
      roomFilteringData.containNoAdmittance,
      roomFilteringData.requiredPeopleCount
    ).then((res) => {
      if (res.status.code === 5000) {
        setEachRoomInfo(res.content.content);
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
        roomFilteringData.tags,
        roomFilteringData.startAppointmentDate,
        roomFilteringData.endAppointmentDate,
        roomFilteringData.containTimeClosing,
        roomFilteringData.containNoAdmittance,
        roomFilteringData.requiredPeopleCount
      ).then((res) => {
        if (res.status.code === 5000) {
          setEachRoomInfo(res.content.content);
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
            <button className="buttons">최신순</button>
            <button className="buttons">시간순</button>
            <button className="buttons">참여자순</button>
          </div>
          <div className="rooms-wrapper">
            <div className="rooms-grid">
              {eachRoomInfo.length !== 0 ? (
                eachRoomInfo.map((datas, index) => {
                  return (
                    <RoomShowingBox
                      setRoomID={setRoomID}
                      openRoomExplainModal={openRoomExplainModal}
                      datas={datas}
                    />
                  );
                })
              ) : (
                <></>
              )}
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
      `}</style>
    </>
  );
};

export default FilteredRooms;
