import { useEffect, useRef, useState } from "react";
import { getRoomList } from "../../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import RoomModal from "../modals/roomModal";
import RoomShowingBox from "./roomShowingBox";
import { FailResponse } from "../../api/failResponse";

let scrollHandlingTimer;
let observer;
let page = 0;
const FilteredRooms = () => {
  const dispatch = useDispatch();

  const observerRef = useRef(null);

  const selectedTypeButtons = ["최신순", "임박한 시간순", "참여자순"];
  const [selectedSortType, setSelectedSortType] = useState("최신순");

  const [sort, setSort] = useState("updateTime,DESC");

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
  const [eachRoomInfo, setEachRoomInfo] = useState([]);

  const openRoomExplainModal = () => {
    setRoomExplainModalOpen(true);
  };

  const closeRoomExplainModal = () => {
    setRoomExplainModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const requestFilteringToFalse = () => {
    dispatch({
      type: "FILTERBUTTONCLICK",
      payload: {
        detection: "false",
      },
    });
  };

  const changeSortType = (name) => {
    switch (name) {
      case "최신순":
        setSort("updateTime,DESC");
        break;
      case "임박한 시간순":
        setSort("start,ASC");
        break;
      case "참여자순":
        setSort("participant,DESC");
        break;
    }
  };

  const checkException = () => {
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
  };

  const func_getRoomList = (page, first) => {
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
      roomFilteringData.requiredPeopleCount,
      page,
      12,
      sort
    )
      .then((res) => {
        if (res.status.code === 5000) {
          //방이 없을때 처리 필요
          if (res.content) {
            if (first) setEachRoomInfo(res.content.content);
            else {
              if (res.content.content.length > 0) {
                setEachRoomInfo((prev) => prev.concat(res.content.content));
              } else {
                observer.unobserve(observerRef.current);
              }
            }
          }
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status) {
          FailResponse(error.response.data.status.code, func_getRoomList);
        }
      });
  };

  // 필터 적용 후 서버로 적용(1)
  const sendDatasToServer = () => {
    func_getRoomList(0, true);

    requestFilteringToFalse();
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!scrollHandlingTimer) {
        scrollHandlingTimer = setTimeout(() => {
          scrollHandlingTimer = null;
          func_getRoomList(++page, false);
        }, 800);
      }
    });
  };

  const option = {
    threshold: 1,
  };

  useEffect(() => {
    if (observerRef) {
      observer = new IntersectionObserver(callback, option);

      observer.observe(observerRef.current);
    }

    return () => observer && observer.disconnect();
  }, [observerRef]);

  useEffect(() => {
    if (!scrollHandlingTimer) {
      scrollHandlingTimer = setTimeout(() => {
        scrollHandlingTimer = null;
        func_getRoomList(page, true);
      }, 800);
    }

    return () => {
      page = 0;
    };
  }, []);

  // 필터 버튼 눌렀을 때 실행
  useEffect(() => {
    if (changeDectection.detection === "true") {
      checkException();
      sendDatasToServer();
      page = 0;
      observer.observe(observerRef.current);
    }
  }, [changeDectection.detection]);

  // 리셋 버튼 클릭
  useEffect(() => {
    setSort("updateTime,DESC");
    setSelectedSortType("최신순");
  }, [changeDectection.reset]);

  return (
    <>
      <div className="filteredRooms-wrapper">
        <div className="centerLine">
          <div>
            {selectedTypeButtons.map((name, index) => {
              return name === selectedSortType ? (
                <button
                  key={index}
                  className="buttons clicked"
                  onClick={() => {
                    setSelectedSortType(name);
                    changeSortType(name);
                  }}
                >
                  {name}
                </button>
              ) : (
                <button
                  key={index}
                  className="buttons"
                  onClick={() => {
                    setSelectedSortType(name);
                    changeSortType(name);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div className="rooms-wrapper">
            {Array.isArray(eachRoomInfo) && eachRoomInfo.length ? (
              <div className="rooms-grid">
                {eachRoomInfo.map((datas, index) => {
                  return (
                    <RoomShowingBox
                      key={index}
                      setRoomID={setRoomID}
                      openRoomExplainModal={openRoomExplainModal}
                      datas={datas}
                    />
                  );
                })}
              </div>
            ) : (
              <img className="emptyRooms" src="/noResult.png"></img>
            )}

            <RoomModal
              open={roomExplainModalOpen}
              close={closeRoomExplainModal}
              roomId={roomID}
            ></RoomModal>
          </div>
          <div className="observe-container" ref={observerRef}></div>
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

        .emptyRooms {
          width: 100%;
          height: 100%;
        }

        .clicked {
          width: 80px;
          height: 20px;
          background-color: #6db152;
          color: white;
          border-radius: 6px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
        }

        .observe-container {
          width: 100%;
          height: 10px;
        }
      `}</style>
    </>
  );
};

export default FilteredRooms;
