import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneExclusionListQuery} from "../../queries/exclusions/listing";
import ExclusionEdit from "../../pages/Exclusions/ExclusionEdit";

export function ExclusionEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneExclusionListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <ExclusionEdit data={data!.exclusion} token={userData.token} id={id!}/>}
		</>
	)
}