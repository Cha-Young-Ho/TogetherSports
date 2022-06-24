import { useDispatch, useSelector } from "react-redux";

const ParticipantList = (props) => {
  const dispatch = useDispatch();
  const host = useSelector((state) => state.roomRealTimeInfoReducer.host);
  const participantArr = useSelector(
    (state) => state.roomRealTimeInfoReducer.participants
  );

  const onClickUserInfo = (userId, userNickname) => {
    props.participantListOpenModal();

    dispatch({
      type: "SAVECLICKEDUSERINFO",
      payload: {
        id: userId,
        userNickname: userNickname,
      },
    });
  };

  return (
    <>
      {participantArr.length !== 0 ? (
        participantArr.map((participant, index) => {
          if (participant.status === "online") {
            // 방장이라면
            if (participant.userNickname === host) {
              return (
                <button
                  className="participant"
                  onClick={() => {
                    onClickUserInfo(participant.id, participant.userNickname);
                  }}
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
                  onClick={() => {
                    onClickUserInfo(participant.id, participant.userNickname);
                  }}
                  key={index}
                >
                  <div className="profile">
                    <div></div>
                    <p>{participant.userNickname}</p>
                  </div>
                </button>
              );
            }
          } else {
            return (
              // **** 오프라인으로 변경필요 ****
              <button
                className="participant"
                onClick={() => {
                  onClickUserInfo(participant.id, participant.userNickname);
                }}
                key={index}
              >
                <div className="profile">
                  <div></div>
                  <p>{participant.userNickname}</p>
                </div>
                <p>오프라인</p>
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
