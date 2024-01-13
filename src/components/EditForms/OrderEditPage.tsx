import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import useAddressesListQuery from "../../queries/addresses/listing";
import {useOneOrderListQuery} from "../../queries/orders/listing";
import OrderEdit from "../../pages/Orders/OrderEdit";

export function OrderEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams()
	const {data, isLoading: isUserLoading} = useAddressesListQuery({token: userData.token, pageIndex: 1, pageSize: 0})
	const {data: orderData, isLoading: isOrdersLoading} = useOneOrderListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && !isOrdersLoading && <OrderEdit orderData={orderData!.order} addressData={data!.addresses} token={userData.token} id={id!} />}
		</>
	)
}