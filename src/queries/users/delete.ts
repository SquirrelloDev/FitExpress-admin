import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {apiRoutes, queryClient} from "../../utils/api";

export const deletionKey = ['deleteUser'];
function useUserDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}) => {

        await axios.delete(apiRoutes.DELETE_USER(id), {headers: {Authorization: `Bearer ${token}`}})
    }, {onSuccess: () => queryClient.invalidateQueries('UsersList') , onError: (err: AxiosError) => console.error('User not deleted!', err)}
)
    return {mutate,error,isLoading};
}
export default useUserDelete