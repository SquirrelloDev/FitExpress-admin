import useAuthStore from "../../stores/authStore";
import {Link, useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import classes from "../../sass/components/nav.module.scss";
import NavContainer from "./NavContainer";
export function Nav() {
    const {logout} = useAuthStore();
    const navigate = useNavigate();
    return (
        <nav className={classes.nav}>
            <div>
                <Link to={appRoutes.home} className={classes.nav__logo}>FitExpress</Link>
            </div>
            <NavContainer/>
            <div>
            <button onClick={() => {
                logout();
                navigate(appRoutes.login)
            }
            }>Log out</button>
            </div>
        </nav>
    )
}