"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import {
  fetchServices,
  selectServices,
  selectServicesError,
} from "@/store/slices/servicesSlice";
import { IServiceItem } from "@/types";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const t = useTranslations("navbar");
  const isAr = useLocale();
  const services = useSelector(selectServices);
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useAppDispatch();
  const selectServiceError = useSelector(selectServicesError);
  console.log("selectServiceError", selectServiceError);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchServices({ locale: "en" }));
  }, [dispatch]);

  const isTransparent = pathname === "/" && !isScrolled;

  const sortedServices: IServiceItem[] = [...services].sort(
    (a, b) => a.order - b.order,
  );

  const chunkPattern = [5, 5, 4, 4];
  const serviceGroups: IServiceItem[][] = [];

  let startIndex = 0;
  chunkPattern.forEach((size) => {
    serviceGroups.push(sortedServices.slice(startIndex, startIndex + size));
    startIndex += size;
  });

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-primary text-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {!isTransparent && (
          <Link href="/" className="flex items-center gap-3">
            <Image src="/io-tech-logo.png" width={70} height={70} alt="Logo" />
          </Link>
        )}

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/">{"home"}</Link>
          <Link href="/">{"about"}</Link>

          <div
            className="group relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1">
              {"services"}
              <span className="ml-1">▼</span>
            </button>

            {servicesOpen && (
              <div className="fixed left-0 top-[80px] z-50 grid w-full grid-cols-4 gap-8 bg-primary p-8 text-white shadow-lg">
                {serviceGroups.map((group, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    {group.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="whitespace-nowrap"
                      >
                        {isAr === "ar" ? service.titleAr : service.titleEn}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/team">{t("team")}</Link>
          <Link href="/">{t("blog")}</Link>
          <Link href="/">{t("contact")}</Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {isTransparent ? (
            <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
          ) : null}
          {openSearch ? null : (
            <button className="rounded-md border bg-white px-4 py-2 text-black hover:bg-gray-100">
              {t("book-appointment")}
            </button>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {mobileOpen && (
        <div className="bg-brand flex h-full flex-col gap-4 overflow-y-auto px-6 py-4 text-white md:hidden">
          <Link href="/">{t("home")}</Link>
          <Link href="/">{"about-us"}</Link>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center justify-between overflow-y-auto"
          >
            Services <span>{servicesOpen ? "▲" : "▼"}</span>
          </button>
          {servicesOpen && (
            <div className="flex h-full flex-col gap-2 pl-4">
              {sortedServices.map((service, id) => (
                <div
                  key={id}
                  className="flex h-full flex-col gap-3 overflow-y-auto"
                >
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="whitespace-nowrap"
                  >
                    {isAr === "ar" ? service.titleAr : service.titleEn}
                  </Link>
                </div>
              ))}
            </div>
          )}
          <Link href="/team">{t("team")}</Link>
          <Link href="/">{t("blog")}</Link>
          <Link href="/">{t("contact")}</Link>

          <div>
            {!isTransparent ? <LanguageSwitcher /> : null}
            <button className="rounded-md border bg-white px-4 py-2 text-black hover:bg-gray-100">
              {t("book-appointment")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
