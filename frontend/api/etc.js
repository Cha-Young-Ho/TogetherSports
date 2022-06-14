import axios from "axios";

/* 
기타 API 정리
*/

const API_ENDPOINT = process.env.API_ENDPOINT;

// GET

// 네비게이션 바 요청
const getNavBar = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/nav`)
      : axios.get(`${API_ENDPOINT}/api/nav`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 메인페이지 방 개수 조회
const getRoomCount = () => {
  const promise = axios.get(`${API_ENDPOINT}/api/room/count`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
  });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// POST

// 액세스 토큰 발급
const postRefreshToken = (refreshToken) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.post(`${API_ENDPOINT}/api/refresh`, {
          refreshToken: refreshToken,
        })
      : axios.post(
          `${API_ENDPOINT}/api/refresh`,
          {
            refreshToken: refreshToken,
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

// PUT

// DELETE

export { getNavBar, getRoomCount, postRefreshToken };
