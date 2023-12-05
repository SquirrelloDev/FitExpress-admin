import NavItem from "./NavItem";
import {NavButtons} from "../../utils/navButtons";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/nav.module.scss";
export function NavContainer() {
	const userData = useAuthStore((state) => state.userData);
	const allowedLinks = NavButtons.filter(navButton => {
		if(!navButton.allowed){
			return true;
		}
		return navButton.allowed.includes(userData.role)
	})
	return (
		<div className={classes.nav__container}>
			{allowedLinks.map(item => <NavItem key={item.label} label={item.label} url={item.path} Icon={item.icon} children={item.children}/>)}
		</div>
	)
}
export default NavContainer