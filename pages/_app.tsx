import { IntlProvider } from "next-intl";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import LandingPage from "@/components/LandingPage";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/ErrorBoundry";

export default function App({
  Component,
  pageProps,
  ...rest
}: AppProps & { slides?: any[] }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (

      <Provider store={store}>
        <IntlProvider
          messages={pageProps?.messages || {}}
          locale={pageProps?.locale || "en"}
          timeZone="UTC"
        >
          <ErrorBoundary
            fallback={
              <div className="flex h-screen items-center justify-center font-bold">
                Something went wrong globally!
              </div>
            }
          >
            <LandingPage>
              <Component {...pageProps} />
            </LandingPage>
          </ErrorBoundary>
        </IntlProvider>
      </Provider>
  );
}
