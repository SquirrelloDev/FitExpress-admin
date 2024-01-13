import useAuthStore from "../../stores/authStore";
import useAddressesListQuery from "../../queries/addresses/listing";
import OrderCreate from "../../pages/Orders/OrderCreate";

export function OrderCreatePage() {
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading: isUserLoading} = useAddressesListQuery({token: userData.token, pageIndex: 1, pageSize: 0})
	return (
		<>
			{!isUserLoading && <OrderCreate data={data!.addresses} token={userData.token} />}
		</>
	)
}