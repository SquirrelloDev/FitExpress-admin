import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useDietsListQuery from "../queries/diets/listing";

function useDeliveryOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useDietsListQuery({
        token: userData.token, pageIndex: 1, pageSize: 0
    })
    const diets = useMemo<SelectOption[]>(() => {
        if(!isLoading){
            return data!.diets.map(diet => {
                return {
                    value: diet._id,
                    label: diet.name
                }
            })
        }
        return []
    }, [isLoading, data])
    return diets
}
export default useDeliveryOwner;