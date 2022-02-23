import React from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return <h1>Home</h1>;
}
