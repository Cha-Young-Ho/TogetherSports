import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useRouter } from "next/router";

const TestMock = () => {
  const mock = new AxiosMockAdapter(axios);

  const tempData = {
    signUpCheckValue: "true",
  };

  mock
    .onGet("/user/check", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWJiY2NAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0NjAzMDUzMSwiZXhwIjoxNjQ2MDMyMzMxfQ.aHoNnDVMjFMs3IaYUULkSEcqspFPZRjW40pWW13PAXA",
      },
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
        return [400, result];
      }
    });
};

const getUserInfoCheck = () => {
  const router = useRouter();
  //http://localhost:8080/test

  TestMock();

  axios
    .get("/user/check", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWJiY2NAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0NjAzMDUzMSwiZXhwIjoxNjQ2MDMyMzMxfQ.aHoNnDVMjFMs3IaYUULkSEcqspFPZRjW40pWW13PAXA",
      },
      params: {
        userEmail: "asdfa@gmail.com",
        userName: "홍길동",
        provider: "google",
      },
    })
    .then((res) => {
      // 성공적으로 true 값을 받는다면
      if (res.data.signUpCheckValue === "false") {
        router.replace("/");
      } else {
        router.replace("/signup/addinfo/personalinfo");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { TestMock, getUserInfoCheck };