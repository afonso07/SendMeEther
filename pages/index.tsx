import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SendMeEther from "../components/SendMeEther";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SendMeEth</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <SendMeEther />
      <div className={styles.footer_biscuit}><a href="https://www.linkedin.com/in/afonso-lopo-de-carvalho">@Afonso Lopo de Carvalho</a></div>
    </div>
  );
};

export default Home;
