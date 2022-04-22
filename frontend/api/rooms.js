import axios from "axios";

/* 
방 API 정리
*/

// GET

// 방 설명 페이지 조회
const getRoomInfo = async (roomSequenceId) => {
  const promise = axios.get(
    `http://localhost:8080/api/room/${roomSequenceId}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 방 목록 페이지 조회
const getRoomList = async (
  roomTitle,
  roomContent,
  area,
  exercise,
  tags,
  startAppointmentDate,
  endAppointmentDate,
  containTimeClosing,
  containNoAdmittance,
  requiredPeopleCount
) => {
  roomTitle = roomTitle === "" ? "" : `roomTitle=${roomTitle}&`;
  roomContent = roomContent === "" ? "" : `roomContent=${roomContent}&`;
  area = area === "" ? "" : `area=${area}&`;
  exercise = exercise.map((el) => "exercise=" + el + "&").join("");
  tags = tags.map((el) => "tags=" + el + "&").join("");
  startAppointmentDate =
    startAppointmentDate === ""
      ? ""
      : `startAppointmentDate=${startAppointmentDate}&`;
  endAppointmentDate =
    endAppointmentDate === ""
      ? ""
      : `endAppointmentDate=${endAppointmentDate}&`;
  containTimeClosing = `containTimeClosing=${containTimeClosing}&`;
  containNoAdmittance = `containNoAdmittance=${containNoAdmittance}&`;
  requiredPeopleCount =
    requiredPeopleCount === ""
      ? ""
      : `requiredPeopleCount=${requiredPeopleCount}&`;

  const totalQueryString =
    roomTitle +
    roomContent +
    area +
    exercise +
    tags +
    startAppointmentDate +
    endAppointmentDate +
    containTimeClosing +
    containNoAdmittance +
    requiredPeopleCount;

  if (totalQueryString[totalQueryString.length - 1] === "&")
    totalQueryString = totalQueryString.slice(0, -1);

  console.log("방 필터 최종 쿼리스트링 = " + totalQueryString);

  const promise = axios.get(
    "http://localhost:8080/api/room?" + totalQueryString,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
      },
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// POST

// 방 생성
const postCreateRoom = async (
  roomTitle,
  roomContent,
  roomArea,
  limitPeopleCount,
  exercise,
  tags,
  startAppointmentDate,
  endAppointmentDate,
  roomImages
) => {
  const promise = axios.post(
    "http://localhost:8080/api/room",
    {
      roomTitle: roomTitle,
      roomContent: roomContent,
      roomArea: roomArea,
      limitPeopleCount: limitPeopleCount,
      exercise: exercise,
      tags: tags,
      startAppointmentDate: startAppointmentDate,
      endAppointmentDate: endAppointmentDate,
      roomImages: roomImages,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// PUT

// 방 수정
const postUpdateRoom = async (
  roomTitle,
  roomContent,
  roomArea,
  exercise,
  tags,
  startAppointmentDate,
  endAppointmentDate,
  roomImage
) => {
  const promise = axios.put(
    "http://localhost:8080/api/room",
    {
      roomTitle: roomTitle,
      roomContent: roomContent,
      roomArea: roomArea,
      exercise: exercise,
      tags: tags,
      startAppointmentDate: startAppointmentDate,
      endAppointmentDate: endAppointmentDate,
      roomImage: roomImage,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// DELETE

// 방 삭제
const deleteRoom = async (roomSequenceId) => {
  const promise = axios.delete(
    `http://localhost:8080/api/room/${roomSequenceId}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      // params: {
      //   roomSequenceId: roomSequenceId,
      // },
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

export { getRoomInfo, getRoomList, postUpdateRoom, postCreateRoom, deleteRoom };
