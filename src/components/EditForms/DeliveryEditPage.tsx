import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneDeliveryListQuery} from "../../queries/delivery/listing";
import DeliveryEdit from "../../pages/DeliveryPoints/DeliveryEdit";

export function DeliveryEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneDeliveryListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <DeliveryEdit data={data!.delivery} token={userData.token} id={id!}/>}
		</>
	)
}