const dayjs = require('dayjs');
const assert = require('assert');

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('../index.js'));

const patternOut = 'YYYY-MM-DD HH:mm:ss Z';

describe('test', function () {

  it('should manage timezone', function () {
    assert.equal(dayjs('2021-11-18 08:05:00-00:00').tz('Europe/London').format(patternOut),    '2021-11-18 08:05:00 +00:00');
    assert.equal(dayjs('1997-12-17 07:37:16-08:00').tz('America/New_York').format(patternOut), '1997-12-17 10:37:16 -05:00');
  });

});
