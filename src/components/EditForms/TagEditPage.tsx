import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneTagListQuery} from "../../queries/tags/listing";
import TagEdit from "../../pages/Tags/TagEdit";

export function TagEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneTagListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <TagEdit data={data!.tag} token={userData.token} id={id!}/>}
		</>
	)
}