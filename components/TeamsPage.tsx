"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import {
  fetchTeamMembers,
  selectTeams,
  selectTeamsPagination,
  selectTeamsLoading,
  selectTeamsError,
} from "@/store/slices/teamsSlice";
import PageLoader from "@/components/PageLoader";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
// Assuming Footer component exists
import Footer from "@/components/Footer"; // Adjust the import path

export default function TeamsPage() {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const isAr = locale === "ar";
  const teams = useSelector(selectTeams);
  const pagination = useSelector(selectTeamsPagination);
  const loading = useSelector(selectTeamsLoading);
  const error = useSelector(selectTeamsError);

  const [page, setPage] = useState(1);
  const pageSize = 1;
  const t = useTranslations("teams");

  useEffect(() => {
    dispatch(fetchTeamMembers({ page, pageSize, locale }));
  }, [dispatch, page, pageSize, locale]);

  // Generate pagination numbers with ellipsis
  const getPaginationNumbers = () => {
    const totalPages = pagination?.pageCount || 1;
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (page >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="max-w-4xl flex-grow p-6">
        {/* Back Button */}
        <div className="ms-24 flex gap-4 pb-6">
          <Link href="/" className="flex gap-2">
            {isAr ? <ChevronRight /> : <ChevronLeft />}
            {t("back")}
          </Link>
        </div>

        {/* Teams List */}
        <div className="space-y-8">
          {teams.length > 0 ? (
            teams.map((team) => {
              const subItems =
                locale === "ar"
                  ? team.services?.ar || []
                  : team.services?.en || [];

              return (
                <div key={team.slug} className="flex gap-6">
                  <div className="mb-6 flex flex-col gap-3 text-center text-xl font-bold text-gray-900">
                    {t("team")} <br /> {t("Services")}
                  </div>
                  <div className="flex flex-col">
                    {subItems.map((item, index) => (
                      <div key={index}>
                        <div className="flex flex-col items-start justify-start gap-3">
                          <h2 className="text-sm font-medium text-gray-800">
                            {item.title}
                          </h2>
                          <button className="text-brown-700 text-sm font-medium">
                            {t("read-more")}
                          </button>
                        </div>
                        <hr className="mt-4 border-t border-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">{t("no-data")}</p>
          )}
        </div>

        {/* Pagination at Bottom-Right */}
        {pagination?.pageCount > 1 && (
          <div
            className={`left-0 z-10 flex justify-end gap-2 rounded-xl bg-white/80 px-4 py-3 ${
              isAr ? "flex-row-reverse" : ""
            }`}
          >
            {/* Previous Button */}
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className={`rounded-full p-2 ${
                page === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            {/* Numbered Pagination */}
            <div className="flex items-center gap-1">
              {getPaginationNumbers().map((num, index) => (
                <button
                  key={index}
                  onClick={() => typeof num === "number" && setPage(num)}
                  disabled={num === "..."}
                  className={`rounded-lg px-3 py-1 text-sm font-medium ${
                    num === page
                      ? "bg-blue-600 text-white"
                      : num === "..."
                        ? "cursor-default text-gray-500"
                        : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === pagination.pageCount}
              className={`rounded-full p-2 ${
                page === pagination.pageCount
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
