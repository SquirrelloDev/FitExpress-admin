import {QueryFunction, useQuery} from "@tanstack/react-query";
import {UserFullData} from "../../types/UserData";
import axios from "axios";
import {apiRoutes} from "../../utils/api";

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
const userPartialKey = 'UsersList'
type UserListKey = [typeof userPartialKey, AuthParams]

interface UserResponse {
    users: UserFullData[]
    paginationInfo: paginationInfo
}

const listUsers: QueryFunction<UserResponse, UserListKey> = async ({signal, queryKey}) => {
    const [, {token}] = queryKey
    const res = await axios.get<UserResponse>(apiRoutes.GET_USERS, {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}
function useUserListQuery(params: AuthParams) {
    const queryKey = ['UsersList', params]
    const {data, error, isLoading, isSuccess, isError} = useQuery({
        queryKey,
        queryFn: listUsers
    })
    return { data, error, isError, isSuccess, isLoading}
}
export default useUserListQuery