import React from "react";
import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";
import { wrapper } from "../store/rootReducer";
import Head from "next/head";

function MyApp({ Component }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=1920, height=device-height, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="author" content="Together Sports 개발팀" />
        <meta
          name="description"
          content="익명의 동네 사람들과 운동 파트너를 구할 수 있게 도와주는 웹 기반 서비스입니다."
        />

        <link rel="shortcut icon" href="/favicon_16x16.ico" />
        <link rel="icon" href="/favicon_16x16.ico" />
      </Head>
      <NavigationBar />
      <Component />
    </>
  );
}

export default wrapper.withRedux(MyApp);
