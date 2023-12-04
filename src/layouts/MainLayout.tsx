import {Outlet, useNavigate} from "react-router-dom";
import {Nav} from "../components/Nav/Nav";
import {UserRole} from "../utils/userRoles";
import {useEffect} from "react";
import useUserRole from "../hooks/useUserRole";
import {appRoutes} from "../utils/routes";
interface MainLayoutProps {
	minPermLevel: UserRole
}
export function MainLayout({minPermLevel}: MainLayoutProps) {
	const navigate = useNavigate()
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
		<div>
			<Nav />
			<Outlet />
		</div>
	)
}
export default MainLayout