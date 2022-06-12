import Link from "next/link";
import { useSelector } from "react-redux";

const FixedRoomAlarm = () => {
  const userId = useSelector((state) => state.myInfoReducer.id);

  const checkingUserInfo = (e) => {
    if (userId === 0) {
      alert("회원 추가정보를 입력하셔야 이용하실 수 있습니다.");
      e.preventDefault();
      return;
    }
  };
  return (
    <>
      <Link href="/room/createroom/roomsetting">
        <img
          src="/room-create-button.png"
          className="roomRequestButton"
          onClick={checkingUserInfo}
        ></img>
      </Link>

      <style jsx>{`
        .roomRequestButton {
          width: 90px;
          height: 90px;
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 10;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default FixedRoomAlarm;
