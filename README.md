# Dayjs-timezone-iana-plugin

DayJS timezone plugin alternative to manage DST correctly


## Usage

```sh
   npm i dayjs-timezone-iana-plugin
```

In the code:

```
dayjs.extend(utc)
dayjs.extend(require('dayjs-timezone-iana-plugin'))

dayjs("2014-06-01 12:00").tz("America/New_York")
```

## How to update IANA DB

- go to https://github.com/moment/moment-timezone/tree/develop/data/unpacked
- download `latest.json` https://github.com/moment/moment-timezone/blob/develop/data/unpacked/latest.json
- execute `npm run optimize`
- commit, push
