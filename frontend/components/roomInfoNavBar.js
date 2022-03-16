const RoomInfoNavBar = ({
  roomSetting_atv,
  roomSchedule_atv,
  roomTagInfo_atv,
}) => {
  return (
    <>
      <h1 className="title">방 생성하기</h1>
      <div className="menus">
        <div>
          <div>
            <img
              src={`/roomsetting-${roomSetting_atv}.png`}
              alt="기본 정보 설정"
              className="menu-circle-roomsetting"
            ></img>
          </div>
          <p>기본 정보 설정</p>
        </div>
        <div>
          <div>
            <img
              src={`/roomschedule-${roomSchedule_atv}.png`}
              alt="일정 생성하기"
              className="menu-circle-roomschedule"
            ></img>
          </div>
          <p>일정 생성하기</p>
        </div>
        <div>
          <div>
            <img
              src={`/roomtaginfo-${roomTagInfo_atv}.png`}
              alt="태그 및 설명"
              className="menu-circle-roomtaginfo"
            ></img>
          </div>
          <p>태그 및 설명</p>
        </div>
      </div>
      <style jsx>{`
        * {
          font-weight: bold;
        }

        .title {
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

        .menus {
          width: 500px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .menu-circle-roomsetting,
        .menu-circle-roomschedule,
        .menu-circle-roomtaginfo {
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
