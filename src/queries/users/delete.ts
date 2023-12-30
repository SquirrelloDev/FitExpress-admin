import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";

export const deletionKey = ['deleteUser'];
function useUserDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

        await FitExpressClient.getInstance().delete(apiRoutes.DELETE_USER(id), {headers: {Authorization: `Bearer ${token}`}})
    }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['UsersList']}) , onError: (err: AxiosError) => console.error('User not deleted!', err)}
)
    return {mutate,error,isLoading};
}
export default useUserDelete