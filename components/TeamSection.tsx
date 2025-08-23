// components/TeamCarousel.tsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamCard from "./TeamCard";
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import {
  fetchTeamMembers,
  selectTeams,
  selectTeamsLoading,
} from "@/store/slices/teamsSlice";
import { useLocale, useTranslations } from "next-intl";
import PageLoader from "./PageLoader";

const TeamSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = 1;
  const pageSize = 5;
  const locale = useLocale();
  useEffect(() => {
    dispatch(fetchTeamMembers({ page, pageSize, locale }));
  }, [dispatch, page, pageSize, locale]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? teams.length - 1 : prev - 1));
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev === teams.length - 1 ? 0 : prev + 1));
  };

  const teams = useSelector(selectTeams);
  const t = useTranslations();
  const loading = useSelector(selectTeamsLoading);
  if (loading || !teams || teams.length === 0) return <PageLoader />;

  return (
    <div className="px-8 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-brown-800 text-2xl font-bold">
          {t("teams.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-gray-500">{t("teams.bio")}</p>
      </div>
      <div className="relative flex w-full items-center justify-center">
        {/* Left Button */}
        <button className="absolute left-0 z-10 p-2" onClick={prevCard}>
          <ChevronLeft />
        </button>

        {/* Carousel */}
        <div className="relative flex w-full justify-center gap-8 md:flex-row md:overflow-x-auto">
          {teams.map((member, index) => (
            <div
              key={index}
              className={`w-full max-w-xs transition-all duration-300 ease-in-out ${
                index === currentIndex ? "block" : "hidden"
              } md:block`} // show all on md+
            >
              <TeamCard
                positionAr={member.roleAr}
                positionEn={member.roleEn}
                imageUrl={member.photo?.url}
                nameAr={member.nameAr}
                nameEn={member.nameEn}
              />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button className="absolute right-0 z-10 p-2" onClick={nextCard}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TeamSection;
