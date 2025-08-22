import { axiosClient } from "./axiosClient";

export const getServices = (locale: string) =>
  axiosClient.get("/api/service-items", {
    params: { locale, populate: "*" },
  });

export const getServiceById = async (
  id: string,
  locale: string,
  page = 1,
  pageSize = 5,
) => {
  return axiosClient.get(`/api/service-items/${id}`, {
    params: {
      locale,
      populate: "*",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    },
  });
};

export const postEmailSubscription = (email: string) =>
  axiosClient.post("api/newsletter-subscribers", { data: { email } });

export const getTeams = () =>
  axiosClient.get("/api/team-members", {
    params: { populate: "*" },
  });

export const getSlides = () =>
  axiosClient.get("/api/hero-section-contents", {
    params: { populate: "*" },
  });

export const getClients = () =>
  axiosClient.get("/api/client-profiles", {
    params: { populate: "*" },
  });
