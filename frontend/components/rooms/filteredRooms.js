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

  // 첫 화면 렌더 시 아무런 필터 없이 요청
  useEffect(() => {
    getRoomList(
      roomFilteringData.creatorNickname,
      roomFilteringData.roomTitle,
      roomFilteringData.roomContent,
      roomFilteringData.area,
      roomFilteringData.exercise,
      roomFilteringData.tag,
      roomFilteringData.startAppointmentDate,
      roomFilteringData.endAppointmentDate
    ).then((res) => {
      if (res.status.code === 5000) {
        setEachRoomInfo(res.content.rooms);
      }
    });
  }, []);

  useEffect(() => {
    if (changeDectection.det === "true") {
      // 그 정보를 토대로 필터를 서버에게 전송
      getRoomList(
        roomFilteringData.creatorNickname,
        roomFilteringData.roomTitle,
        roomFilteringData.roomContent,
        roomFilteringData.area,
        roomFilteringData.exercise,
        roomFilteringData.tag,
        roomFilteringData.startAppointmentDate,
        roomFilteringData.endAppointmentDate
      ).then((res) => {
        if (res.status.code === 5000) {
          setEachRoomInfo(res.content.rooms);
        }
      });

      dispatch({
        type: "FILTERBUTTONCLICK",
        payload: {
          det: "false",
        },
      });
    }
  }, [changeDectection.det]);

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
