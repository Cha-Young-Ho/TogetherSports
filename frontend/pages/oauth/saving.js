import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../api/members";

const Saving = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [isFirst, setIsFirst] = useState();

  useEffect(() => {
    const url = window.location.search;

    const urlParams = new URLSearchParams(url);

    setAccessToken((accessToken = urlParams.get("access_token")));
    setRefreshToken((refreshToken = urlParams.get("refresh_token")));
    setIsFirst(urlParams.get("is_first"));
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (isFirst) {
        router.replace("/signup/addinfo/personalinfo");
        return;
      }

      getMyInfo().then((res) => {
        if (res.status.code === 5000) {
          console.log(res.status.message);
          dispatch({
            type: "SAVEMYINFO",
            payload: {
              userEmail: res.content.userEmail,
              userName: res.content.userName,
              userNickname: res.content.userNickname,
              userBirth: res.content.userBirth,
              gender: res.content.gender,
              userProfileImagePath: res.content.userProfileImagePath,
              activeAreas: res.content.activeAreas.map((el) => el),
              interests: res.content.interests.map((el) => el),
              mannerPoint: res.content.mannerPoint,
            },
          });
          router.replace("/");
        } else {
          FailResponse(res.status.code);
        }
      });
    }
  }, [accessToken, refreshToken]);

  return <></>;
};

export default Saving;
