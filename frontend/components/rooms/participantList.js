/* 참여자 목록을 배열로 받을 것 같음. 그럼 추후 수정 필요 */
const ParticipantList = ({ userNickName, host }) => {
  return (
    <>
      <div className="participant">
        <div className="profile">
          <div></div>
          <p>{userNickName}</p>
        </div>
        <p>방장</p>
      </div>
      <style jsx>{`
        .participant {
          width: 100%;
          height: 40px;
          margin: 10px 0;
          padding: 5px 25px;
          border-radius: 6px;
          border: solid 1px #f0f0f0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        p {
          font-size: 1.3em;
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
