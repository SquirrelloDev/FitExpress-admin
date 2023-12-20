import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";

export const deletionKey = ['deleteMeal'];
function useMealDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

            await FitExpressClient.getInstance().delete(apiRoutes.DELETE_MEAL(id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['MealsList']}) , onError: (err: AxiosError) => toast.error(`${err}`)}
    )
    return {mutate,error,isLoading};
}
export default useMealDelete