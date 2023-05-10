type FilterButtonAnimationDelay = (index: number) => number

export const filterButtonAnimationDelay: FilterButtonAnimationDelay = index => 0.75 + index * 0.2
