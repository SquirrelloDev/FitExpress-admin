import {Meal} from "./Meal";

export type DayFlexi = {
    _id: string,
    date: Date,
    morning_meals: Meal[],
    lunch_meals: Meal[],
    dinner_meals: Meal[],
    teatime_meals: Meal[],
    supper_meals: Meal[],
}