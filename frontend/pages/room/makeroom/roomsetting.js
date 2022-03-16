import RoomInfoNavBar from "../../../components/roomInfoNavBar";

const RoomSetting = () => {
  return (
    <>
      <div className="container">
        <RoomInfoNavBar
          roomSetting_atv={""}
          roomSchedule_atv={""}
          roomTagInfo_atv={""}
        />
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          border-top: solid 1px #e4e8eb;
        }
      `}</style>
    </>
  );
};

export default RoomSetting;
