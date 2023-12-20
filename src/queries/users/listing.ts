import {QueryFunction, useQuery} from "@tanstack/react-query";
import {UserFullData} from "../../types/dbtypes/UserData";
import axios from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";

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
const userPartialKey = 'UsersList'
type UserListKey = [typeof userPartialKey, AuthParams]

interface UserResponse {
    users: UserFullData[]
    paginationInfo: paginationInfo
}

const oneUserPartialKey = 'UserList'
type OneUserListKey = [typeof oneUserPartialKey, OneAuthParams]

interface OneUserResponse {
    user: UserFullData
}

const listUsers: QueryFunction<UserResponse, UserListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await FitExpressClient.getInstance().get<UserResponse>(apiRoutes.GET_USERS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as UserResponse
}
const listOneUser: QueryFunction<OneUserResponse, OneUserListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneUserResponse>(apiRoutes.GET_USER(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {user: res.data as unknown} as OneUserResponse
}

function useUserListQuery(params: AuthParams) {
    const queryKey = ['UsersList', params] as UserListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listUsers, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneUserListQuery(params: OneAuthParams){
    const queryKey = ['UserList', params] as OneUserListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneUser
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useUserListQuery