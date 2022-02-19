import "../styles/globals.css";
import NavigationBar from "../components/navigationBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
