import { NextPage } from "next";
import Head from "next/head";
import DevicesList from "../components/DevicesList";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Devices</h1>
      </header>

      <main className={styles.main}>
        <DevicesList />
      </main>
    </div>
  );
};

export default Home;
