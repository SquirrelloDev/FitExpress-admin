import {Exclusion} from "./Exclusions";
import {Tag} from "./Tags";

export type Diet = {
    _id: string,
    name: string,
    diet_type: "Fixed" | "Flexi",
    img: {
        imgPath: string,
        uri: string
    },
    short_desc: string,
    long_desc: string,
    basic_info: string[],
    exclusions: Exclusion[],
    tags_id: Tag[],
    prices: {
        kcal1200: number,
        kcal1500: number,
        kcal1800: number,
        kcal2000: number,
        kcal2200: number,
        kcal2500: number
    },
    macros: {
        fats: number,
        carbs: number,
        proteins: number
    },
    imageBuffer: string
}