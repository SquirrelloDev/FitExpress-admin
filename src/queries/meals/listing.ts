import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Meal} from "../../types/dbtypes/Meal";

interface paginationInfo {
    totalItems: number,
    hasNextPage: boolean,
    hasPrevoiusPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number

}

type AuthParams = {
    token: string,
}
type OneAuthParams = {
    token: string,
    id: string
}
const userPartialKey = 'MealsList'
type MealsListKey = [typeof userPartialKey, AuthParams]

interface MealResponse {
    meals: Meal[]
    paginationInfo: paginationInfo
}

const oneMealPartialKey = 'MealList'
type OneMealListKey = [typeof oneMealPartialKey, OneAuthParams]

interface OneMealResponse {
    meal: Meal
}

const listMeals: QueryFunction<MealResponse, MealsListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<MealResponse>(apiRoutes.GET_MEALS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as MealResponse
}
const listOneMeal: QueryFunction<OneMealResponse, OneMealListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneMealResponse>(apiRoutes.GET_MEAL(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {meal: res.data as unknown} as OneMealResponse
}

function useMealListQuery(params: AuthParams) {
    const queryKey = ['MealsList', params] as MealsListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listMeals, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneMealListQuery(params: OneAuthParams){
    const queryKey = ['MealList', params] as OneMealListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneMeal
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useMealListQuery