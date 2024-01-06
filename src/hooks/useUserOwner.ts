import useUserListQuery from "../queries/users/listing";
import useAuthStore from "../stores/authStore";
import {useMemo} from "react";
import {SelectOption} from "../components/Select/types";

function useUserOwner(){
    const userData = useAuthStore((state) => state.userData);
    const {isLoading, data} = useUserListQuery({
        token: userData.token
    })
    const users = useMemo<SelectOption[]>(() => {
        if(!isLoading){
            return data!.users.map(user => {
                return {
                    value: user._id,
                    label: user.name
                }
            })
        }
        return []
    }, [isLoading, data])
    return users
}
export default useUserOwner;