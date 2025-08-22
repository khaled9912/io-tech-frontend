"use client";

import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale = router.locale;
  const locales = ["en", "ar"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    startTransition(() => {
      router.push(pathname, pathname, { locale: newLocale });
    });
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      disabled={isPending}
      className="rounded border bg-primary p-2 text-white"
    >
      {locales.map((lng) => (
        <option key={lng} value={lng}>
          {lng === "en" ? "English" : "العربية"}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
