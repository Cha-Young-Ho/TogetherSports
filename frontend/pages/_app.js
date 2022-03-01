import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";
import { SessionProvider, Provider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NavigationBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
