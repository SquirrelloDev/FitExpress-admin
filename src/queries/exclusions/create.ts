import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";

export const exclusionSchema = z.object({
    name: z.string().min(1, errorMessages.required),
})
export type ExclusionSchema = z.infer<typeof exclusionSchema>
export type ExclusionPostData = {
    exclusion:{
    name: string,
    }
    token: string
}
export type ExclusionError = AxiosError<{errors: {general: string}}>
export type ExclusionResponse = {message: string}
const createExclusion:MutationFunction<ExclusionResponse, ExclusionPostData> = async (excl) => {
    const res = await FitExpressClient.getInstance().post<ExclusionResponse, ExclusionError>(apiRoutes.ADD_EXCLUSION, {
        ...excl.exclusion
    }, {headers: {'Content-Type': "application/json", Authorization: `Bearer ${excl.token}`}})
    if(res.response?.status === 409){
        throw new Error('Wykluczenie istnieje!');
    }
    else if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useExclusionCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<ExclusionResponse, ExclusionError, ExclusionPostData>(['Exclusion-Create'], createExclusion, {onSuccess: () => {
            toast.success('Wykluczenie stworzone!');
            queryClient.invalidateQueries(['ExclusionsList'])
            navigate(appRoutes.exclusions);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useExclusionCreate
