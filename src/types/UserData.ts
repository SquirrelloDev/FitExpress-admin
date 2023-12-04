import {UserRole} from "../utils/userRoles";

export type UserData = {
    id: string,
    name: string,
    role: UserRole,
    token: string
}