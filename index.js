const ianaDB = require('./iana-db.json');

/**
 * Finds a zone offset.from IANA DB
 *
 * @param  {number}  timestamp  The unix timestamp in UTC
 * @param  {string}  zone       The zone like Europe/London
 * @return {number}             Offset in minute including DST
 */
function findZoneOffset (timestamp, zone) {
  let _zone = '';
  if (typeof(zone) === 'string' ) {
    _zone = zone.toLowerCase();
  }
  let _db = ianaDB[_zone];
  if (_db === undefined) {
    throw Error('Unknown Time Zone ' + zone);
  }
  let offsets = _db.o;
  let untils  = _db.u;
  let max     = untils.length - 1;
  let offset;
  let offsetPrev;
  let i;

  for (i = 0; i < max; i++) {
    offset     = offsets[i];
    offsetPrev = offsets[i ? i - 1 : i];

    // Do we need to add options to move Ambiguous date like in moment
    // https://github.com/moment/moment-timezone/blob/877c86344f3f230e1bf5881253c29f89e39fe3d2/moment-timezone.js#L193
    if (offset > offsetPrev) {
      offset = offsetPrev;
    }

    if (timestamp < untils[i] - (offset * 60000)) {
      return offsets[i];
    }
  }
  return offsets[max];
}


const plugin = (option, dayjsClass, dayjsFactory) => {
  let defaultTimezone = '';

  dayjsFactory.tz = {};
  dayjsFactory.tz.setDefault = (zone) => {
    defaultTimezone = zone;
  };

  dayjsClass.prototype.tz = function (zone = defaultTimezone) {
    const _utcTimestamp = this.utc().valueOf(); // unix timestamp in ms u UTC
    const _offset = findZoneOffset(_utcTimestamp, zone);
    const _cloned = this.utcOffset(-_offset);
    return _cloned;
  };
};

module.exports = plugin;

