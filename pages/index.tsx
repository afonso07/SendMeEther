import type { NextPage } from "next";
import Head from "next/head";
import SendMeEther from "../components/SendMeEther";
import styles from "../styles/Home.module.css";
import Script from "next/script";


const Home: NextPage = () => {


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
        <a href="https://www.linkedin.com/in/afonso-lopo-de-carvalho">
          @Afonso Lopo de Carvalho
        </a>
      </div>
    </div>
  );
};

export default Home;
