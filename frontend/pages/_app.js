import React from "react";
import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";
import { wrapper } from "../store/rootReducer";

function MyApp({ Component }) {
  return (
    <>
      <NavigationBar />
      <Component />
    </>
  );
}

export default wrapper.withRedux(MyApp);
