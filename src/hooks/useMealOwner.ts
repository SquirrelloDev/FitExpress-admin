import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useMealListQuery from "../queries/meals/listing";

function useMealOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useMealListQuery({
        token: userData.token
    })
    const meals = useMemo<SelectOption[]>(() => {
        if(!isLoading){
            return data!.meals.map(meal => {
                return {
                    value: meal._id,
                    label: meal.name
                }
            })
        }
        return []
    }, [isLoading, data])
    return meals
}
export default useMealOwner;