import React from "react";
import Banner from "../components/main/banner";
import HotRoom from "../components/hotRoom";
import Footer from "../components/main/footer";
import Head from "next/head";
import Main1 from "../components/main/main1";

export default function Home() {
  return (
    <>
      <Head>
        <title>Together Sports : 투스</title>
      </Head>
      <div>
        <Banner />
        <Main1 />
        {/* <HotRoom /> */}
        <Footer />
      </div>
    </>
  );
}
