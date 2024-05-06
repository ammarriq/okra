export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number,
) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)

    timer = setTimeout(() => callback(...args), timeout)
  }
}
