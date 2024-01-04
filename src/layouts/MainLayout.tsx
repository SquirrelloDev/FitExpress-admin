import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Nav from "../components/Nav/Nav";
import {UserRole} from "../utils/userRoles";
import {useEffect} from "react";
import useUserRole from "../hooks/useUserRole";
import {appRoutes} from "../utils/routes";
import classes from "../sass/layouts/main.module.scss";
import {Toaster} from "react-hot-toast";
import clsx from "clsx";
interface MainLayoutProps {
	minPermLevel: UserRole
}
function MainLayout({minPermLevel}: MainLayoutProps) {
	const navigate = useNavigate()
	const location = useLocation();
	const {isAuthorized, isLoggedIn} = useUserRole(minPermLevel)
	useEffect(() => {
		if(!isLoggedIn){
			navigate(appRoutes.login);
		}
		else if(isLoggedIn && !isAuthorized){
			navigate(appRoutes.notAuthorized)
		}
	}, [isAuthorized, isLoggedIn, navigate]);
	return (
		<div className={classes.app}>
			<Toaster position={"top-right"}/>
			<Nav />
			<main className={clsx(classes.app__main, (location.pathname.includes('create') || location.pathname.includes('edit')) && classes['app__main--form'])}>
			<Outlet />
			</main>
		</div>
	)
}
export default MainLayout