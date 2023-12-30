import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Order} from "../../types/dbtypes/Order";

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
const userPartialKey = 'OrdersList'
type OrdersListKey = [typeof userPartialKey, AuthParams]

interface OrdersResponse {
    orders: Order[]
    paginationInfo: paginationInfo
}

const oneOrderPartialKey = 'OrderList'
type OneOrderListKey = [typeof oneOrderPartialKey, OneAuthParams]

interface OneOrderResponse {
    order: Order
}

const listOrders: QueryFunction<OrdersResponse, OrdersListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<OrdersResponse>(apiRoutes.GET_ORDERS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as OrdersResponse
}
const listOneOrder: QueryFunction<OneOrderResponse, OneOrderListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneOrderResponse>(apiRoutes.GET_ORDER(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {order: res.data as unknown} as OneOrderResponse
}

function useOrdersListQuery(params: AuthParams) {
    const queryKey = ['OrdersList', params] as OrdersListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOrders, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneOrderListQuery(params: OneAuthParams){
    const queryKey = ['OrderList', params] as OneOrderListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneOrder
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useOrdersListQuery