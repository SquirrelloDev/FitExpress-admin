import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DeliveryPoint} from "../../types/dbtypes/DeliveryPoint";

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
const userPartialKey = 'DeliveryList'
type DeliveryListKey = [typeof userPartialKey, AuthParams]

interface DeliveryResponse {
    points: DeliveryPoint[]
    paginationInfo: paginationInfo
}

const oneTagPartialKey = 'DeliveryOneList'
type OneDeliveryListKey = [typeof oneTagPartialKey, OneAuthParams]

interface OneDeliveryResponse {
    delivery: DeliveryPoint
}

const listDelivery: QueryFunction<DeliveryResponse, DeliveryListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<DeliveryResponse>(apiRoutes.GET_DELIVERY, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as DeliveryResponse
}
const listOneDelivery: QueryFunction<OneDeliveryResponse, OneDeliveryListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneDeliveryResponse>(apiRoutes.GET_DELIVERY_ID(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {delivery: res.data as unknown} as OneDeliveryResponse
}

function useDeliveryListQuery(params: AuthParams) {
    const queryKey = ['DeliveryList', params] as DeliveryListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listDelivery, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneDeliveryListQuery(params: OneAuthParams){
    const queryKey = ['DeliveryOneList', params] as OneDeliveryListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneDelivery
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useDeliveryListQuery