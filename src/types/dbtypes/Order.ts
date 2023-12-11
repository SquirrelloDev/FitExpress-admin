import {Diet} from "./Diet";
import {UserFullData} from "./UserData";

export type Order = {
    _id: string,
    diet_id: Diet,
    user_id: UserFullData,
    price: number,
    sub_date: {
        from: Date,
        to: Date
    },
    calories: number,
    with_weekends: boolean
}