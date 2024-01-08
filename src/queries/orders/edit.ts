import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {OrderError, OrderPostData, OrderResponse,} from "./create";

export type OrderPutData = OrderPostData & {id: string}
const updateOrder:MutationFunction<OrderResponse, OrderPutData> = async (order) => {
    const res = await FitExpressClient.getInstance().put<OrderResponse, OrderError>(apiRoutes.EDIT_ORDER(order.id), {
            ...order.order
    }, {headers: {Authorization: `Bearer ${order.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useOrderEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<OrderResponse, OrderError, OrderPutData>(['Order-Update'], updateOrder, {onSuccess: () => {
            toast.success('Zamówienie zedytowane!');
            queryClient.invalidateQueries(['OrdersList'])
            queryClient.invalidateQueries(['OrderList'])
            navigate(appRoutes.orders);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useOrderEdit