import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {dateErrorMap} from "../users/create";
export const promocodeSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    discount: z.coerce.number().min(1, 'Zniżka powinna mieć conajmniej 1%').max(75, 'Maksymalna wartość zniżki: 75%'),
    exp_date: z.coerce.date({errorMap: dateErrorMap})
}).refine((schema) =>{
    const expDate = new Date(schema.exp_date.getTime());
    return expDate.getTime() > Date.now()

}, {
    path: ['exp_date'],
    message: 'Voucher może być ważny do następnego dnia w górę'
})
export type PromocodeSchema = z.infer<typeof promocodeSchema>
export type PromocodePostData = {
    promocode:{
        name: string,
        discount: number,
        exp_date: Date
    }
    token: string
}
export type PromocodeError = AxiosError<{errors: {general: string}}>
export type PromocodeResponse = {message: string}
const createPromo:MutationFunction<PromocodeResponse, PromocodePostData> = async (promo) => {
    const res = await FitExpressClient.getInstance().post<PromocodeResponse, PromocodeError>(apiRoutes.ADD_PROMOCODE, {
        ...promo.promocode
    }, {headers: {Authorization: `Bearer ${promo.token}`}})
    if(res.response?.status === 409){
        throw new Error('Kod istnieje!');
    }
    else if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function usePromoCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<PromocodeResponse, PromocodeError, PromocodePostData>(['Promo-Create'], createPromo, {onSuccess: () => {
            toast.success('Voucher stworzony!');
            queryClient.invalidateQueries(['PromosList'])
            navigate(appRoutes.promocodes);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default usePromoCreate
