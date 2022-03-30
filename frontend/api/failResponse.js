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
    case 1101: // 수정 필요
      alert("이미 가입된 계정입니다. 로그인을 이용하세요.");
      router.replace("/");
      break;
    case 1102: // 수정 필요
      alert("가입된 계정이 없습니다. 회원가입을 해주세요.");
      router.replace("/signup/oauth");
      break;
    case 1103:
      alert("중복된 닉네임이 있습니다.");
      break;
    case 1104:
      alert("잘못된 데이터가 포함되었습니다.");
      break;
    case 1105: // 페이지 이동 여부에 대해선 수정 할 수도 있음
      alert("회원 정보 추가 입력이 필요합니다.");
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
