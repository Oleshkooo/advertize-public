type Range = (n: number, fn: (i: number) => void) => void

export const range: Range = (n, fn) => {
    for (let i = 0; i < n; i++) fn(i)
}
