import { GetServerSideProps } from "next";
import SearchResultsPage from "@/components/SearchResult";

export default function SearchResults(props: any) {
  return <SearchResultsPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    props: {
      locale,
      messages,
    },
  };
};
