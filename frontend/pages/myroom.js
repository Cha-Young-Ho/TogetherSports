import RoomShowingBox from "../components/rooms/roomShowingBox";
import { useState } from "react";

const MyRoom = () => {
  const [hostRooms, setHostRooms] = useState(null);
  const [joinedRooms, setJoinedRooms] = useState(null);

  console.log(hostRooms);

  return (
    <>
      <div className="myroom-wrapper">
        <div className="oncoming-wrapper">
          <div className="oncoming-schedule">
            <h1>다가오는 일정</h1>
            <div className="test">임시</div>
          </div>
        </div>
        <div className="host-wrapper">
          <div className="host-schedule">
            <h1>내가 방장인 방</h1>
            <div className="test">임시</div>
          </div>
        </div>
        <div className="joined-wrapper">
          <div className="joined-scehdule">
            <h1>참여한 방 목록</h1>
            <div className="test">임시</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .myroom-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .oncoming-wrapper {
          width: 100%;
          height: 230px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .oncoming-schedule {
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 25px 5px;
        }

        .test {
          width: 100%;
          height: 130px;
          border: 1px solid black;
        }

        .host-wrapper {
          width: 100%;
          height: 390px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .host-schedule {
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .joined-wrapper {
          width: 100%;
          height: 390px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .joined-scehdule {
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default MyRoom;
