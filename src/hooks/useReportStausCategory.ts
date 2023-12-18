type StatusesPL = {
    new: 'Nowy',
    pending: 'W trakcie',
    resolved: 'Zaakceptowane',
    rejected: 'Odrzucone'
}
type CategoriesPL = {
    openedPackage: 'Otwarte opakowanie',
    missingMeal: 'Brak posiłku',
    lowQualityMeal: 'Słaba jakość',
    differentMeal: 'Inny posiłek',
    damagedPackage: 'Uszkodzone opakowanie',
    other: 'Inna'
}
function useReportStausCategory(statusName?:string, categoryName?:string): {statusPL: string, categoryPL: string} {
    const statusesPL = {
        new: 'Nowy',
        pending: 'W trakcie',
        resolved: 'Zaakceptowane',
        rejected: 'Odrzucone'
    }
    const categoriesPL = {
        openedPackage: 'Otwarte opakowanie',
        missingMeal: 'Brak posiłku',
        lowQualityMeal: 'Słaba jakość',
        differentMeal: 'Inny posiłek',
        damagedPackage: 'Uszkodzone opakowanie',
        other: 'Inna'
    }
    const statusPL = statusesPL[statusName as keyof StatusesPL];
    const categoryPL = categoriesPL[categoryName as keyof CategoriesPL];
    return {statusPL, categoryPL}
}
export default useReportStausCategory