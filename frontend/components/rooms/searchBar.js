const SearchBar = () => {
  return (
    <>
      <div className="search-wrapper">
        <div className="bar-in-search">
          <div className="dropdown-in-searchBar">방 이름</div>
          <div className="split"></div>
          <input className="input-searchRoom"></input>
        </div>
      </div>
      <style jsx>{`
        .search-wrapper {
          width: 100%;
          min-width: 1190px;
          height: 100px;
          margin: 10px;
          background-color: rgb(43, 122, 95, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bar-in-search {
          width: 1190px;
          height: 50px;
          display: flex;
          align-items: center;
          background-color: white;
          border-radius: 25px;
        }

        .dropdown-in-searchBar {
          margin-left: 50px;
          font-size: 2rem;
          font-weight: bold;
          color: #00555f;
        }

        .split {
          height: 40px;
          width: 0.1px;
          margin: 0 50px;
          border: 0.1px solid rgb(43, 122, 95, 0.6);
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

export default SearchBar;
