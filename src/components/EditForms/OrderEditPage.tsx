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
import {useOneDietListQuery} from "../../queries/diets/listing";
import DietEdit from "../../pages/Diets/DietEdit";
import useAddressesListQuery from "../../queries/addresses/listing";
import OrderCreate from "../../pages/Orders/OrderCreate";
import {useOneOrderListQuery} from "../../queries/orders/listing";
import OrderEdit from "../../pages/Orders/OrderEdit";

export function OrderEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams()
	const {data, isLoading: isUserLoading} = useAddressesListQuery({token: userData.token})
	const {data: orderData, isLoading: isOrdersLoading} = useOneOrderListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && !isOrdersLoading && <OrderEdit orderData={orderData!.order} addressData={data!.addresses} token={userData.token} id={id!} />}
		</>
	)
}