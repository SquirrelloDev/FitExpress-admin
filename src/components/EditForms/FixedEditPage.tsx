import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneFixedListQuery} from "../../queries/fixed/listing";
import FixedEdit from "../../pages/Fixed/FixedEdit";

export function FixedEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneFixedListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <FixedEdit data={data!.day} token={userData.token} id={id!}/>}
		</>
	)
}