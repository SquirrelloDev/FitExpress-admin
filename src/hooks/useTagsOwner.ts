import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";
import useTagsListQuery from "../queries/tags/listing";

function useTagsOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useTagsListQuery({
        token: userData.token, pageIndex: 1, pageSize: 0
    })
    const tags = useMemo<SelectOption[]>(() => {
        if(!isLoading){
            return data!.tags.map(tag => {
                return {
                    value: tag._id,
                    label: tag.name
                }
            })
        }
        return []
    }, [isLoading, data])
    return tags
}
export default useTagsOwner;