import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneReportListQuery} from "../../../queries/reports/listing";
import useReportStausCategory from "../../../hooks/useReportStausCategory";

interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function ReportDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleReportData, isLoading} = useOneReportListQuery({token, id})
	const {statusPL, categoryPL} = useReportStausCategory(singleReportData!.report.report_status, singleReportData!.report.category)
	if(isLoading) return (
		<div>
			<div className={classes.view__title}>
				<h1>Informacje</h1>
				<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<p>Proszę czekać...</p>
			</div>
		</div>
	)
	const deliveryDate = new Date(singleReportData!.report.delivery_date)
	const createdAt = new Date(singleReportData!.report.created_at)
	return (
		<div>
			<div className={classes.view__title}>
				<h2>Informacje</h2>
				<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<h3>Podstawowe dane</h3>
				<p>Identyfikator zgłoszenia: {id}</p>
				<p>Identyfikator zamówienia: {singleReportData!.report.order_id}</p>
				<p>Adres email klienta: {singleReportData!.report.user_id.email}</p>
				<p>Status zgłoszenia: {statusPL}</p>
				<p>Kategoria: {categoryPL}</p>
				<p>Data dostarczenia opakowania: {`${deliveryDate.getDate()}-${deliveryDate.getMonth()}-${deliveryDate.getFullYear()} ${deliveryDate.getHours()}:${deliveryDate.getMinutes()}`}</p>
				<p>Data utworzenia zgłoszenia: {`${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`}</p>
				<p>Treść zgłoszenia</p>
				<p>{singleReportData!.report.message}</p>
			</div>
		</div>
	)
}
export default ReportDetails