import {UserData} from "./UserData";

export type ProgressEntry = {
    _id: string,
    userId: UserData,
    weightProgress: {
        date: Date,
        weight: number
    }[],
    waterProgress: {
        date: Date,
        water: number
    }[]
}