import React from "react";
import Banner from "../components/main/banner";
import Footer from "../components/main/footer";
import Head from "next/head";
import Main1 from "../components/main/main1";
import Main2 from "../components/main/main2";
import Main3 from "../components/main/main3";
import { getRoomCount } from "../api/etc";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FailResponse } from "../api/failResponse";
import router from "next/router";

export default function Home() {
  const dispatch = useDispatch();

  const myInfo = useSelector((state) => state.myInfoReducer);

  useEffect(() => {
    const func_getRoomCount = () => {
      getRoomCount()
        .then((res) => {
          if (res.status.code === 5000) {
            dispatch({
              type: "SAVEROOMCOUNT",
              payload: {
                roomCount: res.content.count,
              },
            });
          }
        })
        .catch((error) => {
          if (error?.response?.data?.status) {
            FailResponse(error.response.data.status.code, func_getRoomCount);
            return;
          }
        });
    };

    func_getRoomCount();
  }, []);

  return (
    <>
      <Head>
        <title>Together Sports : 투스</title>
      </Head>
      <div className="container">
        <div>
          <Banner />
          <Main1 />
          <Main2 />
          <Main3 />
          <button
            className="fadein"
            onClick={(e) => {
              if (myInfo.id === 0) {
                e.preventDefault();
                alert("로그인 및 추가정보가 필요한 기능입니다.");
                return;
              }
              router.push("/room/createroom/roomsetting");
            }}
          >
            🔥방 생성하러 가기🔥
          </button>
        </div>
        <Footer />
      </div>
      <style jsx>{`
        button {
          width: 310px;
          height: 75px;
          border: none;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-image: linear-gradient(to bottom, #6db152, #2b7a5f);
          font-size: 2.5rem;
          letter-spacing: 1px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          position: -webkit-sticky; // safari
          position: sticky;
          bottom: 30px;
          left: calc((100% - 310px) / 2);
          margin-bottom: 50px;
          animation: zoomin 0.5s ease-in-out;
        }

        @keyframes zoomin {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
