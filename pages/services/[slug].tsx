import { GetServerSideProps } from "next";
import ServicePageComponent from "@/components/ServicePage";

export default function ServicePage(props: any) {
  return <ServicePageComponent {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  query,
}) => {
  const slug = params?.slug as string;
  const id = query.id as string;

  if (!slug || !id) {
    return {
      notFound: true,
    };
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    props: {
      slug,
      id,
      locale,
      messages,
    },
  };
};
