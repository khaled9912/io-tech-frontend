<h1 align="center">📌 Business CMS</h1>
<h3 align="center">A powerful multi-language CMS built with Next.js, Strapi, and Redux Toolkit</h3>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. ⚡ [API Integration](#api-integration)
5. 🤸 [Quick Start](#quick-start)
6. 🕸️ [DockerImage](#Docker-Image)
7. 🌍 [Live Demo](#live-demo)
8. 🧩 [Code Snippets](#code-snippets)

---

## <a name="introduction">🤖 Introduction</a>

**Business CMS** is a modern **content management platform** built with **Next.js 15**, **Strapi**, **Redux Toolkit**, and **Tailwind CSS**.  
It is designed for **multi-language content**, **SEO-friendly pages**, and **optimized performance**.

This CMS lets you manage **services, blogs, products, and pages** easily, with support for **dynamic routing** and **server-side rendering**.

---

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Next.js 15** → Server-side rendering, static generation & routing
- **TypeScript** → Type-safe development
- **Redux Toolkit** → State management for global data
- **Axios** → API integration with Strapi backend
- **Strapi CMS** → Headless CMS for managing content
- **Next-Intl** → Internationalization (i18n) for multi-language support
- **Tailwind CSS** → Responsive & modern UI design
- **Lucide React** → Icon library
- **React Toastify** → Notifications & alerts
- **Formik + Yup** → Forms & validations
- **Headless UI** → accessible inputs & dropdowns

---

## <a name="features">🔋 Features</a>

### 🏷️ **Services Management**

- Fetch and display dynamic services from Strapi API
- Multi-language support (English / Arabic)
- SEO-friendly service detail pages
- Image banners, thumbnails, and descriptions

### 📄 **Dynamic Pages**

- Slug-based dynamic routing
- Optimized for **Next.js 15** pages Router
- Pre-rendered for **fast SEO performance**

### 🌐 **Multi-Language Support**

- Uses `next-intl`
- Switch between **English** and **Arabic**
- Dynamic text rendering based on locale

### 🔎 **Search & Filtering**

- Service listing with **search bar**
- **Category-based filtering** and sorting

### 🗂️ **Pagination**

- Built-in pagination for large datasets
- Dynamic query params: `?page=1&pageSize=10`

### ⚡ **Performance**

- Fully optimized for **Core Web Vitals**
- Uses `getStaticProps` & `getServerSideProps` where required

---

## <a name="api-integration">⚡ API Integration</a>

We are using **Strapi CMS** as the backend.  
Base URL:

```bash
https://appealing-hope-3e4e8960ac.strapiapp.com/api
import axiosClient from '@/lib/axiosClient';

export const getServices = async (locale: string, page: number = 1, pageSize: number = 10) => {
  return axiosClient.get(`/service-items`, {
    params: {
      locale,
      populate: '*',
      pagination: {
        page,
        pageSize,
      },
    },
  });
};

```

## <a name="quick-start">🤸 Quick Start</a>

## 🛠️ Installation & Setup Frontend

# 1. Clone the repository

git clone https://github.com/khaled9912/io-tech-frontend.git

# 2. Install dependencies

npm install

# 3. Configure Environment Variables

Create a .env.local file:
NEXT_PUBLIC_API_URL=https://appealing-hope-3e4e8960ac.strapiapp.com/api

# 4. Start the development server

npm start

## 🛠️ Installation & Setup BackEnd

# 1. Clone the repository

git clone https://github.com/khaled9912/io-tech-strapi.git

# 2. Install dependencies

npm install

# 3. Start the development server

npm start

## <a name="live-demo" href="https://io-tech-frontend-one.vercel.app/">🌍 LiveDemo</a>

## <a name="DockerImage">🕸️ Docker Image</a>

**Cloning Docker Image**

```
docker pull khaled9912/io-tech-frontend:latest
```

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>teamsSlice</code></summary>

```typescript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ITeamMember } from "@/types";
import { getTeams } from "@/lib/utils";

//Thunk part
export const fetchTeamMembers = createAsyncThunk(
  "teams/fetchTeamMembers",
  async (
    {
      page = 1,
      pageSize = 5,
      locale,
    }: { page?: number; pageSize?: number; locale?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await getTeams(page, pageSize, locale);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error?.message || "Failed to fetch",
      );
    }
  },
);

interface TeamsState {
  teams: ITeamMember[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
const initialState: TeamsState = {
  teams: [],
  pagination: { page: 1, pageSize: 5, pageCount: 1, total: 0 },
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.data;
        state.pagination = action.payload.meta?.pagination || state.pagination;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectTeamsPagination = (state: RootState) =>
  state.teams.pagination;
export const selectTeamsError = (state: RootState) => state.teams.error;
export const selectTeamsLoading = (state: RootState) => state.teams.loading;

export default teamsSlice.reducer;
```

</details>

<details>
<summary><code>Navbar</code></summary>

```typescript
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
                    className={`absolute top-full z-50 mt-4 grid max-h-[70vh] w-full grid-cols-4 gap-4 overflow-y-auto bg-primary p-6 text-white shadow-lg max-lg:grid-cols-2 lg:min-w-[1300px] ${isAr ? "right-0" : "left-0"} ${
                      isAr
                        ? isTransparent
                          ? "xl:-mr-56"
                          : "xl:-mr-96"
                        : isTransparent
                          ? "xl:-ml-56"
                          : "xl:-ml-96"
                    }`}
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
            <div className="sm:hidden">
              <LanguageSwitcher />
            </div>
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

```

</details>
