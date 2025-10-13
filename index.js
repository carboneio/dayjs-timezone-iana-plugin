const plugin = require('./dist/index.js');

// For CommonJS compatibility, export default as the main export
module.exports = plugin.default || plugin;
module.exports.default = plugin.default || plugin;
module.exports.plugin = plugin.plugin || plugin;
