import {Meal} from "./Meal";

export type DayFlexi = {
    _id: string,
    date: Date,
    morningMeals: Meal[],
    lunchMeals: Meal[],
    dinnerMeals: Meal[],
    teatimeMeals: Meal[],
    supperMeals: Meal[],
}