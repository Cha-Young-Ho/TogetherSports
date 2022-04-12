import { postRefreshToken } from "./etc";

// fail response를 switch를 통해 관리
const FailResponse = (codeNumber) => {
  switch (codeNumber) {
    case 1000:
      alert("잘못된 요청입니다.");
      break;
    case 1001:
      alert("입력값 검증에 실패하였습니다.");
      break;
    case 1100:
      alert("유저를 찾을 수 없습니다.");
      break;
    case 1101: // 수정 필요
      alert("이미 가입된 유저입니다.");
      router.replace("/");
      break;
    case 1102:
      alert("추가정보가 입력되지 않은 유저입니다.");
      router.replace("/signup/addinfo/personalinfo");
      break;
    case 1103:
      alert("중복된 닉네임이 있습니다.");
      break;
    case 1104:
      alert("잘못된 데이터가 포함되었습니다.");
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
      alert("액세스 토큰이 만료되었습니다.");
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
      alert("리프레시 토큰이 만료되었습니다.");
      break;
    case 1304:
      alert("권한이 없는 토큰입니다.");
      break;
    case 1305:
      alert("리프레시 토큰 갱신, 액세스 토큰 갱신");
      break;
    case 1306:
      alert("리프레시 토큰 유지, 액세스 토큰 갱신");
      break;
    default:
      alert("알 수 없는 이유로 실패했습니다.");
      break;
  }
};

export { FailResponse };
