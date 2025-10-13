import type { PluginFunc, Dayjs as DayjsType } from 'dayjs';

export interface IANAZoneData {
  /** Array of offsets in minutes */
  o: number[];
  /** Array of until timestamps (unix timestamp in milliseconds) */
  u: (number | null)[];
}

export interface IANADatabase {
  [zoneName: string]: IANAZoneData;
}

declare module 'dayjs' {
  interface Dayjs {
    /**
     * Set timezone for the current dayjs instance
     * @param zone - IANA timezone name (e.g., 'America/New_York', 'Europe/London')
     * @returns A new dayjs instance with the timezone applied
     */
    tz(zone?: string): DayjsType;
  }

  interface DayjsStatic {
    tz: {
      /**
       * Set a default timezone that will be used when no timezone is specified
       * @param zone - IANA timezone name
       */
      setDefault(zone: string): void;
    };
  }
}

export type TimezoneIANAPlugin = PluginFunc;
