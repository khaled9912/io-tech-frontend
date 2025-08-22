"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { useLocale } from "next-intl";
import {
  selectSingleService,
  selectSingleServiceError,
  selectSingleServiceLoading,
  selectSingleServicePagination,
  fetchSingleService,
} from "@/store/slices/servicesSlice";
import PageLoader from "@/components/PageLoader";
import { CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  id: string;
}

export default function ServicePage({ id }: ServicePageProps) {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const isAr = locale === "ar";

  const service = useSelector(selectSingleService);
  const pagination = useSelector(selectSingleServicePagination);
  const error = useSelector(selectSingleServiceError);
  const loading = useSelector(selectSingleServiceLoading);

  const [page, setPage] = useState(1);
  const pageSize = 1;

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService({ id, locale, page, pageSize }));
    }
  }, [dispatch, id, locale, page]);

  if (loading || !service || error) return <PageLoader />;

  const subItems = isAr ? service.subItemsAr : service.subItemsEn;

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Page Header */}
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        {isAr ? service.titleAr : service.titleEn}
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-gray-600">
        {isAr ? service.descriptionAr : service.descriptionEn}
      </p>

      {/* Custom Separator */}
      <div className="my-6 h-px w-full bg-gray-200"></div>

      {/* Sub Items */}
      <div className="space-y-6">
        {subItems && subItems?.length > 0 ? (
          subItems.map((section: any, index: number) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm transition duration-300 hover:shadow-md"
            >
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
              <p className="mb-4 text-gray-600">{section.description}</p>

              {section.points && section.points.length > 0 && (
                <ul className="list-none space-y-2">
                  {section.points.map((point: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            {isAr ? "لا توجد بيانات متاحة" : "No data available"}
          </p>
        )}
      </div>

      {/* Pagination */}
      {pagination.pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`rounded-lg px-4 py-2 text-white ${
              page === 1
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAr ? "السابق" : "Previous"}
          </button>

          <span className="font-medium text-gray-700">
            {isAr
              ? `الصفحة ${page} من ${pagination.pageCount}`
              : `Page ${page} of ${pagination.pageCount}`}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === pagination.pageCount}
            className={`rounded-lg px-4 py-2 text-white ${
              page === pagination.pageCount
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAr ? "التالي" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
