import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useDeliveryListQuery from "../queries/delivery/listing";
import useTagsListQuery from "../queries/tags/listing";
import useExclusionsListQuery from "../queries/exclusions/listing";
import exclusions from "../pages/Exclusions/Exclusions";

function useExclusionsOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useExclusionsListQuery({
        token: userData.token
    })
    const exclusions = useMemo<SelectOption[]>(() => {
        if(!isLoading){
            return data!.exclusions.map(excl => {
                return {
                    value: excl._id,
                    label: excl.name
                }
            })
        }
        return []
    }, [isLoading, data])
    return exclusions
}
export default useExclusionsOwner;