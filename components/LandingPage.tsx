import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundry";

const LandingPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <ErrorBoundary
        fallback={
          <div className="flex h-screen items-center justify-center font-bold">
            Something went wrong!
          </div>
        }
      >
        {/* Navbar */}
        <Navbar />
        {children}
        <Footer />
      </ErrorBoundary>
    </div>
  );
};
export default LandingPage;
