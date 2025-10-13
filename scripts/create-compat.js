const fs = require('fs');
const path = require('path');

// Create a CommonJS compatibility wrapper for the root index.js
const compatCode = `const plugin = require('./dist/index.js');

// For CommonJS compatibility, export default as the main export
module.exports = plugin.default || plugin;
module.exports.default = plugin.default || plugin;
module.exports.plugin = plugin.plugin || plugin;
`;

fs.writeFileSync(path.join(__dirname, '../index.js'), compatCode, 'utf8');
console.log('Created compatibility index.js');
