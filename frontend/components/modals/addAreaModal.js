import { getRootLocations, getChildLocations } from "../../api/rooms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FailResponse } from "../../api/failResponse";

const AddAreaModal = (props) => {
  const dispatch = useDispatch();

  const resetDectection = useSelector(
    (state) => state.filteringButtonClickDetectionReducer.reset
  );

  const [rootLocations, setRootLocations] = useState([
    "서울",
    "대구",
    "부산",
    "광주",
    "대전",
    "경기도",
    "경상도",
    "대구광역시",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);
  const [secondLocations, setSecondLocations] = useState([]);
  const [thirdLocations, setThirdLocations] = useState([
    "서울",
    "대구",
    "부산",
    "광주",
    "대전",
    "경기도",
    "경상도",
    "대구광역시",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const [emphasisRoot, setEmphasisRoot] = useState("");
  const [emphasisSecond, setEmphasisSecond] = useState("");

  const resetButton = () => {
    setEmphasisRoot("");
    setEmphasisSecond("");
    setSecondLocations([]);
    setThirdLocations([]);
    setSelectedAreas([]);
  };

  const clickRootItem = (e) => {
    setEmphasisRoot(e.target.innerText);

    getChildLocations(e.target.innerText)
      .then((res) => {
        if (res.status.code === 5000) {
          setSecondLocations(res.content);
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });
    setThirdLocations([]);
    setSecondLocations([
      "서울",
      "대구",
      "부산",
      "광주",
      "대전",
      "경기도",
      "경상도",
      "대구광역시",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
  };

  const clickSecondItem = (e) => {
    setEmphasisSecond(e.target.innerText);

    getChildLocations(e.target.innerText)
      .then((res) => {
        if (res.status.code === 5000) {
          setThirdLocations(res.content);
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });

    setThirdLocations([
      "서울",
      "대구",
      "부산",
      "광주",
      "대전",
      "경기도",
      "경상도",
      "대구광역시",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
  };

  const clickThirdItem = (e) => {
    if (selectedAreas.length >= 3) {
      e.preventDefault();
      alert("최대 3개까지 선택할 수 있습니다.");
      return;
    }

    for (const area of selectedAreas) {
      if (area === e.target.innerText) {
        e.preventDefault();
        alert("이미 선택한 지역입니다.");
        return;
      }
    }

    setSelectedAreas((prev) => [
      ...prev,
      `${emphasisRoot} ${emphasisSecond} ${e.target.innerText}`,
    ]);
  };

  const clickRemoveAreas = (e) => {
    setSelectedAreas(
      (prev) =>
        (selectedAreas = prev.filter(
          (_, index) => index !== Number(e.target.value)
        ))
    );
  };

  const clickDone = () => {
    dispatch({
      type: "SELECTEDAREA",
      payload: {
        area: selectedAreas,
      },
    });

    dispatch({
      type: "ADDAREABUTTONCLICK",
      payload: {
        add: "true",
      },
    });

    props.close();
  };

  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";

      getRootLocations()
        .then((res) => {
          if (res.status.code === 5000) {
            setRootLocations(res.content);
          } else {
            FailResponse(res.status.code);
          }
        })
        .catch((error) => {
          if (error.response) {
            FailResponse(error.response.data.status.code);
          }
        });
    }
  }, [props.open]);

  useEffect(() => {
    resetButton();
  }, [resetDectection]);

  return (
    <>
      <div
        className={props.open ? "openModal modal" : "modal"}
        onClick={(e) => {
          if (e.target.classList[1] === "openModal") props.close();
        }}
      >
        <div className="box-container">
          <div className="header-wrapper">
            <button className="reset-button" onClick={resetButton}>
              초기화
            </button>
            <h1>지역 추가</h1>
          </div>
          <div className="body-wrapper">
            <div className="region-depth">
              <p>시/도</p>
              <div className="depth-list">
                {rootLocations.length !== 0 ? (
                  rootLocations.map((location, index) => {
                    if (location === emphasisRoot) {
                      return (
                        <p
                          key={index}
                          className="clicked"
                          onClick={clickRootItem}
                        >
                          {location}
                        </p>
                      );
                    } else {
                      return (
                        <p key={index} onClick={clickRootItem}>
                          {location}
                        </p>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="region-depth">
              <p>시/군/구</p>
              <div className="depth-list">
                {secondLocations.length !== 0 ? (
                  secondLocations.map((location, index) => {
                    if (location === emphasisSecond) {
                      return (
                        <p
                          key={index}
                          className="clicked"
                          onClick={clickSecondItem}
                        >
                          {location}
                        </p>
                      );
                    } else {
                      return (
                        <p key={index} onClick={clickSecondItem}>
                          {location}
                        </p>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="region-depth">
              <p>동/읍/면</p>
              <div className="depth-list">
                {thirdLocations.length !== 0 ? (
                  thirdLocations.map((location, index) => {
                    return (
                      <p key={index} onClick={clickThirdItem}>
                        {location}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="tag-wrapper">
            <p>최대 3개까지 선택 가능합니다.</p>
            <div className="selected-areas">
              {selectedAreas.length !== 0 ? (
                selectedAreas.map((area, index) => {
                  return (
                    <div key={index}>
                      <p>{area}</p>
                      <button value={index} onClick={clickRemoveAreas}>
                        ⨉
                      </button>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="button-wrapper">
            <button className="done-btn" onClick={clickDone}>
              완료
            </button>
            <button className="cancel-btn" onClick={props.close}>
              취소
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          justify-content: center;
          align-items: center;
          overflow: auto;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .box-container {
          margin: 10px 0;
          min-width: 1000px;
          height: 650px;
          border-radius: 22px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .header-wrapper {
          width: 100%;
          height: 5%;
          margin: 25px 0;
          display: flex;
          align-items: center;
        }

        .reset-button {
          width: 8%;
          min-width: 50px;
          height: 100%;
          border: none;
          cursor: pointer;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 14.5px;
          background-color: #7f7f7f;
          position: relative;
          left: 25px;
        }

        .header-wrapper h1 {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          position: relative;
          left: 38%;
        }

        .body-wrapper {
          width: 100%;
          height: 65%;
          margin: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .region-depth {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0 15px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #fff;
        }

        .region-depth > p {
          display: flex;
          width: 90%;
          padding: 10px;
          border-bottom: 1px solid lightgrey;
          justify-content: center;
          font-size: 1.5rem;
        }

        .depth-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 0 17px;
        }

        .depth-list::-webkit-scrollbar {
          width: 17px;
          border: none;
        }

        .depth-list::-webkit-scrollbar-track {
          width: 9px;
          border-radius: 4px;
          background-color: #f5f5f5;
          background-clip: padding-box;
          border: 5px solid transparent;
        }

        .depth-list::-webkit-scrollbar-thumb {
          width: 17px;
          border-radius: 4px;
          border: solid 1px #e5e5e5;
          background-color: #fff;
        }

        .depth-list p {
          font-size: 1.5rem;
          text-align: left;
          padding: 10px 0 10px 5px;
          cursor: pointer;
        }

        .depth-list p:hover {
          font-weight: bold;
          background-color: rgb(70, 143, 91, 0.2);
          color: #08555f;
        }

        .clicked {
          font-weight: bold;
          background-color: rgb(70, 143, 91, 0.2);
          color: #08555f;
        }

        .tag-wrapper {
          width: 100%;
          height: 5%;
          margin: 15px 0;
          display: column;
          align-items: center;
        }

        .tag-wrapper p {
          margin: 0 25px;
          font-weight: 300;
          color: #b5b5b5;
        }

        .selected-areas {
          display: flex;
          margin-left: 25px;
        }

        .selected-areas > div {
          display: flex;
          align-items: center;
          height: 30px;
          border-radius: 16px;
          border: solid 1px #6db152;
          margin: 5px 5px 5px 0;
        }

        .selected-areas > div > p {
          color: black;
          font-size: 1.2rem;
        }

        .selected-areas > div > button {
          border: none;
          cursor: pointer;
          background-color: #fff;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }

        .button-wrapper {
          width: 100%;
          min-height: 45px;
          height: 8%;
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .done-btn {
          width: 15%;
          height: 100%;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #00555f;
          margin-right: 10px;
        }

        .cancel-btn {
          width: 15%;
          height: 100%;
          border: none;
          cursor: pointer;
          border-radius: 23.5px;
          background-color: #d8d8d8;
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

export default AddAreaModal;
