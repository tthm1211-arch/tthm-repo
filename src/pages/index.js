import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';


function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Neighbour Express
          <span className={styles.gradientText}>Knowledge Base</span>
        </h1>

        {/* <div className={styles.versionBadge}>
        管理端当前版本 v1.0.90
        </div> */}

        <p className={styles.heroSubtitle}>
          当前版本 v1.0.90
        <br />
          管理端各模块均受账号权限控制
        <br />
          若无法查看相关页面或功能，请联系系统管理员
        <br />
          为当前账号配置相应权限后再进行操作
        </p>

        {/* <p className={styles.heroSubtitle}>
          管理端当前版本：v1.0.90
          <br />
          管理端各模块均受账号权限控制。若无法查看相关页面或功能，
          <br />
          请联系系统管理员为当前账号配置相应权限后再进行操作。
        </p> */}

        <div className={styles.buttonGroup}>
          <Link to="/docs/概述/概述" className={styles.primaryButton}>
            进入知识库 →
          </Link>
        </div>
      </div>

  
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="知识库"
      description="Neighbour Express Knowledge Base"
    >
      <HomepageHeader />
      <main />
    </Layout>
  );
}