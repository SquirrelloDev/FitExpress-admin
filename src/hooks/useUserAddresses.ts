import {SelectOption} from "../components/Select/types";
import {useEffect, useState} from "react";
import {Address} from "../types/dbtypes/Address";

function useUserAddresses(clientId: string, allAdresses: Address[]): SelectOption[] {
    const [selectedUserAddresses, setSelectedUserAddresses] = useState<SelectOption[]>([])
    useEffect(() => {
        const filteredAddresses = allAdresses.filter(addr => addr.user_id._id === clientId)
        const mappedAddresses: SelectOption[] = filteredAddresses.map(filteredAddr => {
            return {
                label: `${filteredAddr.street} ${filteredAddr.building_no}/${filteredAddr.apartment_no ? filteredAddr.apartment_no : ''} ${filteredAddr.postal} ${filteredAddr.city}`,
                value: filteredAddr._id
            }
        })
        setSelectedUserAddresses(mappedAddresses);
    }, [allAdresses, clientId])
    return selectedUserAddresses
}
export default useUserAddresses