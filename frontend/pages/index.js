import React from "react";
import Banner from "../components/main/banner";
import Footer from "../components/main/footer";
import Head from "next/head";
import Main1 from "../components/main/main1";
import Main2 from "../components/main/main2";
import Main3 from "../components/main/main3";
import Link from "next/link";

export default function Home() {
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
          <Link href="/room/createroom/roomsetting">
            <button className="fadein">🔥방 생성하러 가기🔥</button>
          </Link>
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
