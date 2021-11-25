const fs = require('fs');
const rawDB = require('./latest.json');
const compactDB = rawDB.zones.reduce((o, c) => {
  o[c.name.toLowerCase()] = {u : c.untils, o : c.offsets};
  return o;
}, {});
fs.writeFileSync('iana-db.json', JSON.stringify(compactDB));