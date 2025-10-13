const fs = require('fs');
const path = require('path');

// Add .js extensions to ESM imports for proper module resolution
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix JSON imports with import attributes for Node.js ESM
  content = content.replace(
    /from ['"](\.\..+?\.json)['"]/g,
    "from '$1' with { type: 'json' }"
  );

  // Fix relative imports: from './types' -> from './types.js'
  content = content.replace(
    /from ['"](\.\/.+?)(?<!\.json)['"]/g,
    "from '$1.js'"
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

// Process all .js files in dist/esm
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.js')) {
      fixImports(filePath);
    }
  });
}

const esmDir = path.join(__dirname, '../dist/esm');
if (fs.existsSync(esmDir)) {
  processDirectory(esmDir);

  // Copy iana-db.json to dist directory for proper imports
  const ianaDbSource = path.join(__dirname, '../iana-db.json');
  const ianaDbDest = path.join(__dirname, '../dist/iana-db.json');
  if (fs.existsSync(ianaDbSource)) {
    fs.copyFileSync(ianaDbSource, ianaDbDest);
  }

  console.log('ESM imports fixed successfully');
}
