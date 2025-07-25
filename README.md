# Dayjs-timezone-iana-plugin

DayJS timezone plugin alternative to manage DST correctly, using https://www.iana.org/time-zones


## Usage

```sh
   npm i dayjs-timezone-iana-plugin
```

In the code:

```js
   // -> remove dayjs.extend(timezone)
   dayjs.extend(utc)
   dayjs.extend(require('dayjs-timezone-iana-plugin'))

   dayjs('2014-06-01 12:00').tz('America/New_York')
   // You can set a default timezone
   dayjsFactory.tz.setDefault('America/New_York')
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

## Changelog

**0.2.0**
  - Update iana timezone db (2025)

**0.1.0**
  - First version

Maintained by https://carbone.io/ and https://www.easilys.com/ 