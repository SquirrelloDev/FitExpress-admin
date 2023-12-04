import {UserRole} from "../utils/userRoles";
import useAuthStore from "../stores/authStore";

function useUserRole(minPermission: UserRole) {
    const userData = useAuthStore((state) => state.userData)
    console.log(UserRole[userData.role]);
    const isAuthorized = userData.role >= minPermission
    const isLoggedIn = userData.role > UserRole.loggedOut
    return { isAuthorized, isLoggedIn }
}
export default useUserRole