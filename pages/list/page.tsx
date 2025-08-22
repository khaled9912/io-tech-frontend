"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { axiosClient } from "@/lib/axiosClient";
import { IServiceItem, ITeamMember } from "@/types";
import { useLocale } from "next-intl";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("name") || "";
  const [services, setServices] = useState<IServiceItem[]>([]);
  const [team, setTeam] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const isAr = useLocale() === "ar";

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const [servicesRes, teamRes] = await Promise.all([
          axiosClient.get(`/api/services?search=${query}`),
          axiosClient.get(`/api/teams?search=${query}`),
        ]);

        setServices(servicesRes.data);
        setTeam(teamRes.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Search Results for: "{query}"</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Services Section */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">Services</h2>
            {services.length > 0 ? (
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
              <p className="text-gray-500">No services found.</p>
            )}
          </section>

          {/* Team Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Team</h2>
            {team.length > 0 ? (
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
              <p className="text-gray-500">No team members found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
