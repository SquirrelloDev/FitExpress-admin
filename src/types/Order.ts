import {Diet} from "./Diet";
import {UserData} from "./UserData";

export type Order = {
    _id: string,
    dietId: Diet,
    userId: UserData,
    price: number,
    subDate: {
        from: Date,
        to: Date
    },
    withWeekends: boolean
}