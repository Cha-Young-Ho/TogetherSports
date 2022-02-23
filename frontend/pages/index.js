import React from "react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return <h1>{console.log(session)}</h1>;
}
