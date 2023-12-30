import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Exclusion} from "../../types/dbtypes/Exclusions";

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
const userPartialKey = 'ExclusionsList'
type ExclusionsListKey = [typeof userPartialKey, AuthParams]

interface ExclusionsResponse {
    exclusions: Exclusion[]
    paginationInfo: paginationInfo
}

const oneExclusionPartialKey = 'ExclusionList'
type OneExclusionListKey = [typeof oneExclusionPartialKey, OneAuthParams]

interface OneExclusionResponse {
    exclusion: Exclusion
}

const listExclusions: QueryFunction<ExclusionsResponse, ExclusionsListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<ExclusionsResponse>(apiRoutes.GET_EXCLUSIONS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as ExclusionsResponse
}
const listOneExclusion: QueryFunction<OneExclusionResponse, OneExclusionListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneExclusionResponse>(apiRoutes.GET_MEAL(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {exclusion: res.data as unknown} as OneExclusionResponse
}

function useExclusionsListQuery(params: AuthParams) {
    const queryKey = ['ExclusionsList', params] as ExclusionsListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listExclusions, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneExclusionListQuery(params: OneAuthParams){
    const queryKey = ['ExclusionList', params] as OneExclusionListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneExclusion
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useExclusionsListQuery