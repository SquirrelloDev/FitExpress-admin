import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import useOrdersListQuery from "../../queries/orders/listing";
import ReportEdit from "../../pages/Reports/ReportEdit";
import {useOneReportListQuery} from "../../queries/reports/listing";

export function ReportEditPage() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams()
	const {data, isLoading: isUserLoading} = useOrdersListQuery({token: userData.token})
	const {data: reportData, isLoading: isReportLoading} = useOneReportListQuery({token: userData.token as string, id: id as string})
	return (
		<>
			{!isUserLoading && !isReportLoading && <ReportEdit reportData={reportData!.report} orderData={data!.orders} token={userData.token} id={id!} />}
		</>
	)
}