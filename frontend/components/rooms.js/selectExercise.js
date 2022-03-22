const SelectExercise = () => {
  return (
    <>
      <div className="exercise-wrapper">
        <div className="centerLine">
          <p>종목 선택</p>
        </div>
      </div>
      <style jsx>{`
        .exercise-wrapper {
          width: 100%;
          height: 90px;
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

        p {
          font-size: 1.5rem;
          margin: 10px 20px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default SelectExercise;
