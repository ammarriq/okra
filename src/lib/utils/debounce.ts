export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
	callback: T,
	timeout: number
) => {
	let timer: ReturnType<typeof setTimeout>

	return (...args: Parameters<T>) => {
		clearTimeout(timer)

		timer = setTimeout(() => callback(...args), timeout)
	}
}
