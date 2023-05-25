import { App } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export function setupDayjs(AppInstance:App<Element>) {
  AppInstance.provide('$dayjs', dayjs)
}
export { dayjs }
