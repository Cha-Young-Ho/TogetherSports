import { postRefreshToken } from "./etc";

// fail response를 switch를 통해 관리
const FailResponse = (codeNumber) => {
  switch (codeNumber) {
    case 1000:
      alert("잘못된 요청입니다.");
      break;
    case 1100:
      alert("유저를 찾을 수 없습니다.");
      break;
    case 1101:
      alert("이미 가입된 계정입니다. 로그인을 이용하세요.");
      router.replace("/");
      break;
    case 1102:
      alert("가입된 계정이 없습니다. 회원가입을 해주세요.");
      router.replace("/signup/oauth");
      break;
    case 1200:
      alert("해당 방을 찾을 수 없습니다.");
      break;
    case 1300:
      console.log("토큰이 존재하지 않습니다.");
      break;
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
      break;
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
      break;
    case 1303:
      alert("권한이 없습니다.");
      break;
    default:
      alert("알 수 없는 이유로 실패했습니다.");
      break;
  }
};

export { FailResponse };
