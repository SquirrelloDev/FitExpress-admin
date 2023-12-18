import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {apiRoutes, queryClient} from "../../utils/api";

export const deletionKey = ['deleteDiet'];
function useDietDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

            await axios.delete(apiRoutes.DELETE_DIET(id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['DietsList']}) , onError: (err: AxiosError) => console.error('Meal not deleted!', err)}
    )
    return {mutate,error,isLoading};
}
export default useDietDelete