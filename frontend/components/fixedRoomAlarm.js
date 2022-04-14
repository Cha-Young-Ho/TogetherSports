import Link from "next/link";
import { useSelector } from "react-redux";

const FixedRoomAlarm = () => {
  const myInfo = useSelector((state) => state.myInfoReducer);

  const checkingUserInfo = (e) => {
    if (myInfo.userEmail === "") {
      alert("회원 추가정보를 입력하셔야 이용하실 수 있습니다.");
      e.preventDefault();
      return;
    }
  };
  return (
    <>
      <Link href="/room/createroom/roomsetting">
        <button className="roomRequestButton" onClick={checkingUserInfo}>
          <p>+</p>
        </button>
      </Link>

      <style jsx>{`
        .roomRequestButton {
          width: 50px;
          height: 50px;
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 20px;
          bottom: 20px;
          background-color: #6db152;
          box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.75);
          border-radius: 50%;
          z-index: 10;
          cursor: pointer;
          border: none;
        }

        .roomRequestButton p {
          color: white;
          font-size: 4rem;
          font-weight: 1200;
        }
      `}</style>
    </>
  );
};

export default FixedRoomAlarm;
