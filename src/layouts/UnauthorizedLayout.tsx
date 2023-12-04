import {Outlet} from "react-router-dom";
import classes from "../sass/layouts/unauth.module.scss";
export function UnauthorizedLayout() {
	return (
		<main className={classes.main}>
			<Outlet />
		</main>
	)
}
export default UnauthorizedLayout