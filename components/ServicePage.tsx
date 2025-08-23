"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { useLocale, useTranslations } from "next-intl";
import {
  selectSingleService,
  selectSingleServiceError,
  selectSingleServiceLoading,
  fetchSingleService,
} from "@/store/slices/servicesSlice";
import PageLoader from "@/components/PageLoader";
import { CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  id: string;
}

export default function ServicePageComponent({ id }: ServicePageProps) {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations("service");
  const isAr = locale === "ar";

  const service = useSelector(selectSingleService);
  const error = useSelector(selectSingleServiceError);
  const loading = useSelector(selectSingleServiceLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService({ id }));
    }
  }, [dispatch, id, locale]);

  if (loading || error || !service) return <PageLoader />;
  if (error || !service)
    return <p className="text-center text-gray-500">{t("no-data")}</p>;

  const subItems = isAr ? service.subItemsAr : service.subItemsEn;

  return (
    <div className="mx-auto h-full max-w-5xl p-6">
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
              <h2 className="mb-3 line-clamp-2 text-xl font-semibold text-gray-800">
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
          <p className="text-gray-500">{t("no-data")}</p>
        )}
      </div>
    </div>
  );
}
