import {Diet} from "./Diet";
import {Meal} from "./Meal";

export type DayFixed = {
    _id: string,
    date: Date,
    diets: {
        diet_id: Diet,
        meals: {
            morning: Meal,
            lunch: Meal,
            dinner: Meal,
            teatime: Meal,
            supper: Meal,
        }
    }[]
}