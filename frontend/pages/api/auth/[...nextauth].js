import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

export default NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),

    KakaoProvider({
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
  ],

  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.SECRET,

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;

      return session;
    },

    async redirect() {
      return Promise.resolve("/usercheck");
    },
  },
});
