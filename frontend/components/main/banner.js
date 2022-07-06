import BannerRoomCount from "./bannerRoomCount";
import Link from "next/link";
import { useSelector } from "react-redux";

const Banner = () => {
  const roomCount = useSelector(
    (state) => state.saveRoomCountReducer.roomCount
  );

  return (
    <>
      <div className="container">
        <img src="/banner_01.png" alt="배너"></img>
        <div className="banner-contents">
          <p>아직 모집중인 방이 무려</p>

          <div className="roomCount">
            <div>
              <BannerRoomCount roomCount={roomCount} />
            </div>
            <span>개</span>
          </div>

          <Link href="/room/roomlist">
            <div className="roomList">
              <p>🏀 방 목록 보기 🏀</p>
              <p>{`>`}</p>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          position: relative;
          background-color: rgba(0, 0, 0, 0.16);
        }

        .banner-contents {
          position: absolute;
          top: 0;
          right: 0;
          width: 45%;
          height: 100%;
          background-color: rgba(43, 122, 95, 0.8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        p {
          font-weight: bold;
          color: white;
          letter-spacing: 2px;
        }

        .banner-contents > p {
          font-size: 4rem;
          margin-bottom: 30px;
        }

        .banner-contents > div {
          display: flex;
          flex-direction: row;
        }

        .roomCount {
          margin-bottom: 30px;
          display: flex;
          align-items: flex-end;
        }

        .roomCount > div {
          display: flex;
          flex-direction: row;
        }

        .roomCount span {
          margin-left: 15px;
          font-size: 5rem;
          font-weight: bold;
          color: white;
        }

        .roomList {
          width: 450px;
          height: 85px;
          padding: 30px;
          border-radius: 10px;
          border: solid 3px white;
          justify-content: space-between;
          align-items: center;
          font-size: 3rem;
          cursor: pointer;
        }

        .roomList > p {
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default Banner;
