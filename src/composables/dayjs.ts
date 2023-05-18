import { dayjs } from '@/plugins'

// 2023-10-03 08:00
export function timeStampChangeString(timeStamp:number):string {
  return dayjs(timeStamp).format('YYYY/MM/DD')
}

// 剩餘 23 天
export function formatRemainingTime(timeStamp:any) {
  const currentTime = dayjs()
  const targetTime = dayjs(timeStamp)
  const diff = targetTime.diff(currentTime, 'day')

  return diff
}

// 預計於 XX年XX月實現
export function formatDateAccomplish(timestamp:number) {
  return dayjs(timestamp).format('預計於 YYYY 年 M 月實現')
}
