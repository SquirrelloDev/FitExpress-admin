import {Order} from "./Order";
import {UserData} from "./UserData";

export type Report = {
    _id: string,
    category: 'openedPackage' | 'missingMeal' | 'lowQualityMeal' | 'differentMeal' | 'damagedPackage' | 'missingPackage' | 'other',
    orderId: Order,
    userId: UserData,
    reportStatus: 'new' | 'pending' | 'resolved' | 'rejected',
    message: string,
    deliveryDate: Date,
    createdAt: Date
}