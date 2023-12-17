import {isServer, QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...(!isServer && { staleTime: 1000 * 60 }),
            retry: 1,
        },
    },
})
export const apiRoutes = {
    LOGIN: 'http://localhost:3001/users/login/',
    GET_USERS: 'http://localhost:3001/users',
    GET_USER: (id: string) => `http://localhost:3001/users/${id}`,
    ADD_USER: `http://localhost:3001/users`,
    EDIT_USER: (id: string) => `http://localhost:3001/users/${id}`,
    DELETE_USER: (id: string) => `http://localhost:3001/users/${id}`,
//     MEALS
    GET_MEALS: `http://localhost:3001/meals`,
    ADD_MEAL: `http://localhost:3001/meals`,
    GET_MEAL: (id: string) => `http://localhost:3001/meals/${id}`,
    EDIT_MEAL: (id: string) => `http://localhost:3001/meals/${id}`,
    DELETE_MEAL: (id: string) => `http://localhost:3001/meals/${id}`,
//     TAGS
    GET_TAGS: `http://localhost:3001/tags`,
    ADD_TAG: `http://localhost:3001/tags`,
    EDIT_TAG: (id: string) => `http://localhost:3001/tags/${id}`,
    DELETE_TAG: (id: string) => `http://localhost:3001/tags/${id}`,
//     DIETS
    GET_DIETS: `http://localhost:3001/diets`,
    ADD_DIET: `http://localhost:3001/diets`,
    GET_DIET: (id: string) => `http://localhost:3001/diets/${id}`,
    EDIT_DIET: (id: string) => `http://localhost:3001/diets/${id}`,
    DELETE_DIET: (id: string) => `http://localhost:3001/diets/${id}`,
//     FIXED
    GET_FIXEDS: `http://localhost:3001/days/fixed`,
    ADD_FIXED: `http://localhost:3001/days/fixed`,
    GET_FIXED: (date: string) => `http://localhost:3001/days/fixed/day?date=${date}`,
    GET_FIXED_ID: (id: string) => `http://localhost:3001/days/fixed/${id}`,
    EDIT_FIXED: (id: string) => `http://localhost:3001/days/fixed/${id}`,
    DELETE_FIXED: (id: string) => `http://localhost:3001/days/fixed/${id}`,
//     FLEXI
    GET_FLEXIS: `http://localhost:3001/days/flexi`,
    ADD_FLEXI: `http://localhost:3001/days/flexi`,
    GET_FLEXI: (date: string) => `http://localhost:3001/days/flexi/day?date=${date}`,
    GET_FLEXI_ID: (id: string) => `http://localhost:3001/days/flexi/${id}`,
    EDIT_FLEXI: (id: string) => `http://localhost:3001/days/flexi/${id}`,
    DELETE_FLEXI: (id: string) => `http://localhost:3001/days/flexi/${id}`,
//     EXCLUSIONS
    GET_EXCLUSIONS: `http://localhost:3001/exclusions`,
    ADD_EXCLUSION: `http://localhost:3001/exclusions`,
    EDIT_EXCLUSION: (id: string) => `http://localhost:3001/exclusions/${id}`,
    DELETE_EXCLUSION: (id: string) => `http://localhost:3001/exclusions/${id}`,
// ORDERS
    GET_ORDERS: `http://localhost:3001/orders`,
    ADD_ORDER: `http://localhost:3001/orders`,
    GET_ORDER: (id: string) => `http://localhost:3001/orders/${id}`,
    GET_ORDERS_USER: (id: string) => `http://localhost:3001/orders/user?userId=${id}`,
    GET_ORDERS_DIET: (id: string) => `http://localhost:3001/orders/diet?dietId=${id}`,
    EDIT_ORDER: (id: string) => `http://localhost:3001/orders/${id}`,
    DELETE_ORDER: (id: string) => `http://localhost:3001/orders/${id}`,
//     ADDRESSES
    GET_ADDRESSES: `http://localhost:3001/address`,
    ADD_ADDRESS: `http://localhost:3001/address`,
    GET_ADDRESS: (id: string) => `http://localhost:3001/address/${id}`,
    GET_ADDRESSES_USER: (id: string) => `http://localhost:3001/address/user/${id}`,
    EDIT_ADDRESS: (id: string) => `http://localhost:3001/address/${id}`,
    DELETE_ADDRESS: (id: string) => `http://localhost:3001/address/${id}`,
//     REPORTS
    GET_REPORTS: `http://localhost:3001/reports`,
    ADD_REPORT: `http://localhost:3001/reports`,
    GET_REPORTS_USER: (id: string) => `http://localhost:3001/reports/user?userId=${id}`,
    GET_REPORT_ID: (id: string) => `http://localhost:3001/reports/${id}`,
    EDIT_REPORT: (id: string) => `http://localhost:3001/reports/${id}`,
    EDIT_REPORT_STATUS: (id: string, status: string) => `http://localhost:3001/reports/${id}?status=${status}`,
    DELETE_REPORT: (id: string) => `http://localhost:3001/reports/${id}`,
//     PROMOCODES
    GET_PROMOCODES: `http://localhost:3001/promocode`,
    ADD_PROMOCODE: `http://localhost:3001/promocode/new`,
    GET_PROMOCODE: (name: string) => `http://localhost:3001/promocode/${name}`,
    EDIT_PROMOCODE: (id: string) => `http://localhost:3001/promocode/${id}`,
    DELETE_PROMOCODE: (id: string) => `http://localhost:3001/promocode/${id}`,
//     DELIVERY
    GET_DELIVERY: `http://localhost:3001/delivery`,
    ADD_DELIVERY: `http://localhost:3001/delivery`,
    GET_DELIVERY_ID: (id: string) => `http://localhost:3001/delivery/${id}`,
    EDIT_DELIVERY: (id: string) => `http://localhost:3001/delivery/${id}`,
    DELETE_DELIVERY: (id: string) => `http://localhost:3001/delivery/${id}`,
}