import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfoNavBar from "../../../components/userInfoNavBar";
import Head from "next/head";
import { useRouter } from "next/router";

const Interest = () => {
  const dispatch = useDispatch();
  const preInputDatas = useSelector((state) => state.userRequestReducer);
  const router = useRouter();
  const [interests, setInterests] = useState({});
  const interestArray = [
    { name: "soccer", imgPath: "soccer.png" },
    { name: "baseball", imgPath: "baseball.png" },
    { name: "basketball", imgPath: "basketball.png" },
    { name: "billiards", imgPath: "billiards.png" },
    { name: "ping-pong", imgPath: "ping-pong.png" },
    { name: "gym", imgPath: "gym.png" },
    { name: "bicycle", imgPath: "bicycle.png" },
    { name: "golf", imgPath: "golf.png" },
    { name: "hiking", imgPath: "hiking.png" },
    { name: "running", imgPath: "running.png" },
    { name: "badminton", imgPath: "badminton.png" },
    { name: "etc", imgPath: "etc.png" },
  ];

  const changeInterests = (e, exercise) => {
    if (e.target.classList[1] === "clicked") {
      e.target.src = `/${exercise.imgPath}`;
      e.target.classList.remove("clicked");
    } else {
      if (
        Object.entries(interests).filter((exer) => {
          if (exer[1]) return true;
        }).length >= 5
      ) {
        alert("최대 5개 까지만 선택할 수 있습니다.");
        return;
      }
      e.target.src = `/blur_${exercise.imgPath}`;
      e.target.classList.add("clicked");
    }

    setInterests((prev) => ({
      ...prev,
      [e.target.id]: !interests[e.target.id],
    }));
  };

  const BtnClickedNext = (e) => {
    if (
      Object.entries(interests).filter((exer) => {
        if (exer[1]) return true;
      }).length === 0
    ) {
      e.preventDefault();
      alert("최소 1개의 종목을 선택하여야 합니다.");
      return;
    }

    dispatch({
      type: "INTERESTS",
      payload: {
        interests: interests,
      },
    });

    router.push("/signup/addinfo/activearea");
  };

  useEffect(() => {
    if (preInputDatas.userNickname === "") {
      alert("비정상적인 접근입니다.");
      window.history.back();
    }
  }, []);

  return (
    <>
      <Head>
        <title>회원 정보 입력</title>
      </Head>
      <div className="bg-container">
        <UserInfoNavBar
          personal_atv={"deactivation"}
          interest_atv={"activation"}
          activearea_atv={"deactivation"}
        />
        <div className="content-showbox">
          <p>관심있는 종목에 맞는 방을 추천 해드립니다!</p>
        </div>
        <div className="grid-interest">
          {interestArray.map((exercise, index) => {
            return (
              <button
                key={index}
                className="grid-items"
                onClick={(e) => changeInterests(e, exercise)}
              >
                <img id={exercise.name} src={`/${exercise.imgPath}`} />
              </button>
            );
          })}
        </div>

        <div className="button-wrapper">
          <Link href="/signup/addinfo/personalinfo" passHref>
            <button className="prev-button">이전</button>
          </Link>
          <div onClick={BtnClickedNext} className="next-button">
            다음
          </div>
        </div>
        <p className="warning-tag">
          * 이전을 누르면 입력했던 정보를 재입력 해야합니다.
        </p>
      </div>

      <style jsx>{`
        .bg-container {
          margin-top: 10px;
          border-top: 1px solid #e4e8eb;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 5px 0;
        }

        .content-showbox {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .grid-interest {
          display: grid;
          margin-top: 20px;
          grid-auto-rows: minmax(140px, auto);
          grid-template-columns: repeat(4, minmax(140px, auto));
          gap: 10px;
        }

        .grid-items {
          width: 100%;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 10px;
        }

        .grid-items:hover {
          transition-duration: 0.5s;
          transform: scale(1.2);
        }

        .grid-items img {
          width: 100%;
          height: 100%;
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

        .next-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
        }

        .warning-tag {
          margin-bottom: 50px;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
};

export default Interest;
