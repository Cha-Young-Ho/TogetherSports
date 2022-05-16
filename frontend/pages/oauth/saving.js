import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Saving = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [isFirst, setIsFirst] = useState();
  const dispatch = useDispatch();

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
    }
  }, [isFirst]);

  return <></>;
};

export default Saving;
