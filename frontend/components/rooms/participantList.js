import { useDispatch } from "react-redux";

/* 수정 필요 */
// 1. 참여자 목록을 어떻게 받냐에 따라 수정 필요
// 2. 참여자 목록 클릭 시, 다른 사람의 프로필 조회로 이동
const ParticipantList = (props) => {
  const dispatch = useDispatch();

  const onClickUserInfo = () => {
    props.participantListOpenModal();

    dispatch({
      type: "SAVENICKNAME",
      payload: {
        userNickname: props.userNickname,
      },
    });
  };

  return (
    <>
      <button className="participant" onClick={onClickUserInfo}>
        <div className="profile">
          <div></div>
          <p>{props.userNickname}</p>
        </div>
        <p>방장</p>
      </button>
      <style jsx>{`
        .participant {
          width: 100%;
          height: 40px;
          margin: 10px 0;
          padding: 5px 25px;
          border-radius: 6px;
          border: solid 1px #f0f0f0;
          background-color: white;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        p {
          font-size: 1.1em;
        }

        .participant > p {
          font-weight: bold;
        }

        .profile {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .profile div {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 100%;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.16);
          background-color: #009baf;
        }
      `}</style>
    </>
  );
};

export default ParticipantList;
