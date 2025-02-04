import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Head>
        <title>Ale - Personal finance</title>
        <meta name="application-name" content="ALE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ALE" />
        <meta
          name="description"
          content="Track your income and expenses with ease"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />

        <link
          rel="icon"
          type="image/png"
          href="/icons/android/android-launchericon-192-192.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/ios/152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/ios/180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/ios/167.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
