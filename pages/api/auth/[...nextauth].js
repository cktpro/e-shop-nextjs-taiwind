/* eslint-disable no-param-reassign */
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { axiosUser } from "@/helper/axios";

export default NextAuth({
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    GitHubProvider({
      name: "github",
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        const data = {
          email,
          password,
        };

        try {
          const responsive = await axiosUser.post("http://localhost:9000/authEmployee/login", data);

          if (responsive.data.token) {
            axiosUser.defaults.headers.Authorization = `Bearer ${responsive.data.token}`;
          }

          const getProfile = await axiosUser.get("http://localhost:9000/authEmployee/profile");

          if (getProfile.data.payload) {
            const user = await getProfile.data.payload;
            return user;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token = { ...token, ...session };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/log-in",
    signOut: "/log-in",
    error: "/log-in",
  },
});
