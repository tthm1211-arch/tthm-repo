import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function DesktopPet() {
  const petRef = useRef(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({x: 0, y: 0});

  const [position, setPosition] = useState({x: 40, y: 420});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedPosition = localStorage.getItem('desktop-pet-position');

    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition));
        return;
      } catch {
        localStorage.removeItem('desktop-pet-position');
      }
    }

    const petHeight = petRef.current?.offsetHeight || 220;

    setPosition({
      x: 40,
      y: Math.max(20, window.innerHeight - petHeight - 40),
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!draggingRef.current || !petRef.current) return;

      const petWidth = petRef.current.offsetWidth;
      const petHeight = petRef.current.offsetHeight;

      const nextX = event.clientX - offsetRef.current.x;
      const nextY = event.clientY - offsetRef.current.y;

      setPosition({
        x: Math.max(0, Math.min(nextX, window.innerWidth - petWidth)),
        y: Math.max(0, Math.min(nextY, window.innerHeight - petHeight)),
      });
    };

    const handleMouseUp = () => {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      setIsDragging(false);

      setPosition((currentPosition) => {
        localStorage.setItem(
          'desktop-pet-position',
          JSON.stringify(currentPosition),
        );

        return currentPosition;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (event) => {
    if (!petRef.current) return;

    const rect = petRef.current.getBoundingClientRect();

    offsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    draggingRef.current = true;
    setIsDragging(true);
    event.preventDefault();
  };

  return (
    <img
      ref={petRef}
      src="/img/ezgif-45913b1f03d287d2.gif"
      alt="Neighbour Express desktop pet"
      className={`${styles.desktopPet} ${
        isDragging ? styles.desktopPetDragging : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      draggable={false}
    />
  );
}

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

        <p className={styles.heroSubtitle}>
          管理端当前版本：v1.0.90
          <br />
          管理端各模块均受账号权限控制。若无法查看相关页面或功能，
          <br />
          请联系系统管理员为当前账号配置相应权限后再进行操作。
        </p>

        <div className={styles.buttonGroup}>
          <Link to="/docs/intro" className={styles.primaryButton}>
            进入知识库 →
          </Link>
        </div>
      </div>

      <DesktopPet />
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