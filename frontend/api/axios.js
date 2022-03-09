import axios from "axios";
import { useRouter } from "next/router";

/* 
axios 모듈 모음
*/

// 유저가 이미 가입되어 있는지 확인하는 모듈
const getUserInfoCheck = async () => {
  //http://localhost:8080/test

  const promise = axios.get("/user/check", {
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
  });

  return promise;
};

//닉네임 중복체크
const getDuplicationCheck = () => {
  const promise = axios.get("/duplication", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      userNickName: nickname,
    },
  });

  const dataPromise = promise
    .then((res) => {
      res.data;
      //사용가능한 닉네임이면
      // if (res.data.duplicationCheck === "true") {
      //   setNickname(e.target.value);
      // } else {
      //   alert("이미 사용중인 닉네임입니다.");
      //   setNickname("");
      // }
    })
    .catch((error) => {
      console.log(error);
    });

  return dataPromise;
};

// 여기에 어떤 화면이든 로컬에 담긴 토큰 확인하고,
// 로컬에 토큰이 없으면 비 로그인 상태로
// 로컬에 토큰이 있으면, 서버에 토큰 전달하고,
// 서버가 토큰이 올바른 정보가 아니라고 하면 정보주고
// 만약 여기서 토큰이 틀린 값이면 refresh 토큰도 보내기
// 만약 refresh 토큰도 틀리다면 새로 로그인하게 유도
const sendTokensForLogin = () => {
  const router = useRouter();
  //http://localhost:8080/test

  const promise = axios.get("/", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      sessionTokens: "tokens",
    },
  });

  const dataPromise = promise
    .then((res) => {
      res.data;
      // 서버가 보내준 토큰과 일치하는 경우
      // if (res.data.XXXX === "false") {
      //   router.replace("/");
      // } else {
      //   router.replace("/signup/addinfo/personalinfo");
      // }
    })
    .catch((error) => {
      console.log(error);
    });

  return dataPromise;
};

//회원가입 요청
const postUserRequest = () => {
  const router = useRouter();
  //http://localhost:8080/test

  const promise = axios.get("/", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      sessionTokens: "tokens",
    },
  });

  const dataPromise = promise
    .then((res) => {
      res.data;
      // 서버가 보내준 토큰과 일치하는 경우
      // if (res.data.XXXX === "false") {
      //   router.replace("/");
      // } else {
      //   router.replace("/signup/addinfo/personalinfo");
      // }
    })
    .catch((error) => {
      console.log(error);
    });

  return dataPromise;
};

export { getUserInfoCheck };
