import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneUserListQuery} from "../../queries/users/listing";
import UserEdit from "../../pages/Users/UserEdit";
import {useOneTagListQuery} from "../../queries/tags/listing";
import TagEdit from "../../pages/Tags/TagEdit";
import {useOneExclusionListQuery} from "../../queries/exclusions/listing";
import ExclusionEdit from "../../pages/Exclusions/ExclusionEdit";
import {useOneDeliveryListQuery} from "../../queries/delivery/listing";
import DeliveryEdit from "../../pages/DeliveryPoints/DeliveryEdit";
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