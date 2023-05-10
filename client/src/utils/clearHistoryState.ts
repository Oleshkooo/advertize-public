type ClearHistoryState = () => void

export const clearHistoryState: ClearHistoryState = () => {
    window.history.replaceState({}, document.title)
}
