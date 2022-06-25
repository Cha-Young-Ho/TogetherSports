import axios from "axios";

/* 
방 API 정리
*/

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// GET

// 방 설명 페이지 조회
const getRoomInfo = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/rooms/${roomId}/info`)
      : axios.get(`${API_ENDPOINT}/api/rooms/${roomId}/info`, {
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
      ? axios.get(`${API_ENDPOINT}/api/rooms/${roomId}/detail`)
      : axios.get(`${API_ENDPOINT}/api/rooms/${roomId}/detail`, {
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
      ? axios.get(`${API_ENDPOINT}/api/room`, {
          params: totalQueryString,
        })
      : axios.get(
          `${API_ENDPOINT}/api/room`,
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

// 방 참가 가능 여부
const getAvailability = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/rooms/${roomId}/attendance`)
      : axios.get(`${API_ENDPOINT}/api/rooms/${roomId}/attendance`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 마이룸 정보
const getMyRoomInfo = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/room/myroom`)
      : axios.get(`${API_ENDPOINT}/api/room/myroom`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 최상위(시) 행정구역 조회
const getRootLocations = () => {
  const promise = axios.get(`${API_ENDPOINT}/api/locations`);

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 하위(시 이하) 행정구역 조회
const getChildLocations = (name) => {
  const promise = axios.get(`${API_ENDPOINT}/api/locations/parent/${name}`);

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 채팅 정보 조회
const getChatInfo = (roomSequenceId, page, size) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/room/${roomSequenceId}/chat`, {
          params: {
            page: page,
            size: size,
          },
        })
      : axios.get(
          `${API_ENDPOINT}/api/room/${roomSequenceId}/chat`,
          {
            params: {
              page: page,
              size: size,
            },
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

// 방 이미지 소스 조회
const getRoomImageSource = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/room/${roomId}/imageSource`)
      : axios.get(`${API_ENDPOINT}/api/room/${roomId}/imageSource`, {
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
      ? axios.post(`${API_ENDPOINT}/api/room`, {
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
          `${API_ENDPOINT}/api/room`,
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

// 방 참가 요청
const postEnterRoom = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.post(`${API_ENDPOINT}/api/room/${roomId}/user`)
      : axios.post(
          `${API_ENDPOINT}/api/room/${roomId}/user`,
          {},
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
const putUpdateRoom = (
  roomId,
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
      ? axios.put(`${API_ENDPOINT}/api/room`, {
          roomId: roomId,
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
      : axios.put(
          `${API_ENDPOINT}/api/room`,
          {
            roomId: roomId,
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

// PATCH

// 방장 위임
const patchDelegateHost = (roomId, targetUserId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.patch(`${API_ENDPOINT}/api/room/${roomId}/user/delegate`, {
          targetUserId: targetUserId,
        })
      : axios.patch(
          `${API_ENDPOINT}/api/room/${roomId}/user/delegate`,
          {
            targetUserId: targetUserId,
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
const deleteRoom = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.delete(`${API_ENDPOINT}/api/room/${roomId}`)
      : axios.delete(`${API_ENDPOINT}/api/room/${roomId}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 방 나가기
const deleteLeaveRoom = (roomId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.delete(`${API_ENDPOINT}/api/room/${roomId}/user`)
      : axios.delete(`${API_ENDPOINT}/api/room/${roomId}/user`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 유저 강퇴
const deleteKickOutUser = (roomId, targetUserId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.delete(
          `${API_ENDPOINT}/api/room/${roomId}/user/${targetUserId}/kick-out`
        )
      : axios.delete(
          `${API_ENDPOINT}/api/room/${roomId}/user/${targetUserId}/kick-out`,
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

export {
  getRoomInfo,
  getRoomDetail,
  getRoomList,
  getRootLocations,
  getChildLocations,
  getChatInfo,
  getMyRoomInfo,
  getAvailability,
  getRoomImageSource,
  putUpdateRoom,
  postCreateRoom,
  postEnterRoom,
  patchDelegateHost,
  deleteRoom,
  deleteLeaveRoom,
  deleteKickOutUser,
};
