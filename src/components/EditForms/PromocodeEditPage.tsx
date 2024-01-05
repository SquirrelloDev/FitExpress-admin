import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneUserListQuery} from "../../queries/users/listing";
import UserEdit from "../../pages/Users/UserEdit";
import {useOneTagListQuery} from "../../queries/tags/listing";
import TagEdit from "../../pages/Tags/TagEdit";
import {useOneExclusionListQuery} from "../../queries/exclusions/listing";
import ExclusionEdit from "../../pages/Exclusions/ExclusionEdit";
import {useOnePromoListQuery} from "../../queries/promocodes/listing";
import PromoEdit from "../../pages/Promocodes/PromoEdit";

export function PromocodeEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOnePromoListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <PromoEdit data={data!.promocode} token={userData.token} id={id!}/>}
		</>
	)
}