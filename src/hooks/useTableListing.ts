import {TableListingType} from "../types/table/tableListing";

type polishNamesType = {
    users: 'Użytkownicy',
    meals: 'Posiłki',
    diets: 'Diety',
    dayFixed: 'Dni fixed',
    dayFlexi: 'Dni Flexi',
    exclusions: 'Wykluczenia',
    orders: 'Zamówienia',
    addresses: 'Adresy',
    reports: 'Zgłoszenia',
    tags: 'Tagi'
    promocodes: 'Vouchery',
    deliveryPoints: 'Punkty dostaw',

    dailyOrders: 'Dzisiejsze zamówienia'
}
function useTableListing(tableListing: TableListingType):string {
    const polishNamesTable: polishNamesType = {
        users: 'Użytkownicy',
        meals: 'Posiłki',
        diets: 'Diety',
        dayFixed: 'Dni fixed',
        dayFlexi: 'Dni Flexi',
        exclusions: 'Wykluczenia',
        orders: 'Zamówienia',
        addresses: 'Adresy',
        reports: 'Zgłoszenia',
        tags: 'Tagi',
        promocodes: 'Vouchery',
        deliveryPoints: 'Punkty dostaw',
        dailyOrders: 'Dzisiejsze zamówienia'
    }
    return polishNamesTable[TableListingType[tableListing] as keyof polishNamesType]
}
export default useTableListing