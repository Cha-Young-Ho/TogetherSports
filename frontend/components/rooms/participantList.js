import { useDispatch } from "react-redux";

const ParticipantList = (props) => {
  const dispatch = useDispatch();

  const onClickUserInfo = (userNickname) => {
    props.participantListOpenModal(); // 다른 회원 프로필 보기 modal open

    dispatch({
      type: "SAVENICKNAME",
      payload: {
        userNickname: userNickname,
      },
    });
  };

  return (
    <>
      {props.participantArr.length !== 0 ? (
        props.participantArr.map((participant, index) => {
          if (participant.userNickname === props.host) {
            return (
              <button
                className="participant"
                onClick={onClickUserInfo(participant.userNickname)}
                key={index}
              >
                <div className="profile">
                  <div></div>
                  <p>{participant.userNickname}</p>
                </div>
                <p>방장</p>
              </button>
            );
          } else {
            return (
              <button
                className="participant"
                onClick={onClickUserInfo(participant.userNickname)}
                key={index}
              >
                <div className="profile">
                  <div></div>
                  <p>{participant.userNickname}</p>
                </div>
              </button>
            );
          }
        })
      ) : (
        <></>
      )}
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
