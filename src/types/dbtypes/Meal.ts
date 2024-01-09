import {Exclusion} from "./Exclusions";
import {Tag} from "./Tags";

export type Meal = {
    _id: string,
    name: string,
    description: string,
    img: {
        imgPath: string,
        uri: string
    },
    imageBuffer: string
    exclusions: Exclusion[],
    tags_id: Tag[],
    ingredients: string[],
    nutrition_values: {
        calories: number,
        carbs: number,
        fats: number,
        proteins: number,
        salt: number
    }
}