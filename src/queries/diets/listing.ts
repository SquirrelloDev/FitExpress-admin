import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Diet} from "../../types/dbtypes/Diet";
import {AuthParams} from "../../types/queriesTypes/queriesTypes";

interface paginationInfo {
    totalItems: number,
    hasNextPage: boolean,
    hasPrevoiusPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number

}

type OneAuthParams = {
    token: string,
    id: string
}
const userPartialKey = 'DietsList'
type DietsListKey = [typeof userPartialKey, AuthParams]

interface DietsResponse {
    diets: Diet[]
    paginationInfo: paginationInfo
}

const oneDietPartialKey = 'DietList'
type OneDietListKey = [typeof oneDietPartialKey, OneAuthParams]

interface OneDietResponse {
    diet: Diet
}

const listDiets: QueryFunction<DietsResponse, DietsListKey> = async ({signal, queryKey}) => {
    const [, {token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<DietsResponse>(apiRoutes.GET_DIETS(String(pageIndex + 1), String(pageSize)), {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as DietsResponse
}
const listOneDiet: QueryFunction<OneDietResponse, OneDietListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneDietResponse>(apiRoutes.GET_DIET(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {diet: res.data as unknown} as OneDietResponse
}

function useDietsListQuery(params: AuthParams) {
    const queryKey = ['DietsList', params] as DietsListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listDiets, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneDietListQuery(params: OneAuthParams){
    const queryKey = ['DietList', params] as OneDietListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneDiet
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useDietsListQuery