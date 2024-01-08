import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useDietsListQuery from "../queries/diets/listing";
import diets from "../pages/Diets/Diets";

function useDeliveryOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useDietsListQuery({
        token: userData.token
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