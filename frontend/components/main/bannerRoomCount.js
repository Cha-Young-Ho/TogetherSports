const BannerRoomCount = (props) => {
  const roomCount = props.roomCount.split(""); // 현재 접속가능한 방의 개수 (한 글자씩 배열에 담음)

  return (
    <>
      <div className="roomCount-wrapper">
        {roomCount.map((count, index) => {
          return (
            <div key={index}>
              <div></div>
              {/* <p>{count}</p> */}
              <div></div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .roomCount-wrapper {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 5px;
        }

        .roomCount-wrapper > div {
          position: relative;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.6);
          margin-right: 5px;
          /* border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.6); */
        }

        .roomCount-wrapper > div > div {
          /* position: absolute;
          width: 100%;
          height: 100%; */
        }

        p {
          position: absolute;
          z-index: 2;
          top: 5px;
          font-size: 13rem;
          font-weight: bold;
          color: white;
        }
      `}</style>
    </>
  );
};

export default BannerRoomCount;
