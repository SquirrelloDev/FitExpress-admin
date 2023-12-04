import {Exclusion} from "./Exclusions";
import {Tag} from "./Tags";

export type Diet = {
    _id: string,
    name: string,
    dietType: "Fixed" | "Flexi",
    img: {
        imgPath: string,
        uri: string
    },
    shortDesc: string,
    longDesc: string,
    basicInfo: string[],
    exclusions: Exclusion[],
    tagsId: Tag[],
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
    }
}