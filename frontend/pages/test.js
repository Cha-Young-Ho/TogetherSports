import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Test = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "PERSONALINFO",
      payload: {
        userNickname: "ad",
        userBirth: "20200303",
        gender: "male",
      },
    });
    console.log("redux에 값 넣었음.");
  });

  return <>Test</>;
};

export default Test;
