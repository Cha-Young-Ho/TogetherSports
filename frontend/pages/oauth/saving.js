import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Saving = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [isFirst, setIsFirst] = useState();

  useEffect(() => {
    const url = window.location.search;

    const urlParams = new URLSearchParams(url);

    setAccessToken((accessToken = urlParams.get("access_token")));
    setRefreshToken((refreshToken = urlParams.get("refresh_token")));
    setIsFirst((isFirst = urlParams.get("is-first")));
    // + is_first = true 면 서버에 provider, email, name 요청 후 받고 리덕스에 저장
    // 그 후 추가정보 페이지로 이동시킴
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (isFirst) {
        router.replace("signup/addinfo/personalinfo");
        return;
      }

      router.replace("/");
    }
  }, [accessToken, refreshToken]);

  return <></>;
};

export default Saving;
