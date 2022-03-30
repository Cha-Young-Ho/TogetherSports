import { getUserLogin } from "../api/members";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { useSession } from "next-auth/react";
import { FailResponse } from "../api/failResponse";

const UserLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      getUserLogin(session.user.email, session.user.name, session.user.provider)
        .then((res) => {
          console.log(res.status.message);
          if (res.status.code === 5000) {
            localStorage.setItem("accessToken", res.content.accessToken);
            localStorage.setItem("refreshToken", res.content.refreshToken);
            dispatch({
              type: "SAVENICKNAME",
              payload: {
                userNickname: res.content.userNickname,
              },
            });
            router.replace("/");
            console.log("로그인 성공");
          } else {
            FailResponse(res.status.code);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [session]);

  return <></>;
};

export default UserLogin;
