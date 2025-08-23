import TeamSection from "@/components/TeamSection";
import { wrapper } from "@/store";
import { GetServerSidePropsContext } from "next";
import Slider from "@/components/Slider";
import { getSlides } from "@/lib/utils";
import { ISlide } from "@/types";
import TestimonialSlider from "@/components/TestmonialSlider";
import { IntlProvider } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface IndexPageProps {
  slides: ISlide[];
  messages: any;
  locale: string;
}

export default function IndexPage({
  slides,
  messages,
  locale,
}: IndexPageProps) {
  return (
    <div className="mb-4 flex min-h-[800px] min-h-screen flex-col items-center justify-center md:mb-8">
      <IntlProvider messages={messages} locale={locale} timeZone="UTC">
        <Navbar />
        <Slider initialSlides={slides} />
        <TeamSection />
        <TestimonialSlider />
        <Footer />
      </IntlProvider>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    const locale = ctx.locale || "en";
    let slides: ISlide[] = [];

    try {
      const res = await getSlides();
      slides = res.data?.[0]?.slideImages || [];
      if (!Array.isArray(slides)) {
        console.warn("Unexpected slides data structure:", slides);
        slides = [];
      }
    } catch (err) {
      console.error("Failed to fetch slides:", err);
    }

    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default,
        locale,
        slides,
      },
    };
  },
);
