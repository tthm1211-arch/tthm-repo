import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="知识库">
      <main style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'60vh', gap:'24px'}}>
        <Link to="/docs/intro" style={{fontSize:'24px'}}>
       
          进入知识库
        </Link>
      </main>
    </Layout>
  );
}
