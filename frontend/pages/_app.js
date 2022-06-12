import React from "react";
import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";
import { wrapper } from "../store/rootReducer";

function MyApp({ Component }) {
  /* , pageProps: { session, ...pageProps }  
  {...pageProps}*/
  return (
    <>
      <NavigationBar />
      <Component />
    </>
  );
}

export default wrapper.withRedux(MyApp);
