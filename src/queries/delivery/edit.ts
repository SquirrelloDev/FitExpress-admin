import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {DeliveryError, DeliveryPostData, DeliveryResponse} from "./create";

export type DeliveryPutData = DeliveryPostData & {id: string}
const updateDelivery:MutationFunction<DeliveryResponse, DeliveryPutData> = async (deli) => {
    const res = await FitExpressClient.getInstance().put<DeliveryResponse, DeliveryError>(apiRoutes.EDIT_DELIVERY(deli.id), {
        ...deli.delivery
    }, {headers: {Authorization: `Bearer ${deli.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useDeliveryEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<DeliveryResponse, DeliveryError, DeliveryPutData>(['Delivery-Update'], updateDelivery, {onSuccess: () => {
            toast.success('Punkt zedytowany!');
            queryClient.invalidateQueries(['DeliveryList'])
            navigate(appRoutes.delivery);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useDeliveryEdit