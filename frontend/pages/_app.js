import React from "react";
import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store/rootReducer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NavigationBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
