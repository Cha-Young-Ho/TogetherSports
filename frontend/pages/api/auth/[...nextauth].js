import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
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
    encryption: true,
  },
  theme: {
    colorScheme: "auto",
    brandColor: "",
    logo: "",
  },
  //secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
    // redirect: async (url, _baseUrl) => {
    //   if (url.startsWith(_baseUrl)) return url;
    //   else if (url.startsWith("/")) return new URL(url, _baseUrl).toString();
    //   return _baseUrl;
    // },
    //   if (url === "/profile") {
    //     return Promise.resolve("/");
    //   }
    //   return Promise.resolve("/");
    // },
  },
});
