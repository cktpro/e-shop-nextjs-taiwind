import axios from "axios";

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_USER,
  headers: { "Content-Type": "application/json" },
});

export { axiosServer };
