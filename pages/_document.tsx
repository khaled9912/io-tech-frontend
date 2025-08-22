import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  const dir = props.__NEXT_DATA__.locale === "ar" ? "rtl" : "ltr";

  return (
    <Html lang={props.__NEXT_DATA__.locale} dir={dir}>
      <Head>
        <title>BussinessCMS</title>
        <meta name="description" content="it is a bussiness CMS app!" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
