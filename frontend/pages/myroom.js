import RoomShowingBox from "../components/rooms/roomShowingBox";
import { useEffect, useRef, useState } from "react";
import { getMyRoomInfo } from "../api/rooms";
import { FailResponse } from "../api/failResponse";
import Link from "next/link";
import moment from "moment";
import Head from "next/head";

const MyRoom = () => {
  const [imminentRooms, setImminentRooms] = useState([
    {
      roomId: 2,
      roomTitle: "1",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-06-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "2",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-06-06T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "3",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "4",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "5",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "6",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "7",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "8",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
  ]);
  const [hostingRooms, setHostingRooms] = useState([
    {
      roomId: 2,
      roomTitle: "1",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "2",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "3",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "4",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "5",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "6",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "7",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "8",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "9",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "10",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "11",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "12",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "13",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "14",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "15",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "16",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
  ]);
  const [participateRooms, setParticipateRooms] = useState([]);

  const imminentRef = useRef(null);
  const hostingRef = useRef(null);
  const participateRef = useRef(null);

  const prev = (element) => {
    const offsetX = element.current.offsetWidth;
    element.current.scrollBy(-offsetX, 0);
  };

  const next = (element) => {
    const offsetX = element.current.offsetWidth;

    element.current.scrollBy(offsetX, 0);
  };

  useEffect(() => {
    getMyRoomInfo()
      .then((res) => {
        if (res.status.code === 5000) {
          setImminentRooms(res.content.imminentRooms);
          setHostingRooms(res.content.hostingRooms);
          setParticipateRooms(res.content.participateRooms);
        } else {
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error.response) {
          FailResponse(error.response.data.status.code);
        }
      });
  }, []);

  return (
    <>
      <Head>
        <title>내 일정 보기</title>
      </Head>
      <div className="myroom-wrapper">
        <div className="imminent-container">
          {imminentRooms.length ? (
            <button className="before" onClick={() => prev(imminentRef)}>
              {`◀`}
            </button>
          ) : (
            ""
          )}
          <div className="slider">
            <h1>다가오는 일정</h1>
            <div className="slider-row" ref={imminentRef}>
              {imminentRooms.length ? (
                imminentRooms.map((room, index) => {
                  const a = moment(room.endAppointmentDate);
                  const b = moment();

                  return (
                    <div key={index} className="roomBoxes">
                      <p className="left-date">{`D-${a.diff(b, "days") + 1}
                      `}</p>
                      <p className="origin-date">{`${room.startAppointmentDate.slice(
                        0,
                        4
                      )}년 ${room.startAppointmentDate.slice(
                        5,
                        7
                      )}월 ${room.startAppointmentDate.slice(8, 10)}일`}</p>
                      <h1>{room.roomTitle}</h1>
                      <p className="perssonel">{`모집인원(${room.participantCount}/${room.limitPeopleCount})`}</p>
                    </div>
                  );
                })
              ) : (
                <Link href="/room/roomlist">
                  <img src="noImminent.png" className="noImminent"></img>
                </Link>
              )}
            </div>
          </div>
          {imminentRooms.length ? (
            <button className="next" onClick={() => next(imminentRef)}>
              {`▶`}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="row-container">
          {hostingRooms.length ? (
            <button className="before" onClick={() => prev(hostingRef)}>
              {`◀`}
            </button>
          ) : (
            ""
          )}

          <div className="slider">
            <h1>내가 방장인 방</h1>
            <div className="slider-row" ref={hostingRef}>
              {hostingRooms.length ? (
                hostingRooms.map((datas, index) => {
                  return (
                    <RoomShowingBox key={index} datas={datas} slider={true} />
                  );
                })
              ) : (
                <Link href="/room/createroom/roomschedule">
                  <img src="noHosting.png" className="noRoomImage"></img>
                </Link>
              )}
            </div>
          </div>
          {hostingRooms.length ? (
            <button className="next" onClick={() => next(hostingRef)}>
              {`▶`}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="row-container">
          {participateRooms.length ? (
            <button className="before" onClick={() => prev(participateRef)}>
              {`◀`}
            </button>
          ) : (
            ""
          )}
          <div className="slider">
            <h1>참여한 방 목록</h1>
            <div className="slider-row" ref={participateRef}>
              {participateRooms.length ? (
                participateRooms.map((datas, index) => {
                  return (
                    <RoomShowingBox key={index} datas={datas} slider={true} />
                  );
                })
              ) : (
                <Link href="/room/roomlist">
                  <img src="noParticipate.png" className="noRoomImage"></img>
                </Link>
              )}
            </div>
          </div>
          {participateRooms.length ? (
            <button className="next" onClick={() => next(participateRef)}>
              {`▶`}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <style jsx>{`
        .next,
        .before {
          position: absolute;
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          opacity: 0.7;
          font-size: 2rem;
          color: black;
          background-color: #a8a8a8;
          border: 0;
          cursor: pointer;
        }

        .before {
          top: 50%;
          left: 30px;
        }

        .next {
          top: 50%;
          right: 30px;
        }

        .before:hover,
        .next:hover {
          background-color: #707070;
        }

        .imminent-container {
          position: relative;
          width: 100%;
          height: 230px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
        }

        .row-container {
          position: relative;
          width: 100%;
          height: 390px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
        }

        .slider {
          width: 80%;
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .slider-row {
          display: flex;
          overflow-x: scroll;
          scroll-behavior: smooth;
          padding-bottom: 10px;
          gap: 35px;
        }

        .slider-row::-webkit-scrollbar {
          display: none;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 25px 5px;
        }

        .roomBoxes {
          min-width: 350px;
          height: 135px;
          border-radius: 10px;
          background-color: #53927d;
          padding: 5px;
        }

        .left-date {
          color: #fff;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 10px;
        }

        .origin-date {
          color: #fff;
          font-size: 1.5rem;
          margin-left: 10px;
        }

        .roomBoxes > h1 {
          font-size: 2rem;
          color: #fff;
          font-weight: bold;
          margin: 25px 0 5px 10px;
        }

        .perssonel {
          color: #fff;
          text-align: right;
        }

        .noImminent {
          width: 350px;
          height: 100%;
          cursor: pointer;
        }

        .noRoomImage {
          width: 250px;
          height: 100%;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default MyRoom;
