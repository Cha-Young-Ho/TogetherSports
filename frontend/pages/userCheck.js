import { useRouter } from "next/router";
import { getUserInfoCheck } from "../api/axios";

const Usercheck = () => {
  const router = useRouter();

  getUserInfoCheck().then((res) => {
    if (res.data.signUpCheckValue === "false") {
      router.replace("/");
    } else {
      router.replace("/signup/addinfo/personalinfo");
    }
  });

  return <></>;
};

export default Usercheck;
