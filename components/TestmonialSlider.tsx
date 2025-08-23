"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import {
  fetchClients,
  selectClients,
  selectClientsLoading,
} from "@/store/slices/clientSlice";
import { useLocale, useTranslations } from "next-intl";
import { useAppDispatch } from "@/store";
import PageLoader from "./PageLoader";

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const clients = useSelector(selectClients);
  const loading = useSelector(selectClientsLoading);
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const isAr = locale === "ar";
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Safe translation hook usage
  let t;
  try {
    t = useTranslations("clients");
  } catch {
    t = (key: string) => key;
  }

  const prevSlide = () =>
    setCurrent(current === 0 ? clients.length - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === clients.length - 1 ? 0 : current + 1);

  if (loading || !clients || clients.length === 0) return <PageLoader />;

  const client = clients[current];

  return (
    <div className="relative mb-4 rounded-lg bg-primary p-8">
      <div className="md:mx-16">
        <h2 className="mb-2 text-2xl font-bold">{t("title")}</h2>
        <p className="mb-8 max-w-2xl text-gray-200">{t("bio")}</p>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          {/* Client Image */}
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={client?.logo?.url ?? "/placeholder.png"}
              alt={client?.logo?.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>

          {/* Quote */}
          <div className="flex-1">
            <p className="mb-4 text-gray-200">
              "{locale === "ar" ? client?.testimonialAr : client?.testimonialEn}
              "
            </p>
            <h3 className="font-bold">
              {locale === "ar" ? client?.clientNameAr : client?.clientNameEn}
            </h3>
            <p className="text-sm text-gray-400">
              {locale === "ar" ? client?.clientTitleAr : client?.clientTitleEn}
            </p>
          </div>
        </div>
        {/* Navigation Arrows */}
        <div
          className={`absolute bottom-4 flex gap-4 ${
            isAr ? "left-4" : "right-4"
          }`}
        >
          {/* Previous Button */}
          <button
            onClick={isAr ? nextSlide : prevSlide}
            className="rounded-full bg-white bg-opacity-20 p-3 transition hover:bg-opacity-40"
          >
            {isAr ? <ChevronRight /> : <ChevronLeft />}
          </button>

          {/* Next Button */}
          <button
            onClick={isAr ? prevSlide : nextSlide}
            className="rounded-full bg-white bg-opacity-20 p-3 transition hover:bg-opacity-40"
          >
            {isAr ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        ;
      </div>
    </div>
  );
};

export default TestimonialSlider;
