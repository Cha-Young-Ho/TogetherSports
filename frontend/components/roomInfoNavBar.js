const RoomInfoNavBar = (props) => {
  return (
    <>
      <h1>방 생성하기</h1>
      <div className="container">
        <div>
          <div>
            <img
              src={`/roomsetting-${props.roomSetting_atv}.png`}
              alt="기본 정보 설정"
              className="roomsetting"
            ></img>
          </div>
          <p>기본 정보 설정</p>
        </div>
        <div>
          <div>
            <img
              src={`/roomschedule-${props.roomSchedule_atv}.png`}
              alt="일정 생성하기"
              className="roomschedule"
            ></img>
          </div>
          <p>일정 생성하기</p>
        </div>
        <div>
          <div>
            <img
              src={`/roomtaginfo-${props.roomTagInfo_atv}.png`}
              alt="태그 및 설명"
              className="roomtaginfo"
            ></img>
          </div>
          <p>태그 및 설명</p>
        </div>
      </div>
      <style jsx>{`
        * {
          font-weight: bold;
        }

        h1 {
          padding: 35px 0;
          font-size: 2.5rem;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 5px 0;
        }

        .container {
          width: 500px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .roomsetting,
        .roomschedule,
        .roomtaginfo {
          border-radius: 50px;
          width: 90px;
          height: 90px;
          margin: 10px;
        }
      `}</style>
    </>
  );
};

export default RoomInfoNavBar;
