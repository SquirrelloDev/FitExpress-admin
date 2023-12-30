import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";

export const deletionKey = ['deletePromo'];
function usePromoDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

            await FitExpressClient.getInstance().delete(apiRoutes.DELETE_PROMOCODE(id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['PromosList']}) , onError: (err: AxiosError) => console.error('Meal not deleted!', err)}
    )
    return {mutate,error,isLoading};
}
export default usePromoDelete