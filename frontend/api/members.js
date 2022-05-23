import axios from "axios";

/* 
유저 API 정리
*/

// GET

// 닉네임 중복확인
const getNicknameDuplicationCheck = (nickname) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get("http://localhost:8080/api/user/duplication/nickname", {
          params: {
            userNickname: nickname,
          },
        })
      : axios.get("http://localhost:8080/api/user/duplication/nickname", {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
          },
          params: {
            userNickname: nickname,
          },
        });

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 내 정보 조회
const getMyInfo = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get("http://localhost:8080/api/user")
      : axios.get("http://localhost:8080/api/user", {
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
const getOtherInfo = (nickname) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get("http://localhost:8080/api/other", {
          params: {
            userNickname: nickname,
          },
        })
      : axios.get("http://localhost:8080/api/other", {
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

// 회원 추가정보입력 요청 및 회원 정보 수정
const postUserRequest = (
  userNickname,
  userBirth,
  activeAreas,
  gender,
  userProfileExtension,
  imageSource,
  interests
) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.post("http://localhost:8080/api/user", {
          userNickname: userNickname,
          userBirth: userBirth,
          activeAreas: activeAreas,
          gender: gender,
          userProfileImage: {
            userProfileExtension: userProfileExtension,
            imageSource: imageSource,
          },
          interests: interests, //--> 5개까지
        })
      : axios.post(
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
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// 로그아웃 요청
const postLogOut = () => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.post("http://localhost:8080/api/logout", {
          refreshToken: localStorage.getItem("refreshToken"),
        })
      : axios.post(
          "http://localhost:8080/api/logout",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Accept: "*/*",
            },
          }
        );

  const dataPromise = promise.then((res) => res.data);

  return dataPromise;
};

// DELETE

export {
  getNicknameDuplicationCheck,
  getMyInfo,
  getOtherInfo,
  postUserRequest,
  postLogOut,
};
