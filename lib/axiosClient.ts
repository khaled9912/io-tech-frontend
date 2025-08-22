import axios from "axios";
console.log("auth", process.env.NEXT_PUBLIC_STRAPI_API_TOKEN);
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN as string}`,
  },
});
