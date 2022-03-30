const SelectExercise = () => {
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

  return (
    <>
      <div className="exercise-wrapper">
        <div className="centerLine">
          <p>종목 선택</p>
          <div className="exercises">
            {interestArray.map((exercise, index) => {
              return (
                <button key={index} className="exercise">
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
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
        }

        .centerLine {
          width: 100%;
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
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
          margin-right: 10px;
          width: 70px;
          height: 20px;
          border: 0.5px solid #d8d8d8;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default SelectExercise;
