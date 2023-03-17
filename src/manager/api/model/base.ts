interface respBase<T = null> {
  code: number
  msg: string
  data: T
  encrypt?: boolean
}

export type R<T = null> = respBase<T>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RP<T = any> = respBase<{
  count: number
  list: T[]
}>
