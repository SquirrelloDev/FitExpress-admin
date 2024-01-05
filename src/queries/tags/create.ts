import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
export const tagsSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    description: z.string().min(1, errorMessages.required),
})
export type TagsSchema = z.infer<typeof tagsSchema>
export type TagsPostData = {
    tag:{
    name: string,
    description: string,
    }
    token: string
}
export type TagsError = AxiosError<{errors: {general: string}}>
export type TagsResponse = {message: string}
const createTags:MutationFunction<TagsResponse, TagsPostData> = async (tag) => {
    const res = await FitExpressClient.getInstance().post<TagsResponse, TagsError>(apiRoutes.ADD_TAG, {
        ...tag.tag
    }, {headers: {'Content-Type': "application/json", Authorization: `Bearer ${tag.token}`}})
    if(res.response?.status === 409){
        throw new Error('Tag istnieje!');
    }
    else if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useTagsCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<TagsResponse, TagsError, TagsPostData>(['Tags-Create'], createTags, {onSuccess: () => {
            toast.success('Tag stworzony!');
            queryClient.invalidateQueries(['TagsList'])
            navigate(appRoutes.tags);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useTagsCreate
