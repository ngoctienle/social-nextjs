import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSerect: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      authorize: async (credentials) => {
        const res = await fetch(
          "http://api-meme-zendvn-01.herokuapp.com/api/member/login.php",
          {
            body: JSON.stringify(credentials),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.status === 200) {
          return {
            name: data.user.fullname,
            email: data.user.email,
          };
        } else if (data.status == 500) {
          throw new Error(data.error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      session.user.tag1 = session.user.name;

      // session.user.uid = token.sub;
      return session;
    },
  },
});
