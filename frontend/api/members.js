import axios from "axios";

/* 
유저 API 정리
*/

// GET

// 회원 유무 확인
const getUserInfoCheck = async (email, name, provi) => {
  //http://localhost:8080/test

  const promise = axios.get("http://localhost:8080/user/check", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      userEmail: email,
      userName: name,
      provider: provi,
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 로그인
const getUserLogin = async (email, name, provi) => {
  //http://localhost:8080/test

  const promise = axios.get("http://localhost:8080/login", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      userEmail: email,
      userName: name,
      provider: provi,
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 닉네임 중복확인
const getDuplicationCheck = async (nickname) => {
  const promise = axios.get("http://localhost:8080/duplication", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    params: {
      userNickName: nickname,
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 내 정보 조회
const getMyInfo = async () => {
  const promise = axios.get("http://localhost:8080/user", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 다른 회원 정보 조회
const getOtherInfo = async (nickname) => {
  const promise = axios.get("http://localhost:8080/other", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
    params: {
      userNickName: nickname,
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// POST

//회원가입 요청
const postUserRequest = async (
  activeAreas,
  gender,
  interests,
  mannerPoint,
  provider,
  userBirthDay,
  userBirthMonday,
  userBirthYear,
  userEmail,
  userName,
  userNickname,
  userProfileImage
) => {
  const promise = axios.post("http://localhost:8080/user", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    },
    data: {
      mannerPoint: mannerPoint,
      userEmail: userEmail,
      userName: userName,
      userNickname: userNickname,
      userBirthYear: userBirthYear,
      userBirthMonth: userBirthMonday,
      userBirthDay: userBirthDay,
      mannerPoint: 10,
      activeAreas: activeAreas,
      gender: gender,
      userProfileImage: userProfileImage,
      provider: provider,
      interests: interests, //--> 5개까지
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// PUT

// 회원 정보 수정
const putUpdateUserInfo = async () => {
  //http://localhost:8080/test

  const promise = axios.put("http://localhost:8080/user", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
    params: {
      // 굉장히 많음
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// DELETE

// 로그아웃 요청
const deleteLogout = async () => {
  //http://localhost:8080/test

  const promise = axios.delete("http://localhost:8080/logout", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

export {
  getUserInfoCheck,
  getDuplicationCheck,
  getUserLogin,
  getMyInfo,
  getOtherInfo,
  postUserRequest,
  putUpdateUserInfo,
  deleteLogout,
};
