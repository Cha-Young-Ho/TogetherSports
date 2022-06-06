import Login from "../components/login";
import Head from "next/head";

const login = () => {
  return (
    <>
      <Head>
        <title>투스 : 로그인</title>
      </Head>
      <div>
        <Login />
      </div>
    </>
  );
};

export default login;
