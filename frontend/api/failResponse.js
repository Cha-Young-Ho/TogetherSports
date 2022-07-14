import { postRefreshToken } from "./etc";

// fail response를 switch를 통해 관리
const FailResponse = (codeNumber, prelastingToDo) => {
  switch (codeNumber) {
    case 1000:
      alert("잘못된 요청입니다.");
      break;
    case 1001:
      alert("입력값 검증에 실패하였습니다.");
      break;
    case 1002:
      alert("잘못된 데이터가 포함된 요청입니다.");
      break;
    case 1100:
      alert("유저를 찾을 수 없습니다.");
      break;
    case 1101: // 수정 필요
      alert("이미 가입된 유저입니다.");
      window.location.href = "/";
      break;
    case 1102:
      alert("추가 정보 입력 후 이용하실 수 있습니다.");
      break;
    case 1103:
      alert("중복된 닉네임입니다.");
      break;
    case 1104:
      alert("잘못된 데이터가 포함되었습니다.");
      break;
    case 1105:
      alert("이미 매너지수를 올려서 올릴 수 없습니다.");
      break;
    case 1106:
      alert("이미 매너지수를 내려서 내릴 수 없습니다.");
      break;
    case 1200:
      alert("해당 방을 찾을 수 없습니다.");
      break;
    case 1201:
      alert("인원이 가득 찼습니다.");
      break;
    case 1202:
      alert("해당 방의 일정 시간이 이미 지났습니다.");
      break;
    case 1203:
      console.log("누군가 방을 나갔습니다.");
      break;
    case 1204:
      console.log("누군가 강퇴당했습니다.");
      break;
    case 1205:
      alert("누군가 모임에 참여했습니다!");
      break;
    case 1206:
      console.log("누군가 채팅을 보냈습니다.");
      break;
    case 1207:
      console.log("방 정보가 업데이트 되었습니다.");
      break;
    case 1208:
      console.log("방장이 변경 되었습니다.");
      break;
    case 1209:
      alert("방에 참가 완료했습니다.");
      break;
    case 1210:
      alert("방에 참가 실패했습니다.");
      break;
    case 1217:
      alert("해당 기능을 수행할 권한이 없습니다.");
      break;
    case 1218:
      alert("현재 참여 인원보다 많은 인원만 입력 가능합니다.");
      break;
    case 1300:
      console.log("토큰이 존재하지 않습니다.");
      break;
    case 1301:
      postRefreshToken(localStorage.getItem("refreshToken"))
        .then((res) => {
          if (res.status.code === 5000) {
            localStorage.setItem("accessToken", res.content.accessToken);
            prelastingToDo();
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        })
        .catch((error) => {
          FailResponse(error.response.data.status.code);
        });
      break;
    case 1302:
      postRefreshToken(localStorage.getItem("refreshToken"))
        .then((res) => {
          if (res.status.code === 5000) {
            localStorage.setItem("accessToken", res.content.accessToken);
            prelastingToDo();
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        })
        .catch((error) => {
          FailResponse(error.response.data.status.code);
        });
      break;
    case 1303:
      alert("로그인이 만료되었습니다. 다시 시도해 주세요.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
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
    case 1307:
      alert("유효하지 않은 리프레시 토큰입니다.");
      break;
    case 1400:
      alert("해당 행정구역은 하위 행정구역이 없습니다.");
      break;
    default:
      alert("오류가 발생했습니다. 재시도 후에도 안된다면 문의부탁드립니다.");
      break;
  }
};

export { FailResponse };
