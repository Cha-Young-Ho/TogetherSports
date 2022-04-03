import axios from "axios";

/* 
유저 API 정리
*/

// GET

// 회원 유무 확인
const getUserInfoCheck = async (email, name, provi) => {
  //http://localhost:8080/test

  const promise = axios.get("http://localhost:8080/api/user/check", {
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

// 로그인 (삭제 예정)
const getUserLogin = async (email, name, provi) => {
  //http://localhost:8080/test

  const promise = axios.get("http://localhost:8080/api/login", {
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
  const promise = axios.get(
    "http://localhost:8080/api/user/duplication/nickname",
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
      },
      params: {
        userNickname: nickname,
      },
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 내 정보 조회
const getMyInfo = async () => {
  const promise = axios.get("http://localhost:8080/api/user", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 다른 회원 정보 조회
const getOtherInfo = async (nickname) => {
  const promise = axios.get("http://localhost:8080/api/other", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
  userNickname,
  userBirth,
  activeAreas,
  gender,
  userProfileExtension,
  imageSource,
  interests
) => {
  const promise = axios.post(
    "http://localhost:8080/api/user",
    {
      userNickname: userNickname,
      userBirth: userBirth,
      activeAreas: activeAreas,
      gender: gender,
      userProfileImage: {
        userProfileExtension: userProfileExtension,
        imageSource: imageSource,
      },
      interests: interests, //--> 5개까지
    },
    {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 로그아웃 요청
const deleteLogout = async () => {
  const promise = axios.post(
    "http://localhost:8080/api/logout",
    {
      refreshToken: localStorage.getItem("refreshToken"),
    },
    {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// PUT

// 회원 정보 수정
const putUpdateUserInfo = async (
  userEmail,
  userName,
  userNickname,
  userBirth,
  activeAreas,
  gender,
  userProfileImage,
  provider,
  interests
) => {
  const promise = axios.put(
    "http://localhost:8080/api/user",
    {
      userEmail: userEmail,
      userName: userName,
      userNickname: userNickname,
      userBirth: userBirth,
      mannerPoint: 10,
      activeAreas: activeAreas,
      gender: gender,
      userProfileImage: userProfileImage,
      provider: provider,
      interests: interests, //--> 5개까지
    },
    {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  );
  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// DELETE

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
