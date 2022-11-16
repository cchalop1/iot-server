import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const DevicePage = () => {
    const router = useRouter();
    const { clientId } = router.query;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{clientId}</h1>
            </header>
        </div>
    );
};

export default DevicePage;

