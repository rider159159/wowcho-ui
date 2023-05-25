import dayjs from 'dayjs'
import 'dayjs/plugin/duration'

declare module 'dayjs' {
  export function duration(
    value: number | string | Date | dayjs.Dayjs,
    unit?: dayjs.OpUnitType
  ): dayjs.Duration;
}
