import React from "react";
import { getSession, signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return <h1>{console.log(session)}</h1>;
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
