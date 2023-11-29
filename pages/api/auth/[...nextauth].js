/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-param-reassign */
import { getCookie, setCookie } from "cookies-next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { maxAgeCookies } from "@/constant";
import { axiosServer } from "@/helper/axios/axiosServer";
import { randomTenDigits } from "@/helper/randomNumber";
import { splitString } from "@/helper/splitString";

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
            const responsive = await axiosServer.post("/authCustomers/login", data);

            setCookie("TOKEN", responsive.data.token, { req, res, maxAge: maxAgeCookies });
            setCookie("REFRESH_TOKEN", responsive.data.refreshToken, { req, res, maxAge: maxAgeCookies });

            axiosServer.defaults.headers.Authorization = `Bearer ${responsive.data.token}`;

            const getProfile = await axiosServer.get("/auth/profile");

            const user = await getProfile.data.payload;

            return user;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log("««««« error »»»»»", error);
            return null;
          }
        },
      }),
    ],

    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,

    session: {
      strategy: "jwt",
      maxAge: maxAgeCookies,
    },

    callbacks: {
      async signIn({ user, account }) {
        if (account.provider === "google") {
          const fullName = splitString(user?.name);
          const firstName = fullName?.firstString;
          const lastName = fullName?.lastString;
          const email = user?.email;
          const randomNumber = randomTenDigits();
          const phoneNumber = `null-${randomNumber}`;

          setCookie("email", email, { req, res, maxAge: maxAgeCookies });

          let data = {
            email,
            password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD,
          };

          try {
            const responsive = await axiosServer.post("/authCustomers/login", data);

            if (responsive.data.token && responsive.data.refreshToken) {
              setCookie("TOKEN", responsive.data.token, { req, res, maxAge: maxAgeCookies });
              setCookie("REFRESH_TOKEN", responsive.data.refreshToken, { req, res, maxAge: maxAgeCookies });
            }
          } catch (error) {
            try {
              data = { ...data, firstName, lastName, phoneNumber, isGoogle: true };
              const createUser = await axiosServer.post("/customers/create-google", data);

              if (createUser.data.statusCode === 200 && createUser.data.message === "success") {
                delete data.firstName;
                delete data.lastName;
                delete data.phoneNumber;
                delete data.isGoogle;

                const responsive = await axiosServer.post("/authCustomers/login", data);

                if (responsive.data.token && responsive.data.refreshToken) {
                  setCookie("TOKEN", responsive.data.token, { req, res, maxAge: maxAgeCookies });
                  setCookie("REFRESH_TOKEN", responsive.data.refreshToken, { req, res, maxAge: maxAgeCookies });
                }
              }
            } catch (err) {
              // eslint-disable-next-line no-console
              console.log("««««« err »»»»»", err);
              return false;
            }
          }
        }

        return user;
      },

      async jwt({ token, user, trigger, session }) {
        const getToken = getCookie("TOKEN", { req, res });
        const getRefreshToken = getCookie("REFRESH_TOKEN", { req, res });

        if (!getToken || !getRefreshToken) {
          return null;
        }

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
      error: "/error-auth",
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
