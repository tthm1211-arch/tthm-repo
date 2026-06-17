const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Starting version generation...');

try {
  // 获取git commits
  console.log('📝 Fetching git commits...');
  const output = execSync(
    'git log --oneline -20',
    { encoding: 'utf-8', cwd: process.cwd() }
  );

  console.log('✅ Git output received:');
  console.log(output);

  const commits = output
    .split('\n')
    .filter(line => line.trim())
    .slice(0, 10)
    .map((line) => {
      // 格式: "hash message"，分割空格后取message
      const parts = line.split(' ');
      const message = parts.slice(1).join(' ');
      
      if (!message.includes('+')) {
        console.log(`⏭️  Skipping: ${message}`);
        return null;
      }

      const [version, description] = message.split('+');
      
      return {
        version: version.trim(),
        description: (description || '').trim(),
        date: new Date().toLocaleDateString('zh-CN')
      };
    })
    .filter(Boolean);

  console.log(`📊 Found ${commits.length} versions`);
  console.log(commits);

  // 生成JSON文件
  const publicDir = path.join(process.cwd(), 'public');
  const outputPath = path.join(publicDir, 'versions.json');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('📁 Created public directory');
  }

  fs.writeFileSync(outputPath, JSON.stringify(commits, null, 2));
  console.log(`✅ Generated ${outputPath}`);

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error);
}