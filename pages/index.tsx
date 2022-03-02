import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SendMeEther from "../components/SendMeEther";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import Script from "next/script";
var gtag: any = require("ga-gtag");

const Home: NextPage = () => {
  // ? GA Configuration
  const TRACKING_ID = "G-Y5P4739KW6";

  /*useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);*/

  return (
    <div className={styles.container}>
      <Head>
        <title>SendMeEth</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Y5P4739KW6"
      ></Script>
      <Script
        id="show-banner"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-Y5P4739KW6');`,
        }}
      />
      <SendMeEther />
      <div className={styles.footer_biscuit}>
        <a
          href="https://www.linkedin.com/in/afonso-lopo-de-carvalho"
          onClick={() => {
            gtag("event", "User Clicked on Linkedin Link", {});
          }}
        >
          @Afonso Lopo de Carvalho
        </a>
      </div>
    </div>
  );
};

export default Home;
