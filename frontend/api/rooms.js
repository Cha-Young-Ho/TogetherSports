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

  return promise;
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

  return promise;
};

// POST

// 방 생성
const postCreateRoom = async (
  title,
  content,
  area,
  limit,
  exercise,
  tag,
  date,
  img
) => {
  const promise = axios.post("http://localhost:8080/room", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
    params: {
      roomTitle: title,
      roomContent: content,
      area: area,
      limitPeopleCount: limit,
      exercise: exercise,
      tag: tag,
      appointmentDate: date,
      roomImages: img,
    },
  });

  return promise;
};

// PUT

// 방 수정
const postUpdateRoom = async (
  roomTitle,
  roomContent,
  area,
  exercise,
  tag,
  appointmentDate,
  roomImages
) => {
  const promise = axios.put("http://localhost:8080/room", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
    params: {
      roomTitle: roomTitle,
      roomContent: roomContent,
      area: area,
      exercise: exercise,
      tag: tag,
      appointmentDate: appointmentDate,
      roomImages: roomImages,
    },
  });

  return promise;
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

  return promise;
};

export { getRoomInfo, getRoomList, postUpdateRoom, postCreateRoom, deleteRoom };