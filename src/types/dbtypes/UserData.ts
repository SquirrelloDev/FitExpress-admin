import {UserRole} from "../../utils/userRoles";
import {Address} from "./Address";
import {Promocode} from "./Promocode";
import {HealthData} from "./HealthData";

export type UserData = {
    id: string,
    name: string,
    role: UserRole,
    token: string
}
export type UserFullData = {
    _id: string,
    name: string,

    email: string,
    role: UserRole,
    resetToken: string,
    birth_date: Date,
    addresses: Address[],
    redeemedCodes: Promocode[],
    healthData: HealthData
}