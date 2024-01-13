import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useDeliveryListQuery from "../queries/delivery/listing";

function useDeliveryOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useDeliveryListQuery({
        token: userData.token, pageIndex: 1, pageSize: 0
    })
    const points = useMemo<SelectOption[]>(() => {
        if(!isLoading){
            return data!.points.map(point => {
                return {
                    value: point._id,
                    label: point.name
                }
            })
        }
        return []
    }, [isLoading, data])
    return points
}
export default useDeliveryOwner;