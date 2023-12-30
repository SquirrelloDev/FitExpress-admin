import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DayFixed} from "../../types/dbtypes/DayFixed";

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
const userPartialKey = 'FixedsList'
type FixedListKey = [typeof userPartialKey, AuthParams]

interface FixedResponse {
    fixedDays: DayFixed[]
    paginationInfo: paginationInfo
}

const oneFixedPartialKey = 'FixedList'
type OneFixedListKey = [typeof oneFixedPartialKey, OneAuthParams]

interface OneFixedResponse {
    day: DayFixed
}

const listFixed: QueryFunction<FixedResponse, FixedListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<FixedResponse>(apiRoutes.GET_FIXEDS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as FixedResponse
}
const listOneFixed: QueryFunction<OneFixedResponse, OneFixedListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneFixedResponse>(apiRoutes.GET_FIXED_ID(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {day: res.data as unknown} as OneFixedResponse
}

function useFixedListQuery(params: AuthParams) {
    const queryKey = ['FixedsList', params] as FixedListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listFixed, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneFixedListQuery(params: OneAuthParams){
    const queryKey = ['FixedList', params] as OneFixedListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneFixed
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useFixedListQuery