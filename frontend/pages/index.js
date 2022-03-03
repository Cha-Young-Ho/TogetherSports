import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Banner from "../components/banner";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);
  return (
    <div>
      <Banner />
    </div>
  );
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
