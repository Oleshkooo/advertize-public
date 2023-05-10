export type Corner = '0%' | '100%'
type GetReverseCorner = (corner: Corner) => Corner

export const getReverseCorner: GetReverseCorner = corner => {
    return corner === '0%' ? '100%' : '0%'
}
