import { useEffect, useState } from "react";
import { getRoomList } from "../../api/rooms";
import { useDispatch, useSelector } from "react-redux";
import RoomModal from "../modals/roomModal";
import RoomShowingBox from "./roomShowingBox";
import FailResponse from "../../api/failResponse";
import Loading from "../loading";

let scrollHandlingTimer;
const FilteredRooms = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const selectedTypeButtons = ["최신순", "임박한 시간순", "참여자순"];
  const [selectedSortType, setSelectedSortType] = useState("최신순");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [sort, setSort] = useState("updateTime,DESC");

  // 스크롤 위치값
  const [scrollY, setScrollY] = useState(0);
  const handleFollowScroll = () => setScrollY(window.pageYOffset);

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
      roomTitle: "가가가가가가가가가가가가가가가가가가가가",
      limitPeopleCount: "22",
      participantCount: "1",
      tags: ["20대만", "고수만", "20대만", "고수만", "20대입니다다다다"],
      startAppointmentDate: "2022-04-18T19:00",
      roomImagePath: "",
    },
    // {
    //   roomId: "123",
    //   roomTitle: "야구 한판 뛰실분?",
    //   limitPeopleCount: "30",
    //   participantCount: "1",
    //   tags: ["20대만", "초보만"],
    //   startAppointmentDate: "2022-04-19T22:30",
    //   roomImagePath: "",
    // },
    // {
    //   roomId: "121",
    //   roomTitle: "축구 한판 뛰실분?",
    //   limitPeopleCount: "22",
    //   participantCount: "1",
    //   tags: ["20대만", "고수만"],
    //   startAppointmentDate: "2022-04-18T19:00",
    //   roomImagePath: "",
    // },
    // {
    //   roomId: "123",
    //   roomTitle: "야구 한판 뛰실분?",
    //   limitPeopleCount: "30",
    //   participantCount: "1",
    //   tags: ["20대만", "초보만"],
    //   startAppointmentDate: "2022-04-19T22:30",
    //   roomImagePath: "",
    // },
    // {
    //   roomId: "121",
    //   roomTitle: "축구 한판 뛰실분?",
    //   limitPeopleCount: "22",
    //   participantCount: "1",
    //   tags: ["20대만", "고수만"],
    //   startAppointmentDate: "2022-04-18T19:00",
    //   roomImagePath: "",
    // },
    // {
    //   roomId: "123",
    //   roomTitle: "야구 한판 뛰실분?",
    //   limitPeopleCount: "30",
    //   participantCount: "1",
    //   tags: ["20대만", "초보만"],
    //   startAppointmentDate: "2022-04-19T22:30",
    //   roomImagePath: "",
    // },
  ]);

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
        setSort("start,DESC");
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

  const func_getRoomList = (page, size, first, nextPage) => {
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
      size,
      sort
    )
      .then((res) => {
        if (res.status.code === 5000) {
          setLoading(false);
          //방이 없을때 처리 필요
          if (res.content) {
            if (first) setEachRoomInfo(res.content.content);
            else {
              if (res.content.content.length) {
                setEachRoomInfo((prev) => prev.concat(res.content.content));
              }
            }
            setPage(nextPage);
          }
          setLoading(true);
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code, func_getRoomList);
        }
      });
  };

  // 필터 적용 후 서버로 적용(1)
  const sendDatasToServer = () => {
    func_getRoomList(0, 12, false, 1);

    requestFilteringToFalse();
  };

  // 첫 화면 렌더 시 아무런 필터 없이 요청
  useEffect(() => {
    if (!scrollHandlingTimer) {
      scrollHandlingTimer = setTimeout(() => {
        scrollHandlingTimer = null;
        func_getRoomList(page, size, true, 1);
      }, 500);
    }

    window.addEventListener("scroll", handleFollowScroll);
    document.body.style.overflow = "unset";
    return () => {
      window.removeEventListener("scroll", handleFollowScroll);
    };
  }, []);

  // 필터 버튼 눌렀을 때 실행
  useEffect(() => {
    if (changeDectection.detection === "true") {
      checkException();
      sendDatasToServer();
      saveDatasToLS();
    }
  }, [changeDectection.detection]);

  // 리셋 버튼 클릭
  useEffect(() => {
    setPage(0);
    setSize(12);
    setSort("updateTime,DESC");
    setSelectedSortType("최신순");
  }, [changeDectection.reset]);

  // 사용성 개선을 위한 로컬스토리지 저장
  const saveDatasToLS = () => {
    const obj = JSON.stringify({
      selectedArea: roomFilteringData.area,
      startDate: roomFilteringData.startDate,
      endDate: roomFilteringData.endDate,
      startTime: roomFilteringData.startTime,
      endTime: roomFilteringData.endTime,
      containNoAdmittance: roomFilteringData.containNoAdmittance,
      containTimeClosing: roomFilteringData.containTimeClosing,
      requiredPeopleCount: roomFilteringData.requiredPeopleCount,
      exercise: roomFilteringData.exercise,
    });

    localStorage.setItem("Filters", obj);
  };

  // 화면 맨 아래 도착 시
  useEffect(() => {
    const windowHeight = window.innerHeight; // 스크린 창크기
    const fullHeight = document.body.scrollHeight + 80; //  margin 값 80추가

    if (scrollY + windowHeight >= fullHeight - 100) {
      if (!scrollHandlingTimer) {
        scrollHandlingTimer = setTimeout(() => {
          scrollHandlingTimer = null;
          func_getRoomList(page, 12, false, page + 1);
        }, 800);
      }
    }
  }, [scrollY]);

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
            {eachRoomInfo.length !== 0 ? (
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
          {!loading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            ""
          )}
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

        .loading-container {
          width: 100%;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default FilteredRooms;
