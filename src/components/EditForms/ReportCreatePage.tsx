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