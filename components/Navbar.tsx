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
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("navbar");
  const isAr = useLocale();
  const services = useSelector(selectServices);
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useAppDispatch();
  const selectServiceError = useSelector(selectServicesError);

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
        isTransparent && !mobileOpen
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

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 xl:flex">
          <Link href="/">{t("home")}</Link>
          <Link href="/">{t("about")}</Link>

          {/* Desktop Mega Menu */}
          <Popover className="relative hidden xl:block">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`flex items-center gap-1 focus:outline-none ${
                    open ? "text-gray-200" : ""
                  }`}
                >
                  {t("services")} <span className="ml-1">▼</span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    className={`absolute left-0 top-full z-50 grid max-h-[70vh] w-full grid-cols-4 gap-4 overflow-y-auto bg-primary p-6 text-white shadow-lg max-lg:grid-cols-2 lg:min-w-[1300px] ${isTransparent ? "xl:-ml-56" : "xl:-ml-96"}`}
                  >
                    {serviceGroups.map((group, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        {group.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}?id=${service.id}`}
                            className="block w-full text-sm hover:text-gray-200"
                          >
                            {isAr === "ar" ? service.titleAr : service.titleEn}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <Link href="/teams">{t("team")}</Link>
          <Link href="/">{t("blog")}</Link>
          <Link href="/">{t("contact")}</Link>
        </div>

        <div className="hidden items-center gap-6 xl:flex">
          {isTransparent ? (
            <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
          ) : null}
          {!isTransparent ? <LanguageSwitcher /> : null}
          <button className="text-whit whitespace-nowrap rounded-md border border-white bg-transparent px-4 py-2 hover:bg-gray-100">
            {t("book-appointment")}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="bg-brand flex h-screen flex-col gap-4 overflow-y-auto px-6 py-4 text-white xl:hidden">
          <Link href="/">{t("home")}</Link>
          <Link href="/">{t("about")}</Link>

          {/* Collapsible Services for Mobile */}
          <details className="w-full">
            <summary className="flex cursor-pointer items-center justify-between py-2">
              {t("services")} <span>▼</span>
            </summary>
            <div className="flex flex-col gap-2 pl-4">
              {sortedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}?id=${service.id}`}
                  className="whitespace-nowrap"
                >
                  {isAr === "ar" ? service.titleAr : service.titleEn}
                </Link>
              ))}
            </div>
          </details>

          <Link href="/teams">{t("team")}</Link>
          <Link href="/">{t("blog")}</Link>
          <Link href="/">{t("contact")}</Link>

          <div className="mt-4 flex gap-2">
            {!isTransparent ? <LanguageSwitcher /> : null}
            <button className="whitespace-nowrap rounded-md border border-white px-4 py-2 text-white hover:bg-gray-100">
              {t("book-appointment")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
