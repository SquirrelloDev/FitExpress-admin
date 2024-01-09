import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import AddressEdit from "../../pages/Addresses/AddressEdit";
import {useOneAddressListQuery} from "../../queries/addresses/listing";

export function AddressEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneAddressListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <AddressEdit data={data!.address} token={userData.token} id={id!}/>}
		</>
	)
}