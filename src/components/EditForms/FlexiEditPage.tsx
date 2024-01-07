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
import {useOneFixedListQuery} from "../../queries/fixed/listing";
import FixedEdit from "../../pages/Fixed/FixedEdit";
import {useOneFlexiListQuery} from "../../queries/flexi/listing";
import FlexiEdit from "../../pages/Flexi/FlexiEdit";

export function FlexiEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneFlexiListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <FlexiEdit data={data!.day} token={userData.token} id={id!}/>}
		</>
	)
}