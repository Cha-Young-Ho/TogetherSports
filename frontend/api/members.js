import axios from "axios";

/* 
유저 API 정리
*/
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
// GET

// 닉네임 중복확인
const getNicknameDuplicationCheck = (nickname) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/user/duplication/nickname`, {
          params: {
            userNickname: nickname,
          },
        })
      : axios.get(`${API_ENDPOINT}/api/user/duplication/nickname`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
      ? axios.get(`${API_ENDPOINT}/api/user`)
      : axios.get(`${API_ENDPOINT}/api/user`, {
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
const getOtherInfo = (userId) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.get(`${API_ENDPOINT}/api/user/${userId}`)
      : axios.get(`${API_ENDPOINT}/api/user/${userId}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
      ? axios.post(`${API_ENDPOINT}/api/user`, {
          userNickname: userNickname,
          userBirth: userBirth,
          activeAreas: activeAreas,
          gender: gender,
          userProfileImage: {
            userProfileExtension: userProfileExtension,
            imageSource: imageSource,
          },
          interests: interests,
        })
      : axios.post(
          `${API_ENDPOINT}/api/user`,
          {
            userNickname: userNickname,
            userBirth: userBirth,
            activeAreas: activeAreas,
            gender: gender,
            userProfileImage: {
              userProfileExtension: userProfileExtension,
              imageSource: imageSource,
            },
            interests: interests,
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
      ? axios.post(`${API_ENDPOINT}/api/logout`, {
          refreshToken: localStorage.getItem("refreshToken"),
        })
      : axios.post(
          API_ENDPOINT + "api/logout",
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

// PATCH

// 매너지수 요청
const patchMannerPoint = (targetUserId, mannerPointStatus) => {
  const promise =
    localStorage.getItem("accessToken") === null
      ? axios.patch(`${API_ENDPOINT}/api/user/manner_point`, {
          targetUserId: targetUserId,
          mannerPointStatus: mannerPointStatus,
        })
      : axios.patch(
          `${API_ENDPOINT}/api/user/manner_point`,
          {
            targetUserId: targetUserId,
            mannerPointStatus: mannerPointStatus,
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

export {
  getNicknameDuplicationCheck,
  getMyInfo,
  getOtherInfo,
  postUserRequest,
  postLogOut,
  patchMannerPoint,
};
