import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoCheck } from "../api/members";

const Usercheck = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // 첫 렌더 시 회원 유무를 파악 후 이미 회원일 시, 메인페이지로 이동
  // 회원이 아니라면, 세션에 담긴 각 정보를 저장 후 회원가입으로 이동
  useEffect(() => {
    getUserInfoCheck().then((res) => {
      console.log(res.data.message);
      if (res.data.code === "5000") {
        router.replace("/");
        alert("이미 가입된 계정입니다. 로그인을 이용하세요.");
      } else {
        dispatch({
          type: "AUTHDATA",
          payload: {
            userEmail: session.user.email,
            userName: session.user.name,
            provider: session.user.provider,
          },
        });
        router.replace("/signup/addinfo/personalinfo");
      }
    });
  }, [session]);

  return <></>;
};

export default Usercheck;
