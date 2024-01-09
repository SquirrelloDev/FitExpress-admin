import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
export const deliverySchema = z.object({
    name: z.string().min(1, errorMessages.required),
    lat: z.coerce.number().min(-90, 'Wartość powinna być w zakresie -90 - 90').max(90, 'Wartość powinna być w zakresie -90 - 90'),
    lng: z.coerce.number().min(-180, 'Wartość powinna być w zakresie -180 - 180').max(180, 'Wartość powinna być w zakresie -180 - 180'),
    radiusKM: z.coerce.number().min(5, 'Wartość powinna być w zakresie 5 - 50').max(50, 'Wartość powinna być w zakresie 5 - 50')
})
export type DeliverySchema = z.infer<typeof deliverySchema>
export type DeliveryPostData = {
    delivery:{
        name: string,
        lat: number,
        lng: number,
        radiusKM: number
    }
    token: string
}
export type DeliveryError = AxiosError<{errors: {general: string}}>
export type DeliveryResponse = {message: string}
const createDelivery:MutationFunction<DeliveryResponse, DeliveryPostData> = async (deli) => {
    const res = await FitExpressClient.getInstance().post<DeliveryResponse, DeliveryError>(apiRoutes.ADD_DELIVERY, {
        ...deli.delivery
    }, {headers: {Authorization: `Bearer ${deli.token}`}})
    if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useDeliveryCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<DeliveryResponse, DeliveryError, DeliveryPostData>(['Delivery-Create'], createDelivery, {onSuccess: () => {
            toast.success('Punkt dodany!');
            queryClient.invalidateQueries(['DeliveryList'])
            navigate(appRoutes.delivery);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useDeliveryCreate
