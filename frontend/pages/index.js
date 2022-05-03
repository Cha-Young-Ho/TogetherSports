import React from "react";
import Banner from "../components/main/banner";
// import HotRoom from "../components/hotRoom";
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
            <button>🔥방 생성하러 가기🔥</button>
          </Link>
        </div>

        {/* <HotRoom /> */}
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
          font-size: 3rem;
          font-weight: bold;
          color: white;
          cursor: pointer;
          position: -webkit-sticky; // safari
          position: sticky;
          bottom: 30px;
          left: 50%;
          transform: translate(-50%, 0);
          margin-bottom: 50px;
        }
      `}</style>
    </>
  );
}
