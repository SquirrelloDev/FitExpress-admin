import {Diet} from "./Diet";
import {UserFullData} from "./UserData";

export type Order = {
    _id: string,
    dietId: Diet,
    userId: UserFullData,
    price: number,
    subDate: {
        from: Date,
        to: Date
    },
    withWeekends: boolean
}