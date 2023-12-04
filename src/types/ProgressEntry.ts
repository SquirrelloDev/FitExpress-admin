import {UserFullData} from "./UserData";

export type ProgressEntry = {
    _id: string,
    userId: UserFullData,
    weightProgress: {
        date: Date,
        weight: number
    }[],
    waterProgress: {
        date: Date,
        water: number
    }[]
}