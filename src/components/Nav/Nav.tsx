import useAuthStore from "../../stores/authStore";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";

export function Nav() {
    const {logout} = useAuthStore();
    const navigate = useNavigate();
    return (
        <div>
            Navigation
            <button onClick={() => {
                logout();
                navigate(appRoutes.login)
            }
            }>Log out</button>
        </div>
    )
}