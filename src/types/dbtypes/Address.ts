import {UserFullData} from "./UserData";

export type Address = {
    _id: string,
    street: string,
    city: string,
    postal: string,
    building_no: number,
    apartment_no?: number,
    voivodeship: 'Zachodniopomorskie' | 'Pomorskie' | 'Warmińsko-Mazurskie' | 'Kujawsko-Pomorskie' | 'Podlaskie' | 'Lubuskie' | 'Wielkopolskie' | 'Łódzkie' | 'Mazowieckie' | 'Świętokrzyskie' | 'Lubelskie' | 'Dolnośląskie' | 'Opolskie' | 'Śląskie' | 'Małopolskie' | 'Podkarpackie',
    is_weekend: boolean,
    isDefault: boolean,
    extra_info: string,
    user_id: UserFullData
}