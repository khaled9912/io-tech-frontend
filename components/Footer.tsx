import Link from "next/link";
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
import { Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="mb-5 min-h-[400px] bg-primary text-sm text-white md:min-h-[200px] md:px-8">
      <div className="mx-12 flex flex-col items-center justify-end gap-5 md:flex-row">
        {/* Subscribe Form */}
        <div className="flex items-center gap-2">
          <SubscriptionForm />
        </div>

        {/* Contacts + Social */}

        <div className="flex items-center gap-4">
          <span>Contacts</span>

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
          <Link href="#">About</Link>
          <Link href="#">Our Strategy</Link>
          <Link href="#">Our Advantages</Link>
          <Link href="#">Social Responsibility</Link>
          <Link href="#">Our Services</Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-300 md:text-right">
          © 2024. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
