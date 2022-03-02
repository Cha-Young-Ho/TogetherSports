import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Test = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "REQUESTUSERS" });
    console.log();
  });

  return <>Test</>;
};

export default Test;
