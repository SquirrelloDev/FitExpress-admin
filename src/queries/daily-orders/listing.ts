import {QueryFunction, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DailyOrder} from "../../types/dbtypes/DailyOrder";

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
    date: string
}
const userPartialKey = 'DailyOrdersList'
type DailyOrderListKey = [typeof userPartialKey, AuthParams]

interface DailyOrderResponse {
    daily: DailyOrder[]
    paginationInfo: paginationInfo
}

const oneDailyOrderPartialKey = 'DailyOrderList'
type OneDailyOrderListKey = [typeof oneDailyOrderPartialKey, OneAuthParams]

interface OneDailyOrderResponse {
    daily: DailyOrder
}

const listDailyOrders: QueryFunction<DailyOrderResponse, DailyOrderListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<DailyOrderResponse>(apiRoutes.GET_DAILY, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as DailyOrderResponse
}
const listOneDailyOrder: QueryFunction<OneDailyOrderResponse, OneDailyOrderListKey> = async ({signal, queryKey}) => {
    const [, {token, date}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneDailyOrderResponse>(apiRoutes.GET_DAILY_DATE(date), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {daily: res.data as unknown} as OneDailyOrderResponse
}

function useDailyOrdersListQuery(params: AuthParams) {
    const queryKey = ['DailyOrdersList', params] as DailyOrderListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listDailyOrders, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneDailyOrderListQuery(params: OneAuthParams){
    const queryKey = ['DailyOrderList', params] as OneDailyOrderListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneDailyOrder
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useDailyOrdersListQuery