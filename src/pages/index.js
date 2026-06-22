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
          <br></br>
          If subsequent version updates result in any interface or functionality differences, 
          <br></br>
          please refer to the latest version.
        </p>

        <div className={styles.buttonGroup}>
          <Link href="docs/intro" className={styles.primaryButton}>
           Enter →
          </Link>
        </div>
      </div>
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
      <main>
        {/* 移除 HomepageFeatures */}
      </main>
    </Layout>
  );
}