import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';


function CircularText({ text, radius }) {
  const characters = text.split('');
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: radius * 2,
      height: radius * 2,
      marginLeft: -radius,
      marginTop: -radius,
      animation: 'circular-rotate 10s linear infinite',
      pointerEvents: 'none',
    }}>
      {characters.map((char, index) => {
        const angle = (index / characters.length) * 360;
        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
              transformOrigin: '50% 50%',
              fontSize: '20px',
              fontWeight: 500,
              color: '#000',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <Layout title="知识库">
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - var(--ifm-navbar-height))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative' }}>
          <CircularText text="NEIGHBOUR EXPRESS · KNOWLEDGE BASE· " radius={140} />
          <Link to="/docs/intro" style={{ fontSize: '24px', color: '#2e8555', fontWeight: 'bold' }}>
            进入知识库
          </Link>
        </div>
      </main>
    </Layout>
  );
}
