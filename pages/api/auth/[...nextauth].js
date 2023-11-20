/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-param-reassign */
import { setCookie } from "cookies-next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { axiosServer } from "@/helper/axios/axiosServer";

const nextAuthOptions = (req, res) => {
  return {
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

      FacebookProvider({
        name: "facebook",
        clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
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
            const responsive = await axiosServer.post("/authEmployee/login", data);

            if (responsive.data.token && responsive.data.refreshToken) {
              setCookie("TOKEN", responsive.data.token, { req, res });
              setCookie("REFRESH_TOKEN", responsive.data.refreshToken, { req, res });

              axiosServer.defaults.headers.Authorization = `Bearer ${responsive.data.token}`;
            }

            const getProfile = await axiosServer.get("/authEmployee/profile");

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

    session: {
      strategy: "jwt",
      maxAge: 2592000,
    },

    callbacks: {
      async jwt({ token, user, trigger, session }) {
        if (trigger === "update") {
          token = { ...token, ...session };
        }
        return { ...token, ...user };
      },

      async session({ session, token }) {
        session.user = token;
        // console.log("««««« session »»»»»", session);
        return session;
      },
    },

    pages: {
      signIn: "/log-in",
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
