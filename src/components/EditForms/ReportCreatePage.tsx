import useAuthStore from "../../stores/authStore";
import useOrdersListQuery from "../../queries/orders/listing";
import ReportCreate from "../../pages/Reports/ReportCreate";

export function ReportCreatePage() {
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading: isUserLoading} = useOrdersListQuery({token: userData.token})
	return (
		<>
			{!isUserLoading && <ReportCreate data={data!.orders} token={userData.token} />}
		</>
	)
}