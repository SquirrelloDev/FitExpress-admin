import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {AddressError, AddressPostData, AddressResponse,} from "./create";

export type AddressPutData = AddressPostData & {id: string}
const updateAddress:MutationFunction<AddressResponse, AddressPutData> = async (address) => {
    const res = await FitExpressClient.getInstance().put<AddressResponse, AddressError>(apiRoutes.EDIT_ADDRESS(address.id), {
        address: {
            ...address.address
        },
        userId: address.userId
    }, {headers: {Authorization: `Bearer ${address.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useAddressEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<AddressResponse, AddressError, AddressPutData>(['Address-Update'], updateAddress, {onSuccess: () => {
            toast.success('Adres zedytowany!');
            queryClient.invalidateQueries(['AddressesList'])
            queryClient.invalidateQueries(['AddressList'])
            navigate(appRoutes.addresses);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useAddressEdit