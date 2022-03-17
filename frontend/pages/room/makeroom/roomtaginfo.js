import Link from "next/link";
import RoomInfoNavBar from "../../../components/roomInfoNavBar";

const RoomTagInfo = () => {
  const ageArray = [
    "#10대",
    "#20대",
    "#30대",
    "#40대",
    "#50대",
    "#60대",
    "#70대이상",
    "#연령무관",
  ];
  const levelArray = ["#입문만", "#초보만", "#중수만", "#고수만", "#실력무관"];
  const genderArray = ["#남자만", "#여자만", "#성별무관"];
  return (
    <>
      <div className="container">
        <RoomInfoNavBar
          roomSetting_atv={"deactivation"}
          roomSchedule_atv={"deactivation"}
          roomTagInfo_atv={"activation"}
        />

        <div className="contents">
          <div className="content-info">
            <p>방에 대한 정보를 입력해주세요!</p>
            <textarea rows="450" cols="130"></textarea>
          </div>

          <div className="content-tag">
            <p>빠른 태그 추가</p>
            <div className="tags">
              <div className="tag">#10대</div>
              <div className="tag">#20대</div>
              <div className="tag">#30대</div>
              <div className="tag">#40대</div>
              <div className="tag">#50대</div>
              <div className="tag">#60대</div>
              <div className="tag">#70대이상</div>
            </div>
          </div>
        </div>

        <div className="buttons">
          <Link href="/room/makeroom/roomschedule">
            <button className="button-prev">이전</button>
          </Link>
          <Link href="/">
            <button className="button-done">완료</button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          border-top: solid 1px #e4e8eb;
        }

        .contents {
          width: 600px;
          border-top: solid 1px #e4e8eb;
          border-bottom: solid 1px #e4e8eb;
        }

        .content-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px 0;
        }

        .content-info p {
          font-size: 1.5em;
          font-weight: bold;
        }

        .content-info textarea {
          margin-top: 20px;
          padding: 10px;
          width: 450px;
          height: 130px;
          border: none;
          border-radius: 10px;
          background-color: #f4f4f4;
          resize: none;
        }

        .content-tag {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px 0;
        }

        .content-tag p {
          font-size: 1.5em;
          font-weight: bold;
        }

        .tags {
          margin-top: 20px;
          width: 550px;
          display: flex;
          flex-direction: row;
        }

        .tag {
          width: 70px;
          height: 30px;
          border: solid 1px #f4f4f4;
          border-radius: 6px;
          background-color: #efefef;
          margin: 0 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2em;
          font-weight: bold;
        }

        .buttons {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .button-prev {
          width: 120px;
          height: 40px;
          background-color: #d8d8d8;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-right: 10px;
        }

        .button-done {
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          margin: 30px 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default RoomTagInfo;
