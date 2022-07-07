import { useDispatch, useSelector } from "react-redux";

const ParticipantList = (props) => {
  const dispatch = useDispatch();
  const host = useSelector((state) => state.roomRealTimeInfoReducer.host);
  const participantArr = useSelector(
    (state) => state.roomRealTimeInfoReducer.participants
  );
  const myID = useSelector((state) => state.myInfoReducer.id);

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
      {Array.isArray(participantArr) ? (
        participantArr.map((participant, index) => {
          if (participant.id === myID) {
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
                    <img
                      src={`https://together-sports.com/${participant.userProfileImagePath}`}
                      alt="profile"
                    ></img>
                    <p>{`${participant.userNickname} (나)`}</p>
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
                    <img
                      src={`https://together-sports.com/${participant.userProfileImagePath}`}
                      alt="profile"
                    ></img>
                    <p>{`${participant.userNickname} (나)`}</p>
                  </div>
                </button>
              );
            }
          }

          if (participant.status === "ONLINE") {
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
                    <img
                      src={`https://together-sports.com/${participant.userProfileImagePath}`}
                      alt="profile"
                    ></img>
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
                    <img
                      src={`https://together-sports.com/${participant.userProfileImagePath}`}
                      alt="profile"
                    ></img>
                    <p>{participant.userNickname}</p>
                  </div>
                </button>
              );
            }
          } else {
            // 방장이라면
            if (participant.userNickname === host) {
              return (
                <button
                  className="participant offline"
                  onClick={() => {
                    onClickUserInfo(participant.id, participant.userNickname);
                  }}
                  key={index}
                >
                  <div className="profile">
                    <img
                      src={`https://together-sports.com/${participant.userProfileImagePath}`}
                      alt="profile"
                    ></img>
                    <p>{participant.userNickname}</p>
                  </div>
                  <p>방장(오프라인)</p>
                </button>
              );
            } else {
              return (
                <button
                  className="participant offline"
                  onClick={() => {
                    onClickUserInfo(participant.id, participant.userNickname);
                  }}
                  key={index}
                >
                  <div className="profile">
                    <img
                      src={`https://together-sports.com/${participant.userProfileImagePath}`}
                      alt="profile"
                    ></img>
                    <p>{participant.userNickname}</p>
                  </div>
                  <p>오프라인</p>
                </button>
              );
            }
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
          font-weight: 600;
        }

        .participant > p {
          font-weight: bold;
        }

        .offline {
          background-color: #f0f0f0;
        }

        .profile {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .profile img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 100%;
          background-color: #009baf;
        }
      `}</style>
    </>
  );
};

export default ParticipantList;
