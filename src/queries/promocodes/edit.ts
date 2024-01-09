import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {PromocodeError, PromocodePostData, PromocodeResponse} from "./create";

export type PromocodePutData = PromocodePostData & {id: string}
const updatePromo:MutationFunction<PromocodeResponse, PromocodePutData> = async (promo) => {
    const res = await FitExpressClient.getInstance().put<PromocodeResponse, PromocodeError>(apiRoutes.EDIT_PROMOCODE(promo.id), {
        ...promo.promocode
    }, {headers: {Authorization: `Bearer ${promo.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function usePromoEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<PromocodeResponse, PromocodeError, PromocodePutData>(['Promo-Update'], updatePromo, {onSuccess: () => {
            toast.success('Voucher zedytowany!');
            queryClient.invalidateQueries(['PromosList'])
            navigate(appRoutes.promocodes);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default usePromoEdit