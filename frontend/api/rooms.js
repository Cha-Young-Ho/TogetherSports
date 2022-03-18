import axios from "axios";

/* 
방 API 정리
*/

// GET

// 방 설명 페이지 조회
const getRoomInfo = async (roomSequenceId) => {
  const promise = axios.get("http://localhost:8080/room/detail", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
    params: {
      roomSequenceId: roomSequenceId,
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 방 목록 페이지 조회
const getRoomList = async (
  creatorNickName,
  roomTitle,
  roomContent,
  area,
  exercise,
  tag,
  appointmentDate
) => {
  const promise = axios.get("http://localhost:8080/rooms", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
    params: {
      creatorNickName: creatorNickName,
      roomTitle: roomTitle,
      roomContent: roomContent,
      area: area,
      exercise: exercise,
      tag: tag,
      appointmentDate: appointmentDate,
    },
  });
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
  tag,
  startAppointmentDate,
  endAppointmentDate,
  roomImages
) => {
  const promise = axios.post(
    "http://localhost:8080/room",
    {
      roomTitle: roomTitle,
      roomContent: roomContent,
      roomArea: roomArea,
      limitPeopleCount: limitPeopleCount,
      exercise: exercise,
      tag: tag,
      startAppointmentDate: startAppointmentDate,
      endAppointmentDate: endAppointmentDate,
      roomImages: roomImages,
    },
    {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
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
  area,
  tag,
  appointmentDate,
  roomImages
) => {
  const promise = axios.put(
    "http://localhost:8080/room",
    {
      roomTitle: roomTitle,
      roomContent: roomContent,
      area: area,
      tag: tag,
      appointmentDate: appointmentDate,
      roomImages: roomImages,
    },
    {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// DELETE

// 방 삭제
const deleteRoom = async () => {
  const promise = axios.delete("http://localhost:8080/room", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

export { getRoomInfo, getRoomList, postUpdateRoom, postCreateRoom, deleteRoom };
