const Banner = () => {
  return (
    <>
      <div className="main-banner">
        <div className="half-container">
          <div className="title-in-banner">
            <div className="title">동네 운동장에서 족구 한판 뛰실 분?</div>
            <button className="btn-goToRoom">방 찾아보기</button>
          </div>
          <div className="search-container">
            <div className="bar-in-search">
              <div className="searchBar">
                <div className="dropdown-in-searchBar">방 이름</div>
                <div className="split"></div>
                <input className="input-searchRoom"></input>
              </div>
              <button className="btn-nextToRoom">다음</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          font-family: "NanumBarunGothic";
        }

        .main-banner {
          margin-top: 3px;
          width: 100%;
          height: 930px;
          z-index: 2;
          background-image: url("banner_01.png");
          background-repeat: no-repeat;
        }

        .half-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: relative;
          top: 530px;
          width: 100%;
          height: 400px;
          z-index: 5;
        }

        .title-in-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-direction: column;
          width: 400px;
          height: 150px;
        }

        .search-container {
          width: 100%;
          height: 250px;
          background-color: rgb(43, 122, 95, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          margin: 10px 0;
        }

        .btn-goToRoom {
          width: 400px;
          height: 60px;
          border-radius: 30px;
          background-color: white;
          border: 0;
          outline: 0;
          cursor: pointer;
          font-size: 2rem;
          font-weight: bold;
          color: #00555f;
        }

        .bar-in-search {
          width: 1400px;
          height: 60px;
          display: flex;
          justify-content: space-between;
        }

        .searchBar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 1150px;
          height: 60px;
          border-radius: 30px;
          background-color: white;
        }

        .btn-nextToRoom {
          width: 200px;
          height: 60px;
          border-radius: 30px;
          background-color: #2b7a5f;
          border: 0;
          outline: 0;
          cursor: pointer;
        }

        .dropdown-in-searchBar {
          margin-left: 25px;
          width: 66px;
          height: 27px;
          font-size: 2rem;
          font-weight: bold;
          color: #00555f;
        }

        .split {
          height: 40px;
          width: 0.1px;
          border: 0.5px solid rgb(43, 122, 95, 0.6);
        }

        .input-searchRoom {
          width: 950px;
          height: 40px;
          font-size: 2rem;
          font-weight: bold;
          color: #00555f;
          text-align: center;
          border: 0;
        }
      `}</style>
    </>
  );
};

export default Banner;
