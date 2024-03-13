import {isServer, QueryClient} from "@tanstack/react-query";
import axios, {AxiosInstance} from "axios";
import authStore from "../stores/authStore";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...(!isServer && { staleTime: 1000 * 60 }),
            retry: 1,
        },
    },
})
export class FitExpressClient {
    private static clientInstance: FitExpressClient
    private axiosInstance: AxiosInstance
    private constructor() {
        this.axiosInstance = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    public static getInstance(){
        //if instance exists, return the current instance
        if (this.clientInstance) {
            return this.clientInstance.axiosInstance
        }
        this.clientInstance = new FitExpressClient()
        this.clientInstance.axiosInstance.interceptors.response.use((response) =>{
            return response
        }, (error) => {
            if(error.response.status === 401 || error.response.data.message === 'jwt expired'){
                authStore.getState().logout()
            }
            return error
        })
        return this.clientInstance.axiosInstance;
    }
}
export const apiRoutes = {
    LOGIN: `${import.meta.env.VITE_SERVER}/users/login/`,
    GET_USERS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/users?page=${page}&pageSize=${pageSize}`,
    GET_USER: (id: string) => `${import.meta.env.VITE_SERVER}/users/${id}`,
    ADD_USER: `${import.meta.env.VITE_SERVER}/users`,
    EDIT_USER: (id: string) => `${import.meta.env.VITE_SERVER}/users/${id}`,
    DELETE_USER: (id: string) => `${import.meta.env.VITE_SERVER}/users/${id}`,
//     MEALS
    GET_MEALS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/meals?page=${page}&pageSize=${pageSize}`,
    ADD_MEAL: `${import.meta.env.VITE_SERVER}/meals`,
    GET_MEAL: (id: string) => `${import.meta.env.VITE_SERVER}/meals/${id}`,
    EDIT_MEAL: (id: string) => `${import.meta.env.VITE_SERVER}/meals/${id}`,
    DELETE_MEAL: (id: string) => `${import.meta.env.VITE_SERVER}/meals/${id}`,
//     TAGS
    GET_TAGS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/tags?page=${page}&pageSize=${pageSize}`,
    GET_TAG: (id: string) => `${import.meta.env.VITE_SERVER}/tags/${id}`,
    ADD_TAG: `${import.meta.env.VITE_SERVER}/tags`,
    EDIT_TAG: (id: string) => `${import.meta.env.VITE_SERVER}/tags/${id}`,
    DELETE_TAG: (id: string) => `${import.meta.env.VITE_SERVER}/tags/${id}`,
//     DIETS
    GET_DIETS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/diets?page=${page}&pageSize=${pageSize}&dietType=Fixed`,
    ADD_DIET: `${import.meta.env.VITE_SERVER}/diets`,
    GET_DIET: (id: string) => `${import.meta.env.VITE_SERVER}/diets/${id}`,
    EDIT_DIET: (id: string) => `${import.meta.env.VITE_SERVER}/diets/${id}`,
    DELETE_DIET: (id: string) => `${import.meta.env.VITE_SERVER}/diets/${id}`,
//     FIXED
    GET_FIXEDS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/days/fixed?page=${page}&pageSize=${pageSize}`,
    ADD_FIXED: `${import.meta.env.VITE_SERVER}/days/fixed`,
    GET_FIXED: (date: string) => `${import.meta.env.VITE_SERVER}/days/fixed/day?date=${date}`,
    GET_FIXED_ID: (id: string) => `${import.meta.env.VITE_SERVER}/days/fixed/${id}`,
    EDIT_FIXED: (id: string) => `${import.meta.env.VITE_SERVER}/days/fixed/${id}`,
    DELETE_FIXED: (id: string) => `${import.meta.env.VITE_SERVER}/days/fixed/${id}`,
//     FLEXI
    GET_FLEXIS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/days/flexi?page=${page}&pageSize=${pageSize}`,
    ADD_FLEXI: `${import.meta.env.VITE_SERVER}/days/flexi`,
    GET_FLEXI: (date: string) => `${import.meta.env.VITE_SERVER}/days/flexi/day?date=${date}`,
    GET_FLEXI_ID: (id: string) => `${import.meta.env.VITE_SERVER}/days/flexi/${id}`,
    EDIT_FLEXI: (id: string) => `${import.meta.env.VITE_SERVER}/days/flexi/${id}`,
    DELETE_FLEXI: (id: string) => `${import.meta.env.VITE_SERVER}/days/flexi/${id}`,
//     EXCLUSIONS
    GET_EXCLUSIONS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/exclusions?page=${page}&pageSize=${pageSize}`,
    GET_EXCLUSION: (id: string) => `${import.meta.env.VITE_SERVER}/exclusions/${id}`,
    ADD_EXCLUSION: `${import.meta.env.VITE_SERVER}/exclusions`,
    EDIT_EXCLUSION: (id: string) => `${import.meta.env.VITE_SERVER}/exclusions/${id}`,
    DELETE_EXCLUSION: (id: string) => `${import.meta.env.VITE_SERVER}/exclusions/${id}`,
// ORDERS
    GET_ORDERS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/orders?page=${page}&pageSize=${pageSize}`,
    ADD_ORDER: `${import.meta.env.VITE_SERVER}/orders`,
    GET_ORDER: (id: string) => `${import.meta.env.VITE_SERVER}/orders/${id}`,
    GET_ORDERS_USER: (id: string) => `${import.meta.env.VITE_SERVER}/orders/user?userId=${id}`,
    GET_ORDERS_DIET: (id: string) => `${import.meta.env.VITE_SERVER}/orders/diet?dietId=${id}`,
    EDIT_ORDER: (id: string) => `${import.meta.env.VITE_SERVER}/orders/${id}`,
    DELETE_ORDER: (id: string) => `${import.meta.env.VITE_SERVER}/orders/${id}`,
//     ADDRESSES
    GET_ADDRESSES: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/address?page=${page}&pageSize=${pageSize}`,
    ADD_ADDRESS: `${import.meta.env.VITE_SERVER}/address`,
    GET_ADDRESS: (id: string) => `${import.meta.env.VITE_SERVER}/address/${id}`,
    GET_ADDRESSES_USER: (id: string) => `${import.meta.env.VITE_SERVER}/address/user/${id}`,
    EDIT_ADDRESS: (id: string) => `${import.meta.env.VITE_SERVER}/address/${id}`,
    DELETE_ADDRESS: (id: string) => `${import.meta.env.VITE_SERVER}/address/${id}`,
//     REPORTS
    GET_REPORTS: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/reports?page=${page}&pageSize=${pageSize}`,
    ADD_REPORT: `${import.meta.env.VITE_SERVER}/reports`,
    GET_REPORTS_USER: (id: string) => `${import.meta.env.VITE_SERVER}/reports/user?userId=${id}`,
    GET_REPORT_ID: (id: string) => `${import.meta.env.VITE_SERVER}/reports/${id}`,
    EDIT_REPORT: (id: string) => `${import.meta.env.VITE_SERVER}/reports/${id}`,
    EDIT_REPORT_STATUS: (id: string, status: string) => `${import.meta.env.VITE_SERVER}/reports/${id}?status=${status}`,
    DELETE_REPORT: (id: string) => `${import.meta.env.VITE_SERVER}/reports/${id}`,
//     PROMOCODES
    GET_PROMOCODES: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/promocode?page=${page}&pageSize=${pageSize}`,
    ADD_PROMOCODE: `${import.meta.env.VITE_SERVER}/promocode/new`,
    GET_PROMOCODE_ID: (id: string) => `${import.meta.env.VITE_SERVER}/promocode/${id}`,
    GET_PROMOCODE_NAME: (name: string) => `${import.meta.env.VITE_SERVER}/promocode/by-name/${name}`,
    EDIT_PROMOCODE: (id: string) => `${import.meta.env.VITE_SERVER}/promocode/${id}`,
    DELETE_PROMOCODE: (id: string) => `${import.meta.env.VITE_SERVER}/promocode/${id}`,
//     DELIVERY
    GET_DELIVERY: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/delivery?page=${page}&pageSize=${pageSize}`,
    ADD_DELIVERY: `${import.meta.env.VITE_SERVER}/delivery`,
    GET_DELIVERY_ID: (id: string) => `${import.meta.env.VITE_SERVER}/delivery/${id}`,
    EDIT_DELIVERY: (id: string) => `${import.meta.env.VITE_SERVER}/delivery/${id}`,
    DELETE_DELIVERY: (id: string) => `${import.meta.env.VITE_SERVER}/delivery/${id}`,
//     DAILY ORDERS
    GET_DAILY: (page: string, pageSize: string) => `${import.meta.env.VITE_SERVER}/daily?page=${page}&pageSize=${pageSize}`,
    GET_DAILY_DATE: (date: string) => `${import.meta.env.VITE_SERVER}/daily/date?date=${date}`,
    ADD_DAILY: `${import.meta.env.VITE_SERVER}/daily`
}