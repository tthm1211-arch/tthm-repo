import React from 'react';

export default function WordCount({ content }) {
  const count = content.replace(/\s/g, '').length;
  return <div style={{ color: '#999', fontSize: '12px', marginTop: '10px' }}>WordCount：{count}</div>;
}