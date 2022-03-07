import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Banner from "../components/banner";
import HotRoom from "../components/hotRoom";
import Footer from "../components/footer";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);
  return (
    <div>
      <Banner />
      <HotRoom />
      <Footer />
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
