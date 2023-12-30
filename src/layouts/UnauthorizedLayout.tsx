import {Outlet} from "react-router-dom";
import classes from "../sass/layouts/unauth.module.scss";
import {Toaster} from "react-hot-toast";
function UnauthorizedLayout() {
	return (
		<main className={classes.main}>
			<Toaster/>
			<Outlet />
		</main>
	)
}
export default UnauthorizedLayout