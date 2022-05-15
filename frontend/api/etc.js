import axios from "axios";

/* 
기타 API 정리
*/

// GET

// 인기있는 방 조회
const getPopulariyRooms = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get("http://localhost:8080/api/rooms/popularity")
      : axios.get("http://localhost:8080/api/rooms/popularity", {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 네비게이션 바 요청
const getNavBar = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get("http://localhost:8080/api/nav")
      : axios.get("http://localhost:8080/api/nav", {
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

// 액세스 토큰 발급
const postRefreshToken = (refreshToken) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.post("http://localhost:8080/api/refresh", {
          refreshToken: refreshToken,
        })
      : axios.post(
          "http://localhost:8080/api/refresh",
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

export { getPopulariyRooms, getNavBar, postRefreshToken };
