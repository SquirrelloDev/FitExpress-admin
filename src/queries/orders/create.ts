import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z, ZodString} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {dateErrorMap, selectErrorMap} from "../users/create";
export const orderSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    dietId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    userId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    addressId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    subDateFrom: z.coerce.date({errorMap: dateErrorMap}),
    subDateTo: z.coerce.date({errorMap: dateErrorMap}),
    price: z.coerce.number().min(1, errorMessages.required),
    calories: z.coerce.number().min(1, errorMessages.required),
    withWeekends: z.boolean(),
})
    .refine((schema) => {
        const subDateFrom = new Date(schema.subDateFrom.getTime()).setHours(1,0,0,0)

        const subDateTo = new Date(schema.subDateTo.getTime()).setHours(1,0,0,0)
        return subDateFrom < subDateTo
    }, {
        path: ['subDateFrom'],
        message: 'Niepoprawny zakres dat'
    })
export type OrderSchema = z.infer<typeof orderSchema>
export type OrderPostData = {
    order:{
        name: string,
        dietId: string,
        userId: string,
        addressId: string,
        subDate: {
            from: Date,
            to: Date
        }
        price: number,
        calories: number,
        withWeekends: boolean,
    }
    token: string
}
export type OrderError = AxiosError<{errors: {general: string}}>
export type OrderResponse = {message: string}
const createOrder:MutationFunction<OrderResponse, OrderPostData> = async (order) => {
    const res = await FitExpressClient.getInstance().post<OrderResponse, OrderError>(apiRoutes.ADD_ORDER, {
        ...order.order
    }, {headers: {Authorization: `Bearer ${order.token}`}})
    if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useOrderCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<OrderResponse, OrderError, OrderPostData>(['Order-Create'], createOrder, {onSuccess: () => {
            toast.success('Zamówienie dodane!');
            queryClient.invalidateQueries(['OrdersList'])
            navigate(appRoutes.orders);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useOrderCreate
