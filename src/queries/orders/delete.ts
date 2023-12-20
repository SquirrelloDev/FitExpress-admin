import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";

export const deletionKey = ['deleteOrder'];
function useOrderDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

            await FitExpressClient.getInstance().delete(apiRoutes.DELETE_ORDER(id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['OrdersList']}) , onError: (err: AxiosError) => console.error('Meal not deleted!', err)}
    )
    return {mutate,error,isLoading};
}
export default useOrderDelete