import React from "react";
import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";
import { wrapper } from "../store/rootReducer";
import Head from "next/head";

function MyApp({ Component }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon_16x16.ico" />
        <link rel="icon" href="/favicon_16x16.ico" />
      </Head>
      <NavigationBar />
      <Component />
    </>
  );
}

export default wrapper.withRedux(MyApp);
