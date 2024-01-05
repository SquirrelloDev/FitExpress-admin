import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {TagsError, TagsPostData, TagsResponse} from "./create";
export type UserPutData = {
    user: {
        name: string,
        email: string,
        role: number,
        birth_date: Date
    },
    authInfo: {
        token: string,
        id: string
    }
}
export const tagsPutSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    description: z.string().min(1, errorMessages.required),
})
export type TagsPutSchema = z.infer<typeof tagsPutSchema>;
export type TagsPutData = TagsPostData & {id: string}
const updateTag:MutationFunction<TagsResponse, TagsPutData> = async (tag) => {
    const res = await FitExpressClient.getInstance().put<TagsResponse, TagsError>(apiRoutes.EDIT_TAG(tag.id), {
        ...tag.tag
    }, {headers: {'Content-Type': "application/json", Authorization: `Bearer ${tag.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useTagEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<TagsResponse, TagsError, TagsPutData>(['Tags-Update'], updateTag, {onSuccess: () => {
            toast.success('Tag zedytowany!');
            queryClient.invalidateQueries(['TagsList'])
            navigate(appRoutes.tags);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useTagEdit