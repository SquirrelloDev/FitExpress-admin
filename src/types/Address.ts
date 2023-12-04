import {UserData} from "./UserData";

export type Address = {
    _id: string,
    street: string,
    city: string,
    postal: string,
    buildingNo: number,
    apartmentNo?: number,
    voivodeship: 'Zachodniopomorskie' | 'Pomorskie' | 'Warmińsko-Mazurskie' | 'Kujawsko-Pomorskie' | 'Podlaskie' | 'Lubuskie' | 'Wielkopolskie' | 'Łódzkie' | 'Mazowieckie' | 'Świętokrzyskie' | 'Lubelskie' | 'Dolnośląskie' | 'Opolskie' | 'Śląskie' | 'Małopolskie' | 'Podkarpackie',
    isWeekend: boolean,
    isDefault: boolean,
    userId: UserData
}