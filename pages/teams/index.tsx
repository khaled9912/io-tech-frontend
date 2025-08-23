import { GetServerSideProps } from "next";
import TeamsPageComponent from "@/components/TeamsPage";

export default function TeamsPage(props: any) {
  return <TeamsPageComponent {...props} />;
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
