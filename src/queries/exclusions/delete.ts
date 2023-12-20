import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";

export const deletionKey = ['deleteExclusion'];
function useExclusionDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

            await FitExpressClient.getInstance().delete(apiRoutes.DELETE_EXCLUSION(id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['ExclusionsList']}) , onError: (err: AxiosError) => console.error('Exclusion not deleted!', err)}
    )
    return {mutate,error,isLoading};
}
export default useExclusionDelete