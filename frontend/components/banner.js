const Banner = () => {
  return (
    <>
      <div className="main_banner">
        <div className="bottom_bar">
          <div className="bottom"></div>
          <div className="search_room">
            <p>방 이름</p>
            <input placeholder="방 이름을 입력하세요."></input>
          </div>
          <button>검색</button>
        </div>
      </div>

      <style jsx>{`
        .main_banner {
          margin: 5px 0;
          width: 100%;
          height: 930px;
          z-index: 1;
          background-image: url("banner_01.png");
          background-repeat: no-repeat;
        }

        .bottom_bar {
          position: relative;
          top: 700px;
          z-index: 2;
          height: 230px;
          background-color: rgb(43, 122, 95, 0.6);
        }

        .search_room {
          position: relative;
          display: flex;
          align-items: center;
          width: 1100px;
          top: 70px;
          left: 250px;
          height: 100px;
          background-color: white;
          border-radius: 50px;
        }
      `}</style>
    </>
  );
};

export default Banner;
