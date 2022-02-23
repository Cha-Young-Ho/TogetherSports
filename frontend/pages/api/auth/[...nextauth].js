import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    KakaoProvider({
      name: "kakao-oauth-login", //해당 인증방식의 이름
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      authorization: {
        url: "https://kauth.kakao.com/oauth/authorize",
        params: {
          //동의 항목들
          scope: "profile_nickname account_email",
        },
      },
      token: {
        url: "https://kauth.kakao.com/oauth/token",
        request: async ({ provider, params, checks, client }) => {
          const excangeBody = {
            client_id: provider.clientId,
            client_secret: provider.clientSecret,
          };
          return {
            tokens: await client.oauthCallback(
              provider.callbackUrl,
              params,
              checks,
              { excangeBody }
            ),
          };
        },
      },
      checks: ["state"],
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      <div>{console.log(token)}</div>;
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      <div>{console.log(session)}</div>;
      return session;
    },

    async redirect({ url, _baseUrl }) {
      return Promise.resolve("/");
    },
  },
});
