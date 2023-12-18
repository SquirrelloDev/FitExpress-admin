import {OrdersArr} from "../types/dbtypes/DailyOrder";

function useDailyOrder(ordersArr: OrdersArr[], id: string) {
    const orderData = ordersArr.find(order => order.order_id._id === id);
    return orderData
}
export default useDailyOrder