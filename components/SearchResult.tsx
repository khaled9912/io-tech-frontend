"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { axiosClient } from "@/lib/axiosClient";
import { IServiceItem, ITeamMember } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Footer from "./Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("name") || "";
  const [services, setServices] = useState<IServiceItem[]>([]);
  const [team, setTeam] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const isAr = useLocale() === "ar";
  const t = useTranslations();

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const [servicesRes, teamRes] = await Promise.all([
          axiosClient
            .get(`/api/services?search=${query}`)
            .catch(() => ({ data: [] })),
          axiosClient
            .get(`/api/teams?search=${query}`)
            .catch(() => ({ data: [] })),
        ]);

        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
        setTeam(Array.isArray(teamRes.data) ? teamRes.data : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setServices([]);
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Button */}
      <div className="mx-4 flex gap-4 pt-6 text-2xl">
        <Link href="/" className="flex gap-2">
          {isAr ? <ChevronRight /> : <ChevronLeft />}
          {t("back")}
        </Link>
      </div>
      <div className="mx-automax-w-4xl container flex-grow px-6 py-10">
        <h1 className="mb-6 text-2xl font-bold">
          {t("search-for")} "{query}"
        </h1>

        {loading ? (
          <p>{t("loading")}</p>
        ) : (
          <>
            {/* Services Section */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-semibold">{t("services")}</h2>
              {!loading && services.length > 0 ? (
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className="rounded-md bg-gray-100 p-4 shadow transition hover:bg-gray-200"
                    >
                      <Link href={`/services/${service.slug}`}>
                        {service.titleEn}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">{"no-result"}</p>
              )}
            </section>

            {/* Team Section */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">{t("teams.team")}</h2>
              {!loading && team.length > 0 ? (
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {team.map((member) => (
                    <li
                      key={member.nameAr}
                      className="rounded-md bg-gray-100 p-4 shadow transition hover:bg-gray-200"
                    >
                      <Link href={`/team/${member.slug}`}>
                        <div className="font-semibold">
                          {isAr ? member.nameAr : member.nameEn}
                        </div>
                        <div className="text-sm text-gray-600">
                          {isAr ? member.roleAr : member.roleEn}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">{t("no-teams-found")}</p>
              )}
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
