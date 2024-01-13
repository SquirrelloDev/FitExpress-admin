import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useExclusionsListQuery from "../queries/exclusions/listing";

function useExclusionsOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useExclusionsListQuery({
        token: userData.token, pageIndex: 1, pageSize: 0
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