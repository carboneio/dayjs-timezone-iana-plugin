const dayjs = require('dayjs');
const assert = require('assert');

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('../index.js'));

const patternOut = 'YYYY-MM-DD HH:mm:ss Z';

describe('Basic functionality', function () {

  it('should manage timezone', function () {
    assert.equal(dayjs('2021-11-18 08:05:00-00:00').tz('Europe/London').format(patternOut),    '2021-11-18 08:05:00 +00:00');
    assert.equal(dayjs('1997-12-17 07:37:16-08:00').tz('America/New_York').format(patternOut), '1997-12-17 10:37:16 -05:00');
  });

});

describe('Edge cases', function () {

  beforeEach(function() {
    // Reset default timezone before each test
    if (dayjs.tz && dayjs.tz.setDefault) {
      dayjs.tz.setDefault('Europe/London'); // Set to valid default
    }
  });

  it('should throw error when timezone is not set and no default', function () {
    // Explicitly set to empty to test the error case
    dayjs.tz.setDefault('');
    try {
      dayjs('2021-11-18 08:05:00-00:00').tz();
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.ok(error.message.includes('Unknown Time Zone'));
    }
  });

  it('should work with default timezone', function () {
    dayjs.tz.setDefault('Europe/London');
    const result = dayjs('2021-11-18 08:05:00-00:00').tz();
    assert.ok(result.isValid());
  });

  it('should throw error for invalid timezone', function () {
    try {
      dayjs('2021-11-18 08:05:00-00:00').tz('Invalid/Timezone');
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.ok(error.message.includes('Unknown Time Zone'));
    }
  });

  it('should handle timezone with null untils correctly', function () {
    // Testing with a timezone that has null in untils array
    const result = dayjs('2021-11-18 08:05:00-00:00').tz('Africa/Abidjan');
    assert.ok(result.isValid());
  });

  it('should handle case insensitive timezone names', function () {
    const result1 = dayjs('2021-11-18 08:05:00-00:00').tz('europe/london');
    const result2 = dayjs('2021-11-18 08:05:00-00:00').tz('Europe/London');
    assert.equal(result1.format(), result2.format());
  });

});

describe('Module formats', function () {

  it('should export as CommonJS module', function () {
    const plugin = require('../index.js');
    assert.equal(typeof plugin, 'function');
    assert.ok(plugin.default || plugin);
  });

  it('should have proper exports structure', function () {
    const plugin = require('../index.js');
    assert.ok('default' in plugin || typeof plugin === 'function');
  });

});
