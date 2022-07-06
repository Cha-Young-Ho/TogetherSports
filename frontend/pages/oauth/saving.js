import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../api/members";
import { FailResponse } from "../../api/failResponse";

const Saving = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [isFirst, setIsFirst] = useState();
  const dispatch = useDispatch();

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

          if (isFirst === "true") {
            router.replace("/signup/addinfo/personalinfo");
            return;
          }

          router.replace("/");
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

  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);

    setAccessToken(urlParams.get("access_token"));
    setRefreshToken(urlParams.get("refresh_token"));
    setIsFirst(urlParams.get("is_first"));
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken && isFirst) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      func_getMyInfo();
    }
  }, [isFirst]);

  return <></>;
};

export default Saving;
