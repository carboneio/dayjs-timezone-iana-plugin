import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs-timezone-iana-plugin';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

// Use timezone
const date = dayjs('2014-06-01 12:00').tz('America/New_York');
console.log('Date in New York timezone:', date.format('YYYY-MM-DD HH:mm:ss Z'));

// Set a default timezone
dayjs.tz.setDefault('Europe/London');
const dateWithDefault = dayjs('2014-06-01 12:00').tz();
console.log('Date with default timezone (London):', dateWithDefault.format('YYYY-MM-DD HH:mm:ss Z'));

// Example with different timezones
const timezones = [
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney'
];

const baseDate = '2024-01-15 12:00:00';
console.log('\nSame moment in different timezones:');
timezones.forEach(tz => {
  const converted = dayjs(baseDate).tz(tz);
  console.log(`${tz.padEnd(25)} ${converted.format('YYYY-MM-DD HH:mm:ss Z')}`);
});
