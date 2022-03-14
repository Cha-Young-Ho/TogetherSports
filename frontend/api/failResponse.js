import { postRefreshToken } from "./etc";

// fail response를 switch를 통해 관리
const FailResponse = (codeNumber) => {
  switch (codeNumber) {
    case 1300:
      console.log("토큰이 존재하지 않습니다.");
    case 1301:
      console.log("변조된 토큰입니다.");
      postRefreshToken(localStorage.getItem("refreshToken")).then((res) => {
        if (res.code === 5000) {
          localStorage.setItem("accessToken", res.accessToken);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      });
    case 1302:
      console.log("만료된 토큰입니다.");
      postRefreshToken(localStorage.getItem("refreshToken")).then((res) => {
        if (res.code === 5000) {
          localStorage.setItem("accessToken", res.accessToken);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      });
    case 1303:
      console.log("권한이 없습니다.");
  }
};

export { FailResponse };
