import Link from "next/link";
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
import { Twitter, Facebook, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <div className="mb-5 min-h-[400px] bg-primary text-sm text-white md:min-h-[200px] md:px-8">
      <div className="mx-12 flex flex-col items-center justify-end gap-5 md:flex-row">
        {/* Subscribe Form */}
        <div className="flex items-center gap-2">
          <SubscriptionForm />
        </div>

        {/* Contacts + Social */}

        <div className="flex items-center gap-4">
          <span>{t("contacts")}</span>

          <Link href="#">
            <Twitter className="h-5 w-5" />
          </Link>

          <Link href="#">
            <Facebook className="h-5 w-5" />
          </Link>

          <Link href="#">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-4 w-full border-b border-white opacity-30" />

      {/* Bottom Section */}
      <div className="flex flex-col items-center justify-between gap-6 pt-6 md:flex-row">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-200">
          <Link href="#">{t("about")}</Link>
          <Link href="#">{t("strategy")}</Link>
          <Link href="#">{t("our-adventages")}</Link>
          <Link href="#">{t("social-responsibility")}</Link>
          <Link href="#">{t("services")}</Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-300 md:text-right">
          {t("rights")}
        </div>
      </div>
    </div>
  );
};

export default Footer;
