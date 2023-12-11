import {UserFullData} from "./UserData";

export type Report = {
    _id: string,
    category: 'openedPackage' | 'missingMeal' | 'lowQualityMeal' | 'differentMeal' | 'damagedPackage' | 'missingPackage' | 'other',
    order_id: string,
    user_id: UserFullData,
    report_status: 'new' | 'pending' | 'resolved' | 'rejected',
    message: string,
    delivery_date: Date,
    created_at: Date
}