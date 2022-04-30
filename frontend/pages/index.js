import React from "react";
import Banner from "../components/banner";
import HotRoom from "../components/hotRoom";
import Footer from "../components/footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Together Sports : 투스</title>
      </Head>
      <div>
        <Banner />
        {/* <HotRoom /> */}
        <Footer />
      </div>
    </>
  );
}
