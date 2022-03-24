import { useRouter } from "next/router";
import { useEffect } from "react";

const Test = () => {
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    console.log("1111", pid);
  }, [pid]);

  return <p>Post: {pid}</p>;
};

export default Test;
