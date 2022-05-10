import RoomShowingBox from "../components/rooms/roomShowingBox";
import { useEffect, useRef, useState } from "react";
import { getMyRoomInfo } from "../api/rooms";
import { FailResponse } from "../api/failResponse";

const MyRoom = () => {
  const [imminentRooms, setImminentRooms] = useState([
    {
      roomId: 2,
      roomTitle: "첫번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "두번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "세번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "네번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "다섯번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "여섯번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "7 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "8 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "9 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "10 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "11 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "12 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "13 방",
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
      roomTitle: "첫번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "두번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "세번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "네번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "다섯번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "첫번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "두번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "세번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "네번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
  ]);
  const [participateRooms, setParticipateRooms] = useState([
    {
      roomId: 2,
      roomTitle: "첫번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "두번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "세번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "네번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "다섯번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "네번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
    {
      roomId: 2,
      roomTitle: "다섯번째 방",
      limitPeopleCount: 10,
      participantCount: 1,
      tags: ["고수만", "중수만", "매너만", "남자만"],
      roomImagePath: "",
      startAppointmentDate: "2022-05-08T12:55:00",
      endAppointmentDate: "2022-05-10T15:00:00",
    },
  ]);

  const [imminentCurIndex, setImminentCurIndex] = useState(0);
  const imminentRef = useRef(null);

  const [hostingCurIndex, setHostingCurIndex] = useState(0);
  const hostingRef = useRef(null);

  const [participateCurIndex, setParticipateCurIndex] = useState(0);
  const participateRef = useRef(null);

  const beforeClickButton = (
    anyRooms,
    anyCurIndex,
    anySetIndex,
    dividePoint
  ) => {
    if (anyRooms.length % dividePoint !== 0) {
      if (anyCurIndex < 1 && anyCurIndex > 0) {
        anySetIndex(0);
        return;
      } else if (anyCurIndex <= 0) {
        anySetIndex(
          ((anyRooms.length / dividePoint) >> 0) -
            (1 - (anyRooms.length % dividePoint) / dividePoint)
        );
        return;
      }
    }

    if (anyCurIndex <= 0) {
      anySetIndex(((anyRooms.length / 4) >> 0) - 1);
    } else {
      anySetIndex(anyCurIndex - 1);
    }
  };

  const nextClickButton = (anyRooms, anyCurIndex, anySetIndex, dividePoint) => {
    if (
      anyRooms.length % dividePoint !== 0 &&
      (anyRooms.length / dividePoint) >> 0 === anyCurIndex + 1
    ) {
      anySetIndex(anyCurIndex + (anyRooms.length % dividePoint) / dividePoint);
      return;
    }

    if (anyCurIndex + 1 >= (anyRooms.length / dividePoint) >> 0) {
      anySetIndex(0);
    } else {
      anySetIndex((anyCurIndex = anyCurIndex + 1));
    }
  };

  const beforeImminentCarousel = () => {
    beforeClickButton(imminentRooms, imminentCurIndex, setImminentCurIndex, 4);
  };

  const nextImminentCarousel = () => {
    nextClickButton(imminentRooms, imminentCurIndex, setImminentCurIndex, 4);
  };

  const beforeHostingCarousel = () => {
    beforeClickButton(hostingRooms, hostingCurIndex, setHostingCurIndex, 5);
  };

  const nextHostingCarousel = () => {
    nextClickButton(hostingRooms, hostingCurIndex, setHostingCurIndex, 5);
  };

  const beforeParticipateCarousel = () => {
    beforeClickButton(
      participateRooms,
      participateCurIndex,
      setParticipateCurIndex,
      5
    );
  };

  const nextParticipateCarousel = () => {
    nextClickButton(
      participateRooms,
      participateCurIndex,
      setParticipateCurIndex,
      5
    );
  };

  useEffect(() => {
    getMyRoomInfo((res) => {
      if (res.status.code === 5000) {
        setImminentRooms(res.content.imminentRooms);
        setHostingRooms(res.content.hostingRooms);
        setParticipateRooms(res.content.participateRooms);
      } else {
        FailResponse(res.status.code);
      }
    }).catch((error) => {
      if (error.response) {
        FailResponse(error.response.data.status.code);
      }
    });
  }, []);

  useEffect(() => {
    imminentRef.current.style.transition = "all 0.3s ease-in-out";
    imminentRef.current.style.transform = `translate(-${
      imminentCurIndex * imminentRef.current.offsetWidth
    }px,0)`;
  }, [imminentCurIndex]);

  useEffect(() => {
    hostingRef.current.style.transition = "all 0.3s ease-in-out";
    hostingRef.current.style.transform = `translate(-${
      hostingCurIndex * hostingRef.current.offsetWidth
    }px,0)`;
  }, [hostingCurIndex]);

  useEffect(() => {
    participateRef.current.style.transition = "all 0.3s ease-in-out";
    participateRef.current.style.transform = `translate(-${
      participateCurIndex * participateRef.current.offsetWidth
    }px,0)`;
  }, [participateCurIndex]);

  return (
    <>
      <div className="myroom-wrapper">
        <div className="imminent-wrapper">
          <button className="before" onClick={beforeImminentCarousel}>
            {`◀`}
          </button>
          <div className="imminent-schedule">
            <h1>다가오는 일정</h1>
            <div className="imminent-rooms" ref={imminentRef}>
              {imminentRooms.length
                ? imminentRooms.map((room, index) => {
                    return (
                      <div key={index} className="roomBoxes">
                        <p className="left-date">{`D - 3`}</p>
                        <p className="origin-date">{`2002년`}</p>
                        <h1>{room.roomTitle}</h1>
                        <p className="perssonel">{`모집인원(${room.participantCount}/${room.limitPeopleCount})`}</p>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          <button className="next" onClick={nextImminentCarousel}>
            {`▶`}
          </button>
        </div>
        <div className="host-wrapper">
          <button className="before" onClick={beforeHostingCarousel}>
            {`◀`}
          </button>
          <div className="host-schedule">
            <h1>내가 방장인 방</h1>
            <div className="host-rooms" ref={hostingRef}>
              {hostingRooms.length
                ? hostingRooms.map((datas, index) => {
                    return (
                      <RoomShowingBox key={index} datas={datas} slider={true} />
                    );
                  })
                : ""}
            </div>
          </div>
          <button className="next" onClick={nextHostingCarousel}>
            {`▶`}
          </button>
        </div>
        <div className="participate-wrapper">
          <button className="before" onClick={beforeParticipateCarousel}>
            {`◀`}
          </button>
          <div className="participate-scehdule">
            <h1>참여한 방 목록</h1>
            <div className="participate-rooms" ref={participateRef}>
              {participateRooms.length
                ? participateRooms.map((datas, index) => {
                    return (
                      <RoomShowingBox key={index} datas={datas} slider={true} />
                    );
                  })
                : ""}
            </div>
          </div>
          <button className="next" onClick={nextParticipateCarousel}>
            {`▶`}
          </button>
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
          left: 5%;
        }

        .next {
          right: 5%;
        }

        .before:hover,
        .next:hover {
          background-color: #707070;
        }

        .myroom-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .imminent-wrapper {
          width: 100%;
          height: 230px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .imminent-schedule {
          width: 80%;
          height: 100%;
          overflow: hidden;
        }

        .imminent-rooms {
          display: flex;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 25px 5px;
        }

        .roomBoxes {
          min-width: 21%;
          height: 135px;
          border-radius: 10px;
          background-color: #53927d;
          padding: 5px;
          margin: 0 2%;
        }

        .roomBoxes:hover {
          transition: all 0.3s ease;
          transform: scale(1.2);
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

        .host-wrapper {
          width: 100%;
          height: 390px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .host-schedule,
        .participate-scehdule {
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .host-rooms,
        .participate-rooms {
          display: flex;
        }

        .participate-wrapper {
          width: 100%;
          height: 390px;
          margin: 20px 0;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default MyRoom;
