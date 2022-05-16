import axios from "axios";

/* 
방 API 정리
*/

// GET

// 방 설명 페이지 조회
const getRoomInfo = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`http://localhost:8080/api/rooms/${roomId}/info`)
      : axios.get(`http://localhost:8080/api/rooms/${roomId}/info`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 방 상세 페이지 조회
const getRoomDetail = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`http://localhost:8080/api/rooms/${roomId}/detail`)
      : axios.get(`http://localhost:8080/api/rooms/${roomId}/detail`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 방 목록 페이지 조회
const getRoomList = (
  roomTitle,
  roomContent,
  area,
  exercise,
  tags,
  startAppointmentDate,
  endAppointmentDate,
  containTimeClosing,
  containNoAdmittance,
  requiredPeopleCount,
  page,
  size,
  sort
) => {
  const totalQueryString = {
    roomTitle: roomTitle,
    roomContent: roomContent,
    area: area.length !== 0 ? area.join(",") : "",
    exercise: exercise.length !== 0 ? exercise.join(",") : "",
    tags: tags.length !== 0 ? tags.join(",") : "",
    startAppointmentDate: startAppointmentDate,
    endAppointmentDate: endAppointmentDate,
    containTimeClosing: containTimeClosing,
    containNoAdmittance: containNoAdmittance,
    requiredPeopleCount: requiredPeopleCount,
    page: page,
    size: size,
    sort: sort,
  };

  console.log("방 필터 최종 쿼리스트링 = " + totalQueryString);

  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get("http://localhost:8080/api/room", {
          params: totalQueryString,
        })
      : axios.get(
          "http://localhost:8080/api/room",
          {
            params: totalQueryString,
          },
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

// 최상위(시) 행정구역 조회
const getRootLocations = () => {
  const promise = axios.get(`http://localhost:8080/locations`);

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 하위(시 이하) 행정구역 조회
const getChildLocations = (name) => {
  const promise = axios.get(
    `http://localhost:8080/locations/parent/name?${name}`
  );

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

const getChatInfo = (roomSequenceId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`http://localhost:8080/api/room/${roomSequenceId}/chat`)
      : axios.get(`http://localhost:8080/api/room/${roomSequenceId}/chat`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// POST

// 방 생성
const postCreateRoom = (
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
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.post("http://localhost:8080/api/room", {
          roomTitle: roomTitle,
          roomContent: roomContent,
          roomArea: roomArea,
          limitPeopleCount: limitPeopleCount,
          exercise: exercise,
          tags: tags,
          startAppointmentDate: startAppointmentDate,
          endAppointmentDate: endAppointmentDate,
          roomImages: roomImages,
        })
      : axios.post(
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

// 마이룸 정보
const getMyRoomInfo = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`http://localhost:8080/api/room/myroom`)
      : axios.get(`http://localhost:8080/api/room/myroom`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// PUT

// 방 수정
const postUpdateRoom = (
  roomTitle,
  roomContent,
  roomArea,
  exercise,
  tags,
  startAppointmentDate,
  endAppointmentDate,
  roomImages
) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.put("http://localhost:8080/api/room", {
          roomTitle: roomTitle,
          roomContent: roomContent,
          roomArea: roomArea,
          exercise: exercise,
          tags: tags,
          startAppointmentDate: startAppointmentDate,
          endAppointmentDate: endAppointmentDate,
          roomImages: roomImages,
        })
      : axios.put(
          "http://localhost:8080/api/room",
          {
            roomTitle: roomTitle,
            roomContent: roomContent,
            roomArea: roomArea,
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

// DELETE

// 방 삭제
const deleteRoom = (roomSequenceId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.delete(`http://localhost:8080/api/room/${roomSequenceId}`)
      : axios.delete(`http://localhost:8080/api/room/${roomSequenceId}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          // params: {
          //   roomSequenceId: roomSequenceId,
          // },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

export {
  getRoomInfo,
  getRoomDetail,
  getRoomList,
  getRootLocations,
  getChildLocations,
  getChatInfo,
  getMyRoomInfo,
  postUpdateRoom,
  postCreateRoom,
  deleteRoom,
};
