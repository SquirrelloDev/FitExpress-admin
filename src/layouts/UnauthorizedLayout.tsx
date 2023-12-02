import {Outlet} from "react-router-dom";

export function UnauthorizedLayout() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
export default UnauthorizedLayout