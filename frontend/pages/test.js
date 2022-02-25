import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const mock = new AxiosMockAdapter(axios);

const tempData = {
  signUpCheckValue: true,
};

mock
  .onGet("/user/check", {
    params: {
      userEmail: "asdfa@gmail.com",
      userName: "홍길동",
      provider: "google",
    },
  })
  .reply(() => {
    try {
      const result = tempData;
      return [200, result];
    } catch (error) {
      const result = `그런 값은 없습니다.`;
      return [200, result];
    }
  });

const Test = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  axios
    .get("/user/check", {
      params: {
        userEmail: "asdfa@gmail.com",
        userName: "홍길동",
        provider: "google",
      },
    })
    .then((res) => {
      // 성공적으로 true 값을 받는다면
      if (res.data.signUpCheckValue) {
        router.replace("/");
      }
    })
    .catch((error) => {
      // 없는 정보 입력 시
      router.replace("/xxx");
    });

  return <h1>Test</h1>;
};

export default Test;
