import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  const dir = props.__NEXT_DATA__.locale === "ar" ? "rtl" : "ltr";

  return (
    <Html lang={props.__NEXT_DATA__.locale} dir={dir}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
