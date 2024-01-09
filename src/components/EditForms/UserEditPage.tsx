import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneUserListQuery} from "../../queries/users/listing";
import UserEdit from "../../pages/Users/UserEdit";

export function UserEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneUserListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <UserEdit data={data!.user} token={userData.token} id={id!}/>}
		</>
	)
}