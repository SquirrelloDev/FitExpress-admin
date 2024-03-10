import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneOrderListQuery} from "../../../queries/orders/listing";
import calcLowerDate from "../../../utils/calcMonth";

interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function OrderDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleOrderData, isLoading} = useOneOrderListQuery({token, id})
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
	const fromDate = new Date(singleOrderData!.order.sub_date.from);
	const toDate = new Date(singleOrderData!.order.sub_date.to);
	return (
		<div>
			<div className={classes.view__title}>
				<h2>Informacje</h2>
				<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<p>Identyfikator zamówienia: {id}</p>
				<p>Nazwa planu dietetycznego: {singleOrderData!.order.name}</p>
				<p>Nazwa diety: {singleOrderData!.order.diet_id.name}</p>
				<p>Identyfikator klienta: {singleOrderData!.order.user_id._id}</p>
				<p>Adres email klienta: {singleOrderData!.order.user_id.email}</p>
				<p>Okres trwania zamówienia: {`${calcLowerDate(fromDate.getDate())}-${calcLowerDate(fromDate.getMonth() + 1)}-${fromDate.getFullYear()} - ${calcLowerDate(toDate.getDate())}-${calcLowerDate(toDate.getMonth() + 1)}-${toDate.getFullYear()}`}</p>
				<p>Cena zamówienia: {(singleOrderData!.order.price).toFixed(2)} zł</p>
				<p>Czy dieta jest wysyłana w weekend?: {singleOrderData!.order.with_weekends ? 'Tak' : 'Nie'}</p>
			</div>
		</div>
	)
}
export default OrderDetails