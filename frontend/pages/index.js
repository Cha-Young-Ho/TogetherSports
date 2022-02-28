import React, { useEffect } from "react";
import { getSession, signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);
  return <h1>this is mainPage</h1>;
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/xxx",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
