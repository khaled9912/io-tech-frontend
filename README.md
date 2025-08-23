<h1 align="center">📌 Business CMS</h1>
<h3 align="center">A powerful multi-language CMS built with Next.js, Strapi, and Redux Toolkit</h3>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. ⚡ [API Integration](#api-integration)
5. 🤸 [Quick Start](#quick-start)
6. 🕸️ [Live Demo](#live-demo)
7. 🪪 [Demo Login](#demo-login)
8. 🐳 [Docker Support](#docker-support)
9. 🧩 [Code Snippets](#code-snippets)

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

git clone https://github.com/khaled9912/io-tech-frontend.git
cd business-cms

2. Install Dependencies
   npm install

3. Configure Environment Variables

Create a .env.local file:
NEXT_PUBLIC_API_URL=https://appealing-hope-3e4e8960ac.strapiapp.com/api

4. Run the Project
   npm run dev

## <a name="live-demo">🕸️ Live Demo</a>

🚀 Live Demo
https://io-tech-frontend-one.vercel.app/
