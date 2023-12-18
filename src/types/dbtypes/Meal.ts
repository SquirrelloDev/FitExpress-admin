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
    tagsId: Tag[],
    ingredients: string[],
    nutritionValues: {
        calories: number,
        carbs: number,
        fats: number,
        proteins: number,
        salt: number
    }
}