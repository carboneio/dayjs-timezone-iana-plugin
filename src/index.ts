import type { PluginFunc, Dayjs } from 'dayjs';
import ianaDB from '../iana-db.json';
import type { IANADatabase } from './types';

const typedIanaDB = ianaDB as unknown as IANADatabase;

/**
 * Finds a zone offset from IANA DB using binary search for better performance
 *
 * @param timestamp - The unix timestamp in milliseconds (UTC)
 * @param zone - The zone like Europe/London
 * @returns Offset in minutes including DST
 */
function findZoneOffset(timestamp: number, zone: string): number {
  // Direct lowercase conversion without redundant checks
  const _zone = zone.toLowerCase();
  const _db = typedIanaDB[_zone];

  if (_db === undefined) {
    throw new Error('Unknown Time Zone ' + zone);
  }

  const offsets = _db.o;
  const untils = _db.u;
  const length = untils.length;

  // Fast path: if only one offset (common for many zones)
  if (length === 1) {
    return offsets[0];
  }

  // Binary search for the correct time period
  let left = 0;
  let right = length - 1;

  while (left < right) {
    const mid = (left + right) >>> 1; // Fast integer division by 2
    const until = untils[mid];

    if (until === null) {
      // null means "infinity" - this is the last period
      right = mid;
      continue;
    }

    // Get offset for calculating adjusted until time
    const offset = offsets[mid];
    const offsetPrev = mid > 0 ? offsets[mid - 1] : offset;

    // Handle ambiguous times (DST transitions)
    // https://github.com/moment/moment-timezone/blob/877c86344f3f230e1bf5881253c29f89e39fe3d2/moment-timezone.js#L193
    const adjustedOffset = offset > offsetPrev ? offsetPrev : offset;
    const adjustedUntil = until - adjustedOffset * 60000;

    if (timestamp < adjustedUntil) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return offsets[left];
}

const plugin: PluginFunc = (option, dayjsClass, dayjsFactory) => {
  let defaultTimezone = '';

  (dayjsFactory as any).tz = {
    setDefault: (zone: string) => {
      defaultTimezone = zone;
    },
  };

  dayjsClass.prototype.tz = function (this: Dayjs, zone: string = defaultTimezone): Dayjs {
    const _utcTimestamp = (this as any).utc().valueOf(); // unix timestamp in ms in UTC
    const _offset = findZoneOffset(_utcTimestamp, zone);
    const _cloned = (this as any).utcOffset(-_offset);
    return _cloned;
  };
};

export default plugin;
export { plugin };
