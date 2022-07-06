import { FailResponse } from "./failResponse";
import { getMyInfo } from "./members";

const func_getMyInfo = () => {
  getMyInfo()
    .then((res) => {
      if (res.status.code === 5000) {
        dispatch({
          type: "SAVEMYINFO",
          payload: {
            id: res.content.id,
            userEmail: res.content.userEmail,
            userName: res.content.userName,
            userNickname: res.content.userNickname,
            userBirth: res.content.userBirth,
            mannerPoint: res.content.mannerPoint,
            activeAreas: res.content.activeAreas.map((el) => el),
            userProfileImagePath: res.content.userProfileImagePath,
            interests: res.content.interests.map((el) => el),
            gender: res.content.gender,
            isInformationRequired: res.content.isInformationRequired,
          },
        });

        dispatch({
          type: "CHANGELOGINSTATUS",
          payload: {
            loginStatus: true,
          },
        });
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        dispatch({
          type: "CHANGELOGINSTATUS",
          payload: {
            loginStatus: false,
          },
        });
        FailResponse(res.status.code, func_getMyInfo);
      }
    })
    .catch((error) => {
      if (error?.response?.data?.status) {
        dispatch({
          type: "CHANGELOGINSTATUS",
          payload: {
            loginStatus: false,
          },
        });

        FailResponse(error.response.data.status.code, func_getMyInfo);
      }
    });
};

export { func_getMyInfo };
