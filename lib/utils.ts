import { axiosClient } from "./axiosClient";

export const getServices = (locale: string) =>
  axiosClient.get("/api/service-items", {
    params: { locale, populate: "*" },
  });

export const getServiceById = async (id: string) => {
  return axiosClient.get(`/api/service-items/${id}`);
};

export const postEmailSubscription = (email: string) =>
  axiosClient.post("api/newsletter-subscribers", { data: { email } });

export const getTeams = async (
  page: number = 1,
  pageSize: number = 10,
  locale?: string,
) => {
  return axiosClient.get(`/api/team-members`, {
    params: {
      locale,
      populate: "*",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    },
  });
};

export const getSlides = () =>
  axiosClient.get("/api/hero-section-contents", {
    params: { populate: "*" },
  });

export const getClients = () =>
  axiosClient.get("/api/client-profiles", {
    params: { populate: "*" },
  });
