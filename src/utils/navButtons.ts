import {
    IconBan,
    IconDiscount2,
    IconMapPin,
    IconNotes,
    IconPlant2,
    IconReport,
    IconSalad,
    IconTag,
    IconUsers,
    TablerIconsProps
} from '@tabler/icons-react'
import {UserRole} from "./userRoles";
import {appRoutes} from "./routes";

export type NavButton = {
    label: string,
    path?: string,
    allowed: number[],
    icon?: (props: TablerIconsProps) => JSX.Element
    children?: NavButton[]
}
export const NavButtons: NavButton[] = [
    {label: 'Użytkownicy', icon: IconUsers, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.users},
    {label: 'Posiłki', icon: IconSalad, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.meals},
    {label: 'Tagi posiłków', icon: IconTag, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.tags},
    {
        label: 'Diety', icon: IconPlant2, allowed: [UserRole.dietetician, UserRole.admin], children: [
            {label: 'Lista diet', path: appRoutes.diets, allowed: [UserRole.dietetician, UserRole.admin]},
            {label: 'Dni Fixed', path: appRoutes.fixedDays, allowed: [UserRole.dietetician, UserRole.admin]},
            {label: 'Dni Flexi', path: appRoutes.flexiDays, allowed: [UserRole.dietetician, UserRole.admin]},
        ]
    },
    {label: 'Wykluczenia', icon: IconBan, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.exclusions},
    {label: 'Zamówienia', icon: IconNotes, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.orders},
    {label: 'Adresy', icon: IconMapPin, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.addresses},
    {label: 'Zgłoszenia', icon: IconReport, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.reports},
    {label: 'Vouchery', icon: IconDiscount2, allowed: [UserRole.dietetician, UserRole.admin], path: appRoutes.promocodes},
    {label: 'Punkty dostaw', icon: IconReport, allowed: [UserRole.admin], path: appRoutes.delivery},

]