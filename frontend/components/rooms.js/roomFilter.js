const RoomFilter = () => {
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
            <p>인원</p>
            <div>
              <button>초기화</button>
              <button>적용</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .filter-wrapper {
          width: 100%;
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
      `}</style>
    </>
  );
};

export default RoomFilter;
