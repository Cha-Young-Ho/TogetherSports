const WeekWrapper = () => {
  const weekText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <>
      <div className="days-grid">
        {weekText.map((day, index) => (
          <div key={index} className="week-of-month-ko">
            {day}
          </div>
        ))}
      </div>
      <style jsx>{`
        .days-grid {
          width: 100%;
          height: 20px;
          display: grid;
          grid-template-rows: repeat(1, 20px);
          grid-template-columns: repeat(7, 1fr);
          margin-top: 10px;
        }

        .week-of-month-ko {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.1rem;
        }
      `}</style>
    </>
  );
};

export default WeekWrapper;
