import {TableListingType} from "../types/table/tableListing";
import {appRoutes} from "../utils/routes";

function useListingRoute(listingRoute: TableListingType): string {
    switch (listingRoute) {
        case TableListingType.exclusions:
            return appRoutes.exclusions
        case TableListingType.diets:
            return appRoutes.diets
        case TableListingType.deliveryPoints:
            return appRoutes.delivery
        case TableListingType.dayFlexi:
            return appRoutes.flexiDays
        case TableListingType.dayFixed:
            return appRoutes.fixedDays
        case TableListingType.addresses:
            return appRoutes.addresses
        case TableListingType.users:
            return appRoutes.users
        case TableListingType.meals:
            return appRoutes.meals
        case TableListingType.orders:
            return appRoutes.meals
        case TableListingType.promocodes:
            return appRoutes.promocodes
        case TableListingType.reports:
            return appRoutes.reports
        case TableListingType.tags:
            return appRoutes.tags
        default:
            return appRoutes.home
    }
}
export default useListingRoute