import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Tag} from "../../types/dbtypes/Tags";
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
const userPartialKey = 'TagsList'
type TagsListKey = [typeof userPartialKey, AuthParams]

interface TagsResponse {
    tags: Tag[]
    paginationInfo: paginationInfo
}

const oneTagPartialKey = 'TagList'
type OneTagListKey = [typeof oneTagPartialKey, OneAuthParams]

interface OneTagResponse {
    tag: Tag
}

const listTags: QueryFunction<TagsResponse, TagsListKey> = async ({signal, queryKey}) => {
    const [, {token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<TagsResponse>(apiRoutes.GET_TAGS(String(pageIndex + 1), String(pageSize)), {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as TagsResponse
}
const listOneTag: QueryFunction<OneTagResponse, OneTagListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneTagResponse>(apiRoutes.GET_TAG(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {tag: res.data as unknown} as OneTagResponse
}

function useTagsListQuery(params: AuthParams) {
    const queryKey = ['TagsList', params] as TagsListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listTags, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useOneTagListQuery(params: OneAuthParams){
    const queryKey = ['TagList', params] as OneTagListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneTag
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}

export default useTagsListQuery