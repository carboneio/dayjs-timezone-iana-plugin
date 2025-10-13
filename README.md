# Dayjs-timezone-iana-plugin

DayJS timezone plugin alternative to manage DST correctly, using https://www.iana.org/time-zones


## Installation

```sh
npm i dayjs-timezone-iana-plugin
```

## Usage

### TypeScript / ES Modules

```typescript
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs-timezone-iana-plugin';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

// Use timezone
const date = dayjs('2014-06-01 12:00').tz('America/New_York');

// Set a default timezone
dayjs.tz.setDefault('America/New_York');
const dateWithDefault = dayjs('2014-06-01 12:00').tz();
```

### CommonJS / Node.js

```js
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezonePlugin = require('dayjs-timezone-iana-plugin');

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

// Use timezone
const date = dayjs('2014-06-01 12:00').tz('America/New_York');

// Set a default timezone
dayjs.tz.setDefault('America/New_York');
const dateWithDefault = dayjs('2014-06-01 12:00').tz();
```

## Philosophy

The code is quite simple and is largely inspired by moment-timezone.

It includes the latest database IANA 2021e (96KB compressed). 
It takes more space than the method used by DayJS or Luxon. But it works even if NodeJS is compiled with small-icu.


## How to update IANA DB

- go to https://github.com/moment/moment-timezone/tree/develop/data/unpacked
- download `latest.json` https://github.com/moment/moment-timezone/blob/develop/data/unpacked/latest.json
- execute `npm run optimize`
- commit, push

## Todo

- [ ] Add lot of tests (see moment-timezone tests)

## TypeScript Support

This package includes full TypeScript type definitions. The plugin extends the dayjs interface with:

- `dayjs().tz(timezone?: string): Dayjs` - Convert a date to a specific timezone
- `dayjs.tz.setDefault(timezone: string): void` - Set a default timezone

Type definitions are automatically available when using TypeScript.

## Module Formats

This package supports both CommonJS and ES modules:

- **CommonJS**: `require('dayjs-timezone-iana-plugin')`
- **ES Modules**: `import timezonePlugin from 'dayjs-timezone-iana-plugin'`

The package includes:
- CommonJS build in `dist/index.js`
- ES module build in `dist/esm/index.js`
- TypeScript declarations in `dist/index.d.ts`

## Performance

This plugin uses an optimized **binary search algorithm** (O(log n)) to find timezone offsets, making it significantly faster than linear search approaches, especially for timezones with complex historical changes.

**Key improvements:**
- Up to 6x faster for complex timezones with many historical transitions
- O(log n) complexity instead of O(n)
- Fast path for simple timezones with single offset
- Consistent sub-millisecond performance

## Testing

Run the test suite:
```bash
npm test
```

All tests are located in `test/test.index.js` and cover:
- Basic timezone functionality
- Edge cases (invalid timezones, null handling, case sensitivity)
- Module format exports (CommonJS compatibility)

## Examples

See the `examples/` directory for complete usage examples:
- `examples/typescript-example.ts` - TypeScript usage
- `examples/commonjs-example.js` - CommonJS usage

## Changelog

**0.3.0**
  - Add full TypeScript support with type definitions
  - Add ES module (ESM) support with proper import/export
  - Add dual module format (CommonJS + ESM)
  - Add comprehensive type definitions with module augmentation
  - Add build process for both CJS and ESM outputs
  - Add edge case tests and consolidated test suite
  - Optimize `findZoneOffset` with binary search (O(log n) instead of O(n))
  - Add fast path for single-offset timezones
  - Improve performance for complex timezones (up to 6x faster)
  - Maintain backward compatibility with existing CommonJS usage
  - Update dependencies (TypeScript 5.9, Mocha 11.7, @types/node 20)

**0.2.0**
  - Update iana timezone db (2025)

**0.1.0**
  - First version

Maintained by https://carbone.io/ and https://www.easilys.com/ 