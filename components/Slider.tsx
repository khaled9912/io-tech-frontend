"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchSlides, selectSlides } from "@/store/slices/heroSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { ISlide } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface SliderProps {
  initialSlides: ISlide[];
}

const Slider = ({ initialSlides }: SliderProps) => {
  const [current, setCurrent] = useState(0);
  const slidesFromRedux = useSelector(selectSlides);
  const slides =
    Number(slidesFromRedux?.length) > 0 ? slidesFromRedux : initialSlides;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSlides()).finally(() => setLoading(false));
  }, [dispatch, locale]);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    setCurrent(0);
  }, [locale]);
  const prevSlide = () =>
    setCurrent(current === 0 ? Number(slides?.length) - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === Number(slides?.length) - 1 ? 0 : current + 1);

  if (loading || !slides || slides.length === 0) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slider container */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Slides */}
        <div
          className="flex h-full w-max transition-all duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}vw)` }}
        >
          {slides.map((slide, idx) => (
            <div
              className="flex h-full w-screen flex-col gap-16 xl:flex-row"
              key={idx}
            >
              <div className="relative h-full w-full">
                <Image
                  src={(slide as any).url}
                  alt="slider image"
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Left/Right arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent bg-opacity-50 p-2 text-white transition hover:bg-opacity-80 md:top-64"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent bg-opacity-50 p-2 text-white transition hover:bg-opacity-80 md:top-64"
        >
          <ChevronRight />
        </button>

        <div className="absolute left-40 top-3/4 flex -translate-y-1/2 flex-col gap-4 max-sm:left-32">
          <button className="rounded bg-white p-4 text-primary">
            {t("read-more")}
          </button>
        </div>
        <div className="absolute right-40 top-3/4 flex -translate-y-1/2 flex-col gap-4 max-sm:hidden">
          <Image
            src={"/avatar.png"}
            alt="Slide Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        <div className="auto-mx container absolute left-40 top-1/2 flex max-w-lg -translate-y-1/2 flex-col gap-4 text-white max-sm:hidden">
          <h1 className="text-4xl font-bold"> {t("slider-title")}</h1>
          <p>{t("teams.bio")}</p>
        </div>

        {/* Vertical dots */}
        <div className="absolute left-4 top-3/4 flex -translate-y-1/2 flex-col gap-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`flex h-2 w-2 cursor-pointer items-center justify-center rounded-full ring-1 ring-white ${
                current === index ? "scale-150" : ""
              }`}
              onClick={() => setCurrent(index)}
            >
              {current === index && (
                <div className="h-[6px] w-[6px] rounded-full bg-white"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
