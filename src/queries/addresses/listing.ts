import {QueryFunction, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Address} from "../../types/dbtypes/Address";

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
const userPartialKey = 'AddressesList'
type AddressesListKey = [typeof userPartialKey, AuthParams]

interface AddressesResponse {
    addresses: Address[]
    paginationInfo: paginationInfo
}

const oneAddressPartialKey = 'AddressList'
type OneAddressListKey = [typeof oneAddressPartialKey, OneAuthParams]

interface OneAddressResponse {
    address: Address
}

const listAddresses: QueryFunction<AddressesResponse, AddressesListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<AddressesResponse>(apiRoutes.GET_ADDRESSES, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as AddressesResponse
}
const listOneAddress: QueryFunction<OneAddressResponse, OneAddressListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneAddressResponse>(apiRoutes.GET_ADDRESS(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {address: res.data as unknown} as OneAddressResponse
}

function useAddressesListQuery(params: AuthParams) {
    const queryKey = ['AddressesList', params] as AddressesListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listAddresses, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneAddressListQuery(params: OneAuthParams){
    const queryKey = ['AddressList', params] as OneAddressListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneAddress
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useAddressesListQuery