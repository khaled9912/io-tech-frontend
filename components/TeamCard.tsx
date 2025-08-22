import React, { useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import { selectTeamsLoading } from "@/store/slices/teamsSlice";

interface TeamCardProps {
  nameAr?: string;
  nameEn?: string;
  positionAr?: string;
  positionEn?: string;
  imageUrl?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  nameAr,
  nameEn,
  positionAr,
  positionEn,
  imageUrl,
}) => {
  const isAr = "ar" === useLocale();
  const loading = useSelector(selectTeamsLoading);
  const [imageLoading, setImageLoading] = useState(loading);

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <div className="relative flex h-48 w-48 items-center justify-center">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-500"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={isAr ? nameAr : nameEn}
          onLoad={() => setImageLoading(false)}
          className={`h-48 w-48 rounded object-cover ${
            imageLoading ? "hidden" : "block"
          }`}
        />
      </div>

      <h3 className="primary text-center text-[22px] font-medium leading-[32px] tracking-normal">
        {isAr ? nameAr : nameEn}
      </h3>
      <p className="text-center text-sm font-bold uppercase leading-[26px] tracking-[2px] text-[#15143966]">
        {isAr ? positionAr : positionEn}
      </p>

      <div className="mt-2 flex gap-3">
        <a href={`https://wa.me/${"dumy-whatsapp"}`}>
          <MessageCircle />
        </a>
        <a href={`tel:${2221111111}`}>
          <Phone />
        </a>
        <a href={`mailto:${"dumy@dumy.com"}`}>
          <Mail />
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
