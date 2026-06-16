import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './history.module.css';

export default function HistoryPage() {
  const [commits, setCommits] = useState([]);
  const [widths, setWidths] = useState([80, 100, 300, 120]);
  const [dragging, setDragging] = useState(null);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/repos/tthm1211-arch/tthm-repo/commits?per_page=10')
      .then(res => res.json())
      .then(data => {
        const parsed = data
          .map((commit, index) => {
            const message = commit.commit.message;
            if (!message.includes('+')) {
              return null; // 不符合格式，过滤掉
            }
            const [version, description] = message.split('+');
            return {
              seq: index + 1,
              version: version.trim(),
              description: (description || '').trim(),
              date: new Date(commit.commit.author.date).toLocaleDateString('zh-CN'),
            };
          })
          .filter(Boolean); // 移除null项
        
        setCommits(parsed);
      })
      .catch(err => console.error('Failed to fetch commits:', err));
  }, []);

  const handleMouseDown = (index, e) => {
    setDragging(index);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (dragging === null) return;
    const diff = e.clientX - startX;
    setWidths(prev => {
      const newWidths = [...prev];
      newWidths[dragging] = Math.max(50, newWidths[dragging] + diff);
      return newWidths;
    });
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  if (commits.length === 0) {
    return (
      <Layout title="历史版本" description="项目版本历史">
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>历史版本</h1>
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
              暂无版本更新
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="历史版本" description="项目版本历史">
      <main 
        className={styles.main}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={styles.container}>
          <h1>历史版本</h1>

          <table className={styles.table} style={{ width: widths.reduce((a, b) => a + b) }}>
            <thead>
              <tr className={styles.headerRow}>
                <th style={{ width: widths[0], position: 'relative' }}>
                  序号
                  <div onMouseDown={(e) => handleMouseDown(0, e)} style={{ position: 'absolute', right: -3, top: 0, height: '100%', width: '6px', cursor: 'col-resize', backgroundColor: dragging === 0 ? '#0366d6' : 'transparent' }} />
                </th>
                <th style={{ width: widths[1], position: 'relative' }}>
                  版本号
                  <div onMouseDown={(e) => handleMouseDown(1, e)} style={{ position: 'absolute', right: -3, top: 0, height: '100%', width: '6px', cursor: 'col-resize', backgroundColor: dragging === 1 ? '#0366d6' : 'transparent' }} />
                </th>
                <th style={{ width: widths[2], position: 'relative' }}>
                  版本描述
                  <div onMouseDown={(e) => handleMouseDown(2, e)} style={{ position: 'absolute', right: -3, top: 0, height: '100%', width: '10px', cursor: 'col-resize', backgroundColor: dragging === 2 ? '#0366d6' : 'transparent' }} />
                </th>
                <th style={{ width: widths[3] }}>时间</th>
              </tr>
            </thead>
            <tbody>
              {commits.map((commit, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? styles.alternate : ''}>
                  <td>{commit.seq}</td>
                  <td>{commit.version}</td>
                  <td>{commit.description}</td>
                  <td>{commit.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}