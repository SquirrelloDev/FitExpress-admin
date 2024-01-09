import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneMealListQuery} from "../../queries/meals/listing";
import MealEdit from "../../pages/Meals/MealEdit";

export function MealEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneMealListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <MealEdit data={data!.meal} token={userData.token} id={id!}/>}
		</>
	)
}