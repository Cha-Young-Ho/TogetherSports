import { useEffect } from "react";
import { getMyInfo, postUserRequest } from "../../../api/members";
import { useDispatch, useSelector } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";
import { FailResponse } from "../../../api/failResponse";
import Link from "next/link";
import { useRouter } from "next/router";
import Map from "../../../components/Map";
import Head from "next/head";

const ActiveArea = () => {
  const activeAreas = useSelector(
    (state) => state.saveActiveAreaReducer.activeAreas
  );
  const userRequestInfo = useSelector((state) => state.userRequestReducer);
  const router = useRouter();
  const dispatch = useDispatch();

  const func_getMyInfo = () => {
    getMyInfo()
      .then((res) => {
        if (res.status.code === 5000) {
          dispatch({
            type: "SAVEMYINFO",
            payload: {
              id: res.content.id,
              userEmail: res.content.userEmail,
              userName: res.content.userName,
              userNickname: res.content.userNickname,
              userBirth: res.content.userBirth,
              mannerPoint: res.content.mannerPoint,
              activeAreas: res.content.activeAreas,
              userProfileImagePath: res.content.userProfileImagePath,
              interests: res.content.interests,
              gender: res.content.gender,
              isInformationRequired: res.content.isInformationRequired,
            },
          });

          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: true,
            },
          });

          router.push("/");
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: false,
            },
          });
          FailResponse(res.status.code);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: "CHANGELOGINSTATUS",
            payload: {
              loginStatus: false,
            },
          });
          FailResponse(error.response.data.status.code, func_getMyInfo);
        }
      });
  };

  const exception = (e) => {
    if (
      userRequestInfo.userNickname === "" ||
      userRequestInfo.userBirth === "" ||
      activeAreas.length === 0 ||
      userRequestInfo.gender === "" ||
      userRequestInfo.interests === []
    ) {
      e.preventDefault();
      alert("입력되지 않은 정보가 있습니다.");
      return;
    }
  };

  const postUserRequestFunc = () => {
    postUserRequest(
      userRequestInfo.userNickname,
      userRequestInfo.userBirth,
      activeAreas,
      userRequestInfo.gender,
      userRequestInfo.userProfileExtension,
      userRequestInfo.imageSource,
      userRequestInfo.interests
    )
      .then((res) => {
        if (res.status.code === 5000) {
          func_getMyInfo();
        } else {
          FailResponse(res.status.code, postUserRequestFunc);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status)
          FailResponse(error.response.data.status.code, postUserRequestFunc);
      });
  };

  // 서버에 회원 추가정보입력 요청
  const callUserRequest = (e) => {
    exception(e);
    postUserRequestFunc();
  };

  useEffect(() => {
    const startException = () => {
      if (
        userRequestInfo.userNickname === "" &&
        !userRequestInfo.interests.length
      ) {
        alert("비정상적인 접근입니다.");
        router.replace("/");
        return;
      }
    };

    startException();
  }, []);

  return (
    <>
      <Head>
        <title>회원 정보 입력</title>
      </Head>
      <div className="container">
        <UserInfoNavBar
          personal_atv={"deactivation"}
          interest_atv={"deactivation"}
          activearea_atv={"activation"}
        />

        <div className="title">
          <p>원하는 활동지역을 선택해주세요! (최대 5개)</p>
        </div>

        <div className="map-wrapper">
          <Map />
        </div>

        <div className="button-wrapper">
          <Link href="/signup/addinfo/interest" passHref>
            <button className="prev-button">이전</button>
          </Link>
          <div className="button-done" onClick={callUserRequest}>
            완료
          </div>
        </div>
        <p className="warning-tag">
          * 이전을 누르면 입력했던 정보를 재입력 해야합니다.
        </p>
      </div>

      <style jsx>{`
        .container {
          margin-top: 10px;
          border-top: 1px solid #e4e8eb;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .title {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .title p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 5px 0;
        }

        .button-wrapper {
          margin-top: 50px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .prev-button {
          width: 120px;
          height: 40px;
          background-color: #d8d8d8;
          color: white;
          font-size: 1.5rem;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-right: 10px;
        }

        .button-done {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          border: 0;
          border-radius: 10px;
          outline: 0;
          cursor: pointer;
        }

        .map-wrapper {
          width: 800px;
          height: 500px;
          margin: 30px 0;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
        }

        .warning-tag {
          margin-top: 5px;
          margin-bottom: 50px;
        }
      `}</style>
    </>
  );
};

export default ActiveArea;
