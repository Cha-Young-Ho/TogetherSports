const FilteredRooms = () => {
  return (
    <>
      <div className="rooms-wrapper">
        <div className="centerLine">
          <div>
            <button className="buttons">최신순</button>
            <button className="buttons">시간순</button>
            <button className="buttons">참여자순</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .rooms-wrapper {
          width: 100%;
          margin-bottom: 30px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
        }

        .centerLine {
          width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding-top: 15px;
        }

        .buttons {
          width: 80px;
          height: 20px;
          border-radius: 6px;
          background-color: #fff;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          border: solid 0.5px #d8d8d8;
          border: none;
          margin-right: 10px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default FilteredRooms;
