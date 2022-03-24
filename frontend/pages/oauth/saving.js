import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Saving = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    const url = window.location.search;

    const urlParams = new URLSearchParams(url);

    setAccessToken((accessToken = urlParams.get("access_token")));
    setRefreshToken((refreshToken = urlParams.get("refresh_token")));
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.replace("/");
    }
  }, [accessToken, refreshToken]);

  return <></>;
};

export default Saving;
