import { getUserLogin } from "../api/members";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React from "react";

const UserLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserLogin()
      .then((res) => {
        console.log(res.data.message);
        if (res.data.code === "5000") {
          localStorage.getItem("accessToken", res.data.accessToken);
          localStorage.getItem("refreshToken", res.data.refreshToken);
          dispatch({
            type: "SAVENICKNAME",
            payload: {
              userNickname: res.data.userNickname,
            },
          });
          router.replace("/");
          console.log("로그인 성공");
        } else {
          alert("가입된 계정이 없습니다. 회원가입을 해주세요.");
          router.replace("/signup/oauth");
        }
      })
      .catch(() => {
        console.log(error);
      });
  });

  return <></>;
};

export default UserLogin;
