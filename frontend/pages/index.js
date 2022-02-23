import { useSession, signIn } from "next-auth/react";
//import axios from "axios";

export default function Home() {
  const { data: session, loading } = useSession();

  // axios({
  //   method: 'GET',
  //   URL: '/user/'
  // })

  return <h1>{console.log(session)}</h1>;
}
