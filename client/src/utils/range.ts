type Callback = (index: number) => void
type Range = (index: number, cb: Callback) => void

export const range: Range = (index, cb) => {
    for (let i = 0; i < index; i++) {
        cb(i)
    }
}
