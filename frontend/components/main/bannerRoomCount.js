const BannerRoomCount = (props) => {
  const roomCount = props.roomCount.split(""); // 현재 접속가능한 방의 개수 (한 글자씩 배열에 담음)

  return (
    <>
      {roomCount.map((count, index) => {
        return (
          <div key={index} className="count-wrapper">
            <div></div>
            <span>{count}</span>
          </div>
        );
      })}

      <style jsx>{`
        .count-wrapper {
          max-width: 120px;
          width: 100%;
          height: 200px;
          margin: 0 5px;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 30px;
        }

        .count-wrapper > div {
          width: 120px !important;
          position: absolute;
          height: 2.5px;
          background-color: rgba(43, 122, 95, 0.8);
        }

        span {
          font-size: 13rem;
          font-weight: bold;
          line-height: 31.5px;
          text-align: center;
          color: rgb(239, 239, 239);
          z-index: 1;
        }
      `}</style>
    </>
  );
};

export default BannerRoomCount;
