const HeaderWrapper = ({ Year, Month }) => {
  return (
    <>
      <div className="container">
        <button className="left-button">{`<`}</button>
        <div className="year-month-text">{`${Year}.${Month}`}</div>
        <div className="right-button">{`>`}</div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 45px;
          background-color: #08555f;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .left-button {
          cursor: pointer;
          outline: none;
          border: none;
          color: white;
          font-size: 2rem;
          padding: 10px;
          border-radius: 12px;
          background: #08555f;
        }

        .year-month-text {
          color: white;
          font-size: 1.5rem;
        }

        .right-button {
          cursor: pointer;
          outline: none;
          border: none;
          color: white;
          font-size: 2rem;
          padding: 10px;
          border-radius: 12px;
          background: #08555f;
        }
      `}</style>
    </>
  );
};

export default HeaderWrapper;
