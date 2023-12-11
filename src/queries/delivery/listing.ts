import {QueryFunction, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {apiRoutes} from "../../utils/api";
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
// type OneAuthParams = {
//     token: string,
//     id: string
// }
const userPartialKey = 'DeliveryList'
type DeliveryListKey = [typeof userPartialKey, AuthParams]

interface DeliveryResponse {
    points: DeliveryPoint[]
    paginationInfo: paginationInfo
}

// const oneTagPartialKey = 'TagList'
// type OneTagListKey = [typeof oneTagPartialKey, OneAuthParams]

// interface OneTagResponse {
//     tag: Tag
// }

const listDelivery: QueryFunction<DeliveryResponse, DeliveryListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await axios.get<DeliveryResponse>(apiRoutes.GET_DELIVERY, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as DeliveryResponse
}
// const listOneTag: QueryFunction<OneTagResponse, OneTagListKey> = async ({signal, queryKey}) => {
//     const [, {token, id}] = queryKey;
//     const res = await axios.get<OneTagResponse>(apiRoutes.GET_MEAL(id), {
//         signal, headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
//     return {tag: res.data as unknown} as OneTagResponse
// }

function useDeliveryListQuery(params: AuthParams) {
    const queryKey = ['DeliveryList', params] as DeliveryListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listDelivery, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
// export function useOneTagListQuery(params: OneAuthParams){
//     const queryKey = ['TagList', params] as OneTagListKey
//     const {data, error, isLoading, isSuccess, isError} = useQuery({
//             queryKey, queryFn: listOneTag
//         }
//     )
//     return {data, error, isError, isSuccess, isLoading}
// }

export default useDeliveryListQuery