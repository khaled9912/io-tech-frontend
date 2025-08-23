import ErrorBoundary from "./ErrorBoundry";
import { useTranslations } from "next-intl";

const LandingPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <ErrorBoundary
        fallback={
          <div className="flex h-screen items-center justify-center font-bold">
            {t("error")}
          </div>
        }
      >
        {children}
  
      </ErrorBoundary>
    </div>
  );
};
export default LandingPage;
