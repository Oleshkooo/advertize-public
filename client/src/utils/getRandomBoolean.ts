type GetRandomBoolean = (chance?: number) => boolean

export const getRandomBoolean: GetRandomBoolean = (chance = 0.5) => Math.random() < chance
