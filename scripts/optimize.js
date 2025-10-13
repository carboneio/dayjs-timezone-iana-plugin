const fs = require('fs');
const path = require('path');

const rawDB = require(path.join(__dirname, '../latest.json'));
const compactDB = rawDB.zones.reduce((o, c) => {
  o[c.name.toLowerCase()] = {u : c.untils, o : c.offsets};
  return o;
}, {});

const outputPath = path.join(__dirname, '../iana-db.json');
fs.writeFileSync(outputPath, JSON.stringify(compactDB));
console.log('✓ IANA database optimized successfully!');