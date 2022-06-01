import { useSelector } from "react-redux";

const FloatingAlarm = (props) => {
  const getMessagesFromRedux = useSelector(
    (state) => state.saveRoomAlarmReducer.messages
  );

  return (
    <>
      {props.open ? (
        <div className="floating-wrapper">
          <div className="header">
            <p>새 알림</p>
            <button onClick={props.close}>&times;</button>
          </div>

          <div className="alarms-wrapper">
            {getMessagesFromRedux.length !== 0 ? (
              getMessagesFromRedux.map((message, index) => {
                return (
                  <div className="alarms" key={index}>
                    <p>✔️</p>
                    <div className="alarm">{message}</div>
                  </div>
                );
              })
            ) : (
              <div className="no-alarms">새 알림이 없습니다.</div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <style jsx>{`
        .floating-wrapper {
          width: 330px;
          height: 450px;
          padding: 10px;
          border-radius: 15px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #f2f2f2;
          position: -webkit-fixed; // safari
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1;
          animation: zoomin 0.2s ease-in-out;
        }

        @keyframes zoomin {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .header p {
          margin: 10px 0 0 10px;
          font-size: 2rem;
          font-weight: bold;
        }

        .header button {
          position: absolute;
          top: 10px;
          right: 10px;
          color: #999;
          font-size: 2.5rem;
          background-color: #f2f2f2;
          border: none;
          user-select: none;
          cursor: pointer;
        }

        .alarms-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .alarms {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        }

        .alarms p {
          font-size: 2rem;
          margin-right: 5px;
          user-select: none;
        }

        .alarm {
          width: 100%;
          padding: 10px 15px;
          font-size: 1.2rem;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: white;
        }

        .no-alarms {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
};

export default FloatingAlarm;
