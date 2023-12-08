import useAuthStore from "../../stores/authStore";
import {Link, useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import classes from "../../sass/components/nav.module.scss";
import NavContainer from "./NavContainer";
import {IconLogout} from "@tabler/icons-react";
export function Nav() {
    const {logout} = useAuthStore();
    const navigate = useNavigate();
    return (
        <nav className={classes.nav}>
            <div>
                <Link to={appRoutes.home} className={classes.nav__logo}>FitExpress</Link>
            </div>
            <NavContainer/>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <button className={classes.nav__logout} onClick={() => {
                logout();
                navigate(appRoutes.login)
            }
            }>
                <IconLogout className={classes.nav__logout__icon}/>
                Wyloguj
            </button>
            </div>
        </nav>
    )
}