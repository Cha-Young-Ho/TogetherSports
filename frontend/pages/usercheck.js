import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoCheck } from "../api/members";
import { FailResponse } from "../api/failResponse";

const Usercheck = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // 첫 렌더 시 회원 유무를 파악 후 이미 회원일 시, 메인페이지로 이동
  // 회원이 아니라면, 세션에 담긴 각 정보를 저장 후 회원가입으로 이동
  useEffect(() => {
    if (session) {
      getUserInfoCheck(
        session.user.email,
        session.user.name,
        session.user.provider
      ).then((res) => {
        console.log(res.message);
        if (res.code === 5000) {
          dispatch({
            type: "AUTHDATA",
            payload: {
              userEmail: session.user.email,
              userName: session.user.name,
              provider: session.user.provider,
            },
          });
          router.replace("/signup/addinfo/personalinfo");
        } else {
          FailResponse(res.code);
        }
      });
    }
  }, [session]);

  return <></>;
};

export default Usercheck;
