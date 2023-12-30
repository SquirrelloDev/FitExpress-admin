import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DayFlexi} from "../../types/dbtypes/DayFlexi";

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
const userPartialKey = 'FlexisList'
type FlexiListKey = [typeof userPartialKey, AuthParams]

interface FlexiResponse {
    flexiDays: DayFlexi[]
    paginationInfo: paginationInfo
}

const oneFlexiPartialKey = 'FlexiList'
type OneFlexiListKey = [typeof oneFlexiPartialKey, OneAuthParams]

interface OneFlexiResponse {
    day: DayFlexi
}

const listFlexi: QueryFunction<FlexiResponse, FlexiListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<FlexiResponse>(apiRoutes.GET_FLEXIS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as FlexiResponse
}
const listOneFlexi: QueryFunction<OneFlexiResponse, OneFlexiListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneFlexiResponse>(apiRoutes.GET_FLEXI_ID(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {day: res.data as unknown} as OneFlexiResponse
}

function useFlexiListQuery(params: AuthParams) {
    const queryKey = ['FlexisList', params] as FlexiListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listFlexi, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneFlexiListQuery(params: OneAuthParams){
    const queryKey = ['FlexiList', params] as OneFlexiListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneFlexi
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useFlexiListQuery