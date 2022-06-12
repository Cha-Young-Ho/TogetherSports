import { useEffect, useState } from "react";
import CalendarModal from "../modals/calendarModal";
import SelectExercise from "./selectExercise";
import AddAreaModal from "../modals/addAreaModal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Filter = () => {
  const dispatch = useDispatch();
  const addAreaClickDetection = useSelector(
    (state) => state.filteringButtonClickDetectionReducer
  );
  const roomFilteringDatas = useSelector(
    (state) => state.roomFilteringDataReducer
  );

  // 모달 관리 state
  const [startCalendarModalOpen, setStartCalendarModalOpen] = useState(false);
  const [endCalendarModalOpen, setEndCalendarModalOpen] = useState(false);
  const [areaModalOpen, setAreaModalOpen] = useState(false);

  // ~방 보기 checkbox
  const [containTimeClosing, setContainTimeClosing] = useState(false);
  const [containNoAdmittance, setContainNoAdmittance] = useState(false);

  // 지역
  const [curSelectedAreas, setSelectedAreas] = useState([]);

  // 시기
  const [curStartFilteringDate, setCurStartFilteringDate] = useState("");
  const [curEndFilteringDate, setCurEndFilteringDate] = useState("");
  // 시간
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // 입장가능인원
  const [enterAccessPeople, setEnterAccessPeople] = useState("");

  const openStartCalendarModal = () => {
    setStartCalendarModalOpen(true);
  };
  const closeStartCalendarModal = () => {
    setStartCalendarModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const openEndCalendarModal = () => {
    setEndCalendarModalOpen(true);
  };
  const closeEndCalendarModal = () => {
    setEndCalendarModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const openAreaModal = () => {
    setAreaModalOpen(true);
  };
  const closeAreaModal = () => {
    setAreaModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // calendarModal의 시기 받아오기 위한 함수
  const setStartFilterDate = (date) => {
    if (
      (curEndFilteringDate !== "") &
      !moment(
        date.length === 9 ? date.slice(0, 8) + "0" + date[8] : date
      ).isSameOrBefore(curEndFilteringDate)
    ) {
      alert("현재 시작일이 마감일보다 느립니다. 다시 선택해 주세요.");
      return;
    }

    setCurStartFilteringDate(
      (curStartFilteringDate =
        date.length === 9 ? date.slice(0, 8) + "0" + date[8] : date)
    );

    dispatch({
      type: "SETSTARTDATE",
      payload: {
        startDate: curStartFilteringDate,
      },
    });
    return;
  };

  const setEndFilterDate = (date) => {
    if (
      (curStartFilteringDate !== "") &
      !moment(curStartFilteringDate).isSameOrBefore(
        date.length === 9 ? date.slice(0, 8) + "0" + date[8] : date
      )
    ) {
      alert("현재 마감일이 시작일보다 빠릅니다. 다시 선택해 주세요.");
      return;
    }

    setCurEndFilteringDate(
      (curStartFilteringDate =
        date.length === 9 ? date.slice(0, 8) + "0" + date[8] : date)
    );

    dispatch({
      type: "SETENDDATE",
      payload: {
        endDate: curEndFilteringDate,
      },
    });
    return;
  };

  const clickDoFilteringButton = () => {
    if (
      moment(curStartFilteringDate).isSame(curEndFilteringDate) &&
      startTime > endTime
    ) {
      alert("시간을 다시 확인해 주세요.");
      return;
    }

    if (startTime > 23 || endTime > 23) {
      alert("0-23의 시간만 입력할 수 있습니다.");
      return;
    }

    dispatch({
      type: "FILTERBUTTONCLICK",
      payload: {
        detection: "true",
      },
    });
  };

  const clickResetFilterButton = () => {
    setStartTime("");
    setEndTime("");
    setEnterAccessPeople("");
    setCurStartFilteringDate("");
    setCurEndFilteringDate("");
    setContainTimeClosing(false);
    setContainNoAdmittance(false);
    setSelectedAreas([]);

    dispatch({
      type: "RESETALLDATAS",
    });

    dispatch({
      type: "RESETBUTTONCLICK",
      payload: {
        reset: "true",
      },
    });
  };

  const onChangeStartTime = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setStartTime(e.target.value);
    dispatch({
      type: "SETSTARTTIME",
      payload: {
        startTime: e.target.value,
      },
    });
  };

  const onChangeEndTime = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setEndTime(e.target.value);
    dispatch({
      type: "SETENDTIME",
      payload: {
        endTime: e.target.value,
      },
    });
  };

  const onChangeEnterNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setEnterAccessPeople(e.target.value);

    dispatch({
      type: "SETREQUIREDPPLCOUNT",
      payload: {
        requiredPeopleCount: e.target.value,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "SETSTARTDATE",
      payload: {
        startDate: curStartFilteringDate,
      },
    });
  }, [curStartFilteringDate]);

  useEffect(() => {
    dispatch({
      type: "SETENDDATE",
      payload: {
        endDate: curEndFilteringDate,
      },
    });
  }, [curEndFilteringDate]);

  useEffect(() => {
    dispatch({
      type: "SETCONTAINTIMECLOSING",
      payload: {
        containTimeClosing: containTimeClosing,
      },
    });
  }, [containTimeClosing]);

  useEffect(() => {
    dispatch({
      type: "SETCONTAINNOADMITTANCE",
      payload: {
        containNoAdmittance: containNoAdmittance,
      },
    });
  }, [containNoAdmittance]);

  useEffect(() => {
    if (addAreaClickDetection.add === "true") {
      setSelectedAreas(roomFilteringDatas.area);
      dispatch({
        type: "ADDAREABUTTONCLICK",
        payload: {
          add: "false",
        },
      });
    }
  }, [addAreaClickDetection.add]);

  useEffect(() => {
    const FilterObj = JSON.parse(localStorage.getItem("Filters"));

    if (FilterObj) {
      setSelectedAreas(FilterObj.selectedArea);
      setStartTime(FilterObj.startTime);
      setEndTime(FilterObj.endTime);
      setContainNoAdmittance(FilterObj.containNoAdmittance);
      setContainTimeClosing(FilterObj.containTimeClosing);
      setCurStartFilteringDate(FilterObj.startDate);
      setCurEndFilteringDate(FilterObj.endDate);
      setEnterAccessPeople(FilterObj.requiredPeopleCount);
    }
  }, []);

  return (
    <>
      <div className="filter-wrapper">
        <div className="centerLine">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="enter"
              checked={containNoAdmittance}
              onChange={() => setContainNoAdmittance(!containNoAdmittance)}
            ></input>
            <label htmlFor="enter">입장 마감된 방 보기</label>
            <input
              type="checkbox"
              id="time"
              checked={containTimeClosing}
              onChange={() => setContainTimeClosing(!containTimeClosing)}
            ></input>
            <label htmlFor="time">시간 마감된 방 보기</label>
          </div>
          <div className="categories">
            <p>지역</p>
            <button className="directInput" onClick={openAreaModal}>
              지역추가
            </button>
            {curSelectedAreas.length !== 0 ? (
              curSelectedAreas.map((area, index) => {
                return (
                  <div key={index} className="selected-area">
                    <p>{area}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            <AddAreaModal
              open={areaModalOpen}
              close={closeAreaModal}
            ></AddAreaModal>
          </div>
          <div className="categories">
            <p>시작일</p>
            <button
              className="modalCalendar"
              onClick={openStartCalendarModal}
            ></button>
            <div className="date-showBox">
              {curStartFilteringDate.substring(0, 4)}
            </div>
            <p>년</p>
            <div className="date-showBox">
              {curStartFilteringDate.substring(5, 7)}
            </div>
            <p>월</p>
            <div className="date-showBox">
              {curStartFilteringDate.substring(8)}
            </div>
            <p>일</p>
            <p>직접입력</p>
            <input
              className="inputTypes"
              value={startTime}
              onChange={onChangeStartTime}
            ></input>
            <span>시</span>
            <CalendarModal
              setStartFilterDate={setStartFilterDate}
              openStart={startCalendarModalOpen}
              closeStart={closeStartCalendarModal}
            ></CalendarModal>
          </div>
          <div className="categories">
            <p>마감일</p>
            <button
              className="modalCalendar"
              onClick={openEndCalendarModal}
            ></button>
            <div className="date-showBox">
              {curEndFilteringDate.substring(0, 4)}
            </div>
            <p>년</p>
            <div className="date-showBox">
              {curEndFilteringDate.substring(5, 7)}
            </div>
            <p>월</p>
            <div className="date-showBox">
              {curEndFilteringDate.substring(8)}
            </div>
            <p>일</p>
            <p>직접입력</p>
            <input
              className="inputTypes"
              value={endTime}
              onChange={onChangeEndTime}
            ></input>
            <span>시</span>
            <CalendarModal
              setEndFilterDate={setEndFilterDate}
              openEnd={endCalendarModalOpen}
              closeEnd={closeEndCalendarModal}
            ></CalendarModal>
          </div>
          <div className="last-categories">
            <p>입장가능인원</p>
            <input
              className="inputTypes"
              value={enterAccessPeople}
              onChange={onChangeEnterNumber}
            ></input>
            <p> 명 이상</p>
          </div>
          <SelectExercise />
          <div className="buttons-wrapper">
            <button className="button-reset" onClick={clickResetFilterButton}>
              초기화
            </button>
            <button
              className="button-application"
              onClick={clickDoFilteringButton}
            >
              적용
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        input:focus {
          outline: none;
        }

        .filter-wrapper {
          width: 100%;
          max-width: 1920px;
          height: 350px;
          margin-bottom: 10px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
        }

        .centerLine {
          width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .checkbox-wrapper {
          display: flex;
          margin: 15px;
        }

        input[type="checkbox"] {
          width: 15px;
          height: 15px;
          border-radius: 7px;
          appearance: none;
          cursor: pointer;
          border: 1px solid #999;
          margin: 5px 10px 5px 20px;
        }

        input[type="checkbox"]:checked {
          background-color: #08555f;
          border: none;
        }

        .inputTypes {
          width: 50px;
          height: 20px;
          border-radius: 11px;
          background-color: #f4f4f4;
          border: none;
          text-align: center;
        }

        .checkbox-wrapper label {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .categories {
          float: left;
          display: flex;
          align-items: center;
          width: 100%;
          height: 50px;
          border-bottom: 0.5px solid #bebebe;
        }

        .categories span {
          font-size: 1.1rem;
          margin: 4px;
        }

        .selected-area {
          display: flex;
          align-items: center;
          height: 30px;
          border-radius: 16px;
          border: solid 1px #6db152;
          margin: 5px 5px 5px 10px;
        }

        .selected-area > p {
          color: black;
          font-weight: normal;
          font-size: 1.2rem;
        }

        .modalCalendar {
          width: 30px;
          height: 25px;
          margin-right: 20px;
          background-image: url("/calendar-modal-img.png");
          background-size: cover;
          border: none;
          background-color: white;
          cursor: pointer;
        }

        .date-showBox {
          width: 80px;
          height: 30px;
          background-color: #f4f4f4;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3rem;
        }

        .clicked {
          background-color: #08555f;
          color: white;
        }

        .directInput {
          width: 80px;
          height: 20px;
          text-align: center;
          border-radius: 6px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
          border: solid 0.5px #d8d8d8;
          background-color: #fff;
          cursor: pointer;
        }

        .last-categories {
          float: left;
          display: flex;
          align-items: center;
          width: 100%;
          height: 50px;
          border-bottom: 0.5px solid #bebebe;
        }

        p {
          font-size: 1.5rem;
          margin: 0 20px;
          font-weight: bold;
        }

        .buttons-wrapper {
          margin: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-reset {
          width: 120px;
          height: 30px;
          border-radius: 15px;
          background-color: #7f7f7f;
          border: none;
          margin-right: 10px;
          color: white;
          cursor: pointer;
        }

        .button-application {
          width: 120px;
          height: 30px;
          border-radius: 15px;
          background-color: #6db152;
          border: none;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Filter;
