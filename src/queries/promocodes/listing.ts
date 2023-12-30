import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Promocode} from "../../types/dbtypes/Promocode";

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
const userPartialKey = 'PromosList'
type PromosListKey = [typeof userPartialKey, AuthParams]

interface PromosResponse {
    promocodes: Promocode[]
    paginationInfo: paginationInfo
}

const onePromoPartialKey = 'PromoList'
type OnePromoListKey = [typeof onePromoPartialKey, OneAuthParams]

interface OnePromoResponse {
    promocode: Promocode
}

const listPromos: QueryFunction<PromosResponse, PromosListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<PromosResponse>(apiRoutes.GET_PROMOCODES, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as PromosResponse
}
const listOnePromo: QueryFunction<OnePromoResponse, OnePromoListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OnePromoResponse>(apiRoutes.GET_MEAL(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {promocode: res.data as unknown} as OnePromoResponse
}

function usePromosListQuery(params: AuthParams) {
    const queryKey = ['PromosList', params] as PromosListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listPromos, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOnePromoListQuery(params: OneAuthParams){
    const queryKey = ['PromoList', params] as OnePromoListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOnePromo
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default usePromosListQuery