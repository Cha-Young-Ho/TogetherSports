import { getRootLocations, getChildLocations } from "../../api/rooms";
import { useEffect, useState } from "react";
import { FailResponse } from "../../api/failResponse";

const AddAreaModal = (props) => {
  const [rootItems, setRootItems] = useState([
    "서울특별시",
    "부산광역시",
    "대구광역시",
  ]);
  const [secondItems, setSecondItems] = useState([]);
  const [thirdItems, setThirdItems] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const clickRootItem = (e) => {
    console.log("root : " + e.target.innerText);
    setSecondItems(["구구", "강남구", "강동구", "강남구"]);
    // getChildLocations(e.target.innerText)
    //   .then((res) => {
    //     if (res.status.code === 5000) {
    //       setSecondItems(res.content);
    //     } else {
    //       FailResponse(res.status.code);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       FailResponse(error.response.data.status.code);
    //     }
    //   });
  };

  const clickSecondItem = (e) => {
    console.log("second : " + e.target.innerText);
    setThirdItems(["가츠동", "우동", "숭구리 동동", "주모 여기 동동"]);
    // getChildLocations(e.target.innerText)
    //   .then((res) => {
    //     if (res.status.code === 5000) {
    //       setThirdItems(res.content);
    //     } else {
    //       FailResponse(res.status.code);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       FailResponse(error.response.data.status.code);
    //     }
    //   });
  };

  const clickThirdItem = (e) => {
    console.log("마지막 선택" + e.target.innerText);
    setSelectedAreas((prev) => [...prev, e.target.innerText]);
  };

  useEffect(() => {
    if (props.open) {
      getRootLocations()
        .then((res) => {
          if (res.status.code === 5000) {
            setRootItems(res.content);
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
  }, props.open);

  return (
    <>
      <div className={props.open ? "openModal modal" : "modal"}>
        <div className="box-container">
          <div className="header-wrapper">
            <button className="reset-button">초기화</button>
            <h1>지역 추가</h1>
          </div>
          <div className="body-wrapper">
            <div className="region-depth">
              <p>시/도</p>
              <div className="depth-list">
                {rootItems.length !== 0 ? (
                  rootItems.map((location, index) => {
                    return (
                      <p key={index} onClick={clickRootItem}>
                        {location}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="region-depth">
              <p>시/군/구</p>
              <div className="depth-list">
                {secondItems.length !== 0 ? (
                  secondItems.map((location, index) => {
                    return (
                      <p key={index} onClick={clickSecondItem}>
                        {location}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="region-depth">
              <p>동/읍/면</p>
              <div className="depth-list">
                {thirdItems.length !== 0 ? (
                  thirdItems.map((location, index) => {
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
                      <button>⨉</button>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="button-wrapper">
            <button className="done-btn">완료</button>
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
          align-items: center;
          justify-content: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .box-container {
          width: 55%;
          height: 80%;
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
          height: 75%;
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
          align-items: center;
          font-size: 1.5rem;
        }

        .depth-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 17px;
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
