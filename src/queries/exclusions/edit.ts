import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {ExclusionError, ExclusionPostData, ExclusionResponse} from "./create";

export type ExclusionPutData = ExclusionPostData & {id: string}
const updateExclusion:MutationFunction<ExclusionResponse, ExclusionPutData> = async (excl) => {
    const res = await FitExpressClient.getInstance().put<ExclusionResponse, ExclusionError>(apiRoutes.EDIT_EXCLUSION(excl.id), {
        ...excl.exclusion
    }, {headers: {Authorization: `Bearer ${excl.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useExclusionEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<ExclusionResponse, ExclusionError, ExclusionPutData>(['Exclusion-Update'], updateExclusion, {onSuccess: () => {
            toast.success('Wykluczenie zedytowane!');
            queryClient.invalidateQueries(['ExclusionsList'])
            navigate(appRoutes.exclusions);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useExclusionEdit