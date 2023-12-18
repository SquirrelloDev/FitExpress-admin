import {UserFullData} from "./UserData";
import {Diet} from "./Diet";
import {Meal} from "./Meal";
import {Order} from "./Order";

export type OrdersArr = {
    _id: string,
    user_id: UserFullData,
    diet_id: Diet,
    order_id: Order
    selected_meals: Meal[]
}
export type DailyOrder = {
    _id: string,
    date: Date,
    is_adding_locked: boolean,
    orders: OrdersArr[]
}