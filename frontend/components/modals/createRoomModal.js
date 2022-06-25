import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CreateRoomModal = () => {
  const userId = useSelector((state) => state.myInfoReducer.id);
  const router = useRouter();

  const checkingUserInfo = (e) => {
    if (userId === 0) {
      alert("회원 추가정보를 입력하셔야 이용하실 수 있습니다.");
      e.preventDefault();
      return;
    }

    router.push("/room/createroom/roomsetting");
  };
  return (
    <>
      <img
        src="/room-create-button.png"
        className="roomRequestButton"
        onClick={checkingUserInfo}
      ></img>

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

export default CreateRoomModal;
