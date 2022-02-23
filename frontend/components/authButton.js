import { signIn } from "next-auth/react";

const AuthButton = ({ classname, provider_id }) => {
  return (
    <button className={classname} onClick={() => signIn(provider_id)}></button>
  );
};

export default AuthButton;
