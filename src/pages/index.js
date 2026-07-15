import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Neighbour Express
          <span className={styles.gradientText}>Knowledge Base</span>
        </h1>

        <p className={styles.heroSubtitle}>
          This documentation is based on the officially released system version v1.0.87.
          <br />
          If subsequent version updates result in any interface or functionality differences,
          <br />
          please refer to the latest version.
        </p>

        <div className={styles.buttonGroup}>
          <Link to="/docs/intro" className={styles.primaryButton}>
            Enter →
          </Link>
        </div>
      </div>

      <img
        src="/img/ezgif-45913b1f03d287d2.gif"
        alt="animation"
        className={styles.cornerGif}
      />
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="v1.0.87"
      description="Neighbour Express Knowledge Base"
    >
      <HomepageHeader />
      <main />
    </Layout>
  );
}