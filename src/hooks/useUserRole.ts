import {UserRole} from "../utils/userRoles";
import useAuthStore from "../stores/authStore";

function useUserRole(minPermission: UserRole) {
    const userData = useAuthStore((state) => state.userData)
    const isAuthorized = UserRole[userData.role] >= minPermission
    const isLoggedIn = UserRole[userData.role] > UserRole.loggedOut
    return { isAuthorized, isLoggedIn }
}
export default useUserRole