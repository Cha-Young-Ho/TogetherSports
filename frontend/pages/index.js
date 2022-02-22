import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <div>
        {!loading ? (
          <div>
            {!session ? (
              <button onClick={signIn}>Sign In</button>
            ) : (
              <>
                <div>{console.log(session)}</div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
