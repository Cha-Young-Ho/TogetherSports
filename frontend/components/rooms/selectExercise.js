import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectExercise = () => {
  const dispatch = useDispatch();
  const resetDetection = useSelector(
    (state) => state.filteringButtonClickDetectionReducer
  );

  const interestArray = [
    "축구",
    "야구",
    "농구",
    "당구",
    "탁구",
    "헬스",
    "자전거",
    "골프",
    "등산",
    "런닝",
    "배드민턴",
    "기타종목",
  ];

  const [interest, setInterest] = useState({});

  const clickExercises = (e) => {
    if (e.target.classList[2] === "clicked") {
      e.target.classList.remove("clicked");
    } else {
      e.target.classList.add("clicked");
    }

    setInterest((prev) => ({
      ...prev,
      [e.target.innerText]: !interest[e.target.innerText],
    }));
  };

  useEffect(() => {
    dispatch({
      type: "ROOMEXERCISES",
      payload: {
        exercise: interest,
      },
    });
  }, [interest]);

  useEffect(() => {
    if (resetDetection.reset === "true") {
      dispatch({
        type: "ROOMEXERCISES",
        payload: {
          exercise: [],
        },
      });

      dispatch({
        type: "RESETBUTTONCLICK",
        payload: {
          reset: "false",
        },
      });

      [...document.getElementsByClassName("exercise")].map((exer) => {
        if (exer.classList[2] === "clicked") {
          return exer.classList.remove("clicked");
        }

        return exer;
      });

      setInterest({});
    }
  }, [resetDetection.reset]);

  return (
    <>
      <div className="exercise-wrapper">
        <div className="centerLine">
          <p>종목 선택</p>
          <div className="exercises">
            {interestArray.map((exercise, index) => {
              return (
                <button
                  key={index}
                  className="exercise"
                  onClick={clickExercises}
                >
                  {exercise}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .exercise-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .centerLine {
          width: 100%;
          margin-top: 10px;
          display: flex;
        }

        p {
          font-size: 1.5rem;
          margin: 10px 20px;
          font-weight: bold;
        }

        .exercises {
          display: flex;
          align-items: center;
        }

        .exercise {
          cursor: pointer;
          border-radius: 6px;
          //box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
          margin-right: 10px;
          width: 70px;
          height: 40px;
          border: none;
        }

        .clicked {
          background-color: #08555f;
          color: white;
        }
      `}</style>
    </>
  );
};

export default SelectExercise;
