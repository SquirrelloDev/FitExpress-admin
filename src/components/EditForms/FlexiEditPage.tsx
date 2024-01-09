import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
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