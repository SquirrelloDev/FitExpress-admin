import {UserData} from "../types/UserData";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {UserRole} from "../utils/userRoles";

interface AuthStore {
    userData: UserData
    setUserData: (userData: UserData) => void
    clearUserData: () => void
    logout: () => void
}
const getCleanUserData = (): UserData => {
  return {
      id: '',
      name: '',
      role: UserRole.loggedOut,
      token: ''
  }
}
const useAuthStore = create(
    persist<AuthStore>(
        (set, get) => ({
            userData: getCleanUserData(),
            setUserData: (userData) =>{
                set({
                    userData:{
                        id: userData.id,
                        name: userData.name,
                        role: userData.role,
                        token: userData.token
                    }
                })
            },
            clearUserData: () =>{
                set({userData: getCleanUserData() })
            },
            logout: () => {
                get().clearUserData()
            }
        }),
        {name: 'fit:auth'}
    )
)
export default useAuthStore;