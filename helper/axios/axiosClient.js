import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { signOut } from "next-auth/react";

import { maxAgeCookies } from "@/constant";

import { refreshAccessToken } from "./TokenService";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_USER,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = getCookie("TOKEN");

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    const refreshToken = getCookie("REFRESH_TOKEN");

    if (error?.response?.status === 401 && error?.response?.data === "Unauthorized" && refreshToken) {
      const newToken = await refreshAccessToken(refreshToken);

      if (newToken !== "Token refresh failed") {
        setCookie("TOKEN", newToken, { maxAge: maxAgeCookies });

        originalConfig.sent = true;

        originalConfig.headers = {
          ...originalConfig.headers,
          Authorization: `Bearer ${newToken}`,
        };
      } else {
        deleteCookie("TOKEN");
        deleteCookie("REFRESH_TOKEN");
        deleteCookie("email");

        signOut({ callbackUrl: "/log-in" });
      }

      return axiosClient(originalConfig);
    }

    return Promise.reject(error);
  },
);

export { axiosClient };
