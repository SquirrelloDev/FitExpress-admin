import {UserFullData} from "./UserData";
import {Diet} from "./Diet";
import {Meal} from "./Meal";

type Orders = {
    _id: string,
    userId: UserFullData,
    dietId: Diet,
    selectedMeals: Meal[]
}
export type DailyOrder = {
    _id: string,
    isAddingLocked: boolean,
    orders: Orders[]
}