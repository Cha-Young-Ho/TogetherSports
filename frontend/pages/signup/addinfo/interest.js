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
    { name: "축구", imgPath: "soccer.png" },
    { name: "야구", imgPath: "baseball.png" },
    { name: "농구", imgPath: "basketball.png" },
    { name: "당구", imgPath: "billiards.png" },
    { name: "탁구", imgPath: "tableTennis.png" },
    { name: "헬스", imgPath: "health.png" },
    { name: "자전거", imgPath: "bicycle.png" },
    { name: "골프", imgPath: "golf.png" },
    { name: "등산", imgPath: "hiking.png" },
    { name: "런닝", imgPath: "running.png" },
    { name: "배드민턴", imgPath: "badminton.png" },
    { name: "기타종목", imgPath: "etc.png" },
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
          <Link href="/signup/addinfo/personalinfo">
            <button className="prev-button">이전</button>
          </Link>
          <Link href="/signup/addinfo/activearea">
            <div onClick={BtnClickedNext} className="next-button">
              다음
            </div>
          </Link>
        </div>
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
          margin: 50px 0;
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
      `}</style>
    </>
  );
};

export default Interest;
