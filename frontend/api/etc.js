import axios from "axios";

/* 
기타 API 정리
*/

// GET

// 인기있는 방 조회
const getPopulariyRooms = async () => {
  const promise = axios.get("http://localhost:8080/rooms/popularity", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
  });

  return promise;
};

// POST

// 액세스 토큰 발급
const postRefreshToken = async (refreshToken) => {
  const promise = axios.post("http://localhost:8080/refresh", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      refreshToken: refreshToken,
    },
  });

  return promise;
};

// PUT

// DELETE

export { getPopulariyRooms, postRefreshToken };
