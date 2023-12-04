import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {appRoutes} from "../utils/routes";
import useAuthStore from "../stores/authStore";

function useSuccessfulLogin() {
    const navigate = useNavigate()
    const setUserData = useAuthStore((state) => state.setUserData)

    const handleSuccess = useCallback(
        (data) => {
            console.log(data)
            setUserData(data.data)
            navigate(appRoutes.home)
        },
        [setUserData, navigate]
    )

    return handleSuccess
}

export default useSuccessfulLogin