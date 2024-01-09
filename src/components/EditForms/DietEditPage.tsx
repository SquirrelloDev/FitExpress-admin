import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import {useOneDietListQuery} from "../../queries/diets/listing";
import DietEdit from "../../pages/Diets/DietEdit";

export function DietEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	const {data, isLoading: isUserLoading} = useOneDietListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && <DietEdit data={data!.diet} token={userData.token} id={id!}/>}
		</>
	)
}