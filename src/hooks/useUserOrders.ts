import {SelectOption} from "../components/Select/types";
import {useEffect, useState} from "react";
import {Order} from "../types/dbtypes/Order";

function useUserOrders(clientId: string, allOrders: Order[]): SelectOption[] {
    const [selectedUserOrders, setSelectedUserOrders] = useState<SelectOption[]>([])
    useEffect(() => {
        const filteredOrders = allOrders.filter(order => order.user_id._id === clientId)
        const mappedAddresses: SelectOption[] = filteredOrders.map(filteredOrder => {
            return {
                label: filteredOrder.name,
                value: filteredOrder._id
            }
        })
        setSelectedUserOrders(mappedAddresses);
    }, [allOrders, clientId])
    return selectedUserOrders
}
export default useUserOrders