import { postRefreshToken } from "./etc";
import { getMyInfo } from "../api/members";

const getInfoMethod = () => {
  getMyInfo()
    .then((res) => {
      if (res.status.code === 5000) {
        dispatch({
          type: "SAVEMYINFO",
          payload: {
            userEmail: res.content.userEmail,
            userName: res.content.userName,
            userNickname: res.content.userNickname,
            userBirth: res.content.userBirth,
            gender: res.content.gender,
            userProfileImagePath:
              res.content.userProfileImagePath === ""
                ? "/base_profileImage.jpg"
                : res.content.userProfileImagePath,
            activeAreas: res.content.activeAreas.map((el) => el),
            interests: res.content.interests.map((el) => el),
            mannerPoint: res.content.mannerPoint,
            isInformationRequired: res.content.isInformationRequired,
          },
        });
      } else {
        FailResponse(res.status.code);
      }

      dispatch({
        type: "CHANGELOGINSTATUS",
        payload: {
          loginStatus: "true",
        },
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: "CHANGELOGINSTATUS",
          payload: {
            loginStatus: "false",
          },
        });

        FailResponse(error.response.data.status.code);
      }
    });
};

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
    case 1201:
      alert("인원이 가득 찼습니다.");
      break;
    case 1202:
      alert("예정 시간이 지난 방입니다.");
      break;
    case 1203:
      alert("누군가 방을 나갔습니다.");
      break;
    case 1204:
      alert("누군가 강퇴당했습니다.");
      break;
    case 1205:
      alert("누군가 모임에 참여했습니다!");
      break;
    case 1206:
      alert("누군가 채팅을 보냈습니다.");
      break;
    case 1207:
      alert("방 정보가 업데이트 되었습니다.");
      break;
    case 1208:
      alert("방장이 변경 되었습니다.");
      break;
    case 1209:
      alert("방에 참가 완료했습니다.");
      break;
    case 1210:
      alert("방에 참가 실패했습니다.");
      break;
    case 1300:
      console.log("토큰이 존재하지 않습니다.");
      break;
    case 1301:
      console.log("변조된 토큰입니다.");
      postRefreshToken(localStorage.getItem("refreshToken")).then((res) => {
        if (res.status.code === 5000) {
          localStorage.setItem("accessToken", res.content.accessToken);
          getInfoMethod();
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      });
      break;
    case 1302:
      alert("액세스 토큰이 만료되었습니다.");
      postRefreshToken(localStorage.getItem("refreshToken")).then((res) => {
        if (res.status.code === 5000) {
          localStorage.setItem("accessToken", res.content.accessToken);
          getInfoMethod();
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
    case 1307:
      alert("유효하지 않은 리프레시 토큰입니다.");
      break;
    case 1400:
      alert("해당 행정구역은 하위 행정구역이 없습니다.");
      break;
    default:
      alert("알 수 없는 이유로 실패했습니다.");
      break;
  }
};

export { FailResponse };
