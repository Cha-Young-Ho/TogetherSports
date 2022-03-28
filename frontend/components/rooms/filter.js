const Filter = () => {
  return (
    <>
      <div className="filter-wrapper">
        <div className="centerLine">
          <div className="categories">
            <p>지역</p>
          </div>
          <div className="categories">
            <p>시간</p>
          </div>
          <div className="categories">
            <p>시기</p>
          </div>
          <div className="last-categories">
            <div>
              <p>인원</p>
              <div className=""></div>
            </div>
            <div>
              <button className="button-reset">초기화</button>
              <button className="button-application">적용</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .filter-wrapper {
          width: 100%;
          max-width: 1920px;
          height: 200px;
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

        .categories {
          float: left;
          display: flex;
          align-items: center;
          width: 100%;
          height: 50px;
          border-bottom: 0.5px solid #bebebe;
        }

        .last-categories {
          float: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
        }

        p {
          font-size: 1.5rem;
          margin: 0 20px;
          font-weight: bold;
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
