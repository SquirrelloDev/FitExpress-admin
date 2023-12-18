import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {apiRoutes, queryClient} from "../../utils/api";

export const deletionKey = ['deleteAddress'];
function useAddressDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

            await axios.delete(apiRoutes.DELETE_ADDRESS(id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['AddressesList']}) , onError: (err: AxiosError) => console.error('Meal not deleted!', err)}
    )
    return {mutate,error,isLoading};
}
export default useAddressDelete