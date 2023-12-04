import {UserData} from "./UserData";
import {Diet} from "./Diet";
import {Meal} from "./Meal";

type Orders = {
    _id: string,
    userId: UserData,
    dietId: Diet,
    selectedMeals: Meal[]
}
export type DailyOrder = {
    _id: string,
    isAddingLocked: boolean,
    orders: Orders[]
}