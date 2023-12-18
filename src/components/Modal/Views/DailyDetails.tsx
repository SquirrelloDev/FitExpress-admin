import classes from "../../../sass/components/detailsModalView.module.scss";
import {ModalType} from "../../../types/table/modalType";
import {IconX} from "@tabler/icons-react";
import {Dispatch, SetStateAction} from "react";
import {OrdersArr} from "../../../types/dbtypes/DailyOrder";
import useDailyOrder from "../../../hooks/useDailyOrder";
interface ViewDetailsProps {
	id: string,
	ordersArr: OrdersArr[],
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
export function DailyDetails({id, ordersArr, closeModal}:ViewDetailsProps) {
	const orderData = useDailyOrder(ordersArr, id)
	if(!orderData){
		return (
			<div>
				<div className={classes.view__title}>
					<h2>Informacje</h2>
					<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
				</div>
				<div className={classes.view__info}>
					<p>Brak..</p>
				</div>
			</div>
		)
	}
	return (
		<div>
			<div className={classes.view__title}>
				<h2>Informacje</h2>
				<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<h3>Podstawowe dane</h3>
				<h4>Wybrane posiłki</h4>
				<ul>
					{orderData!.selected_meals.map(meal => <li key={meal._id}>{meal.name}</li>)}
				</ul>
				<p>Kaloryczność ogólna: {orderData!.order_id.calories}</p>
				<h4>Dane adresowe</h4>
				<p>Ulica: {`${orderData!.order_id.address_id.street} ${orderData!.order_id.address_id.building_no}/${orderData!.order_id.address_id.apartment_no}`}</p>
				<p>Kod pocztowy, miasto i województwo: {`${orderData!.order_id.address_id.postal}, ${orderData!.order_id.address_id.city}, woj. ${orderData!.order_id.address_id.voivodeship}`}</p>
				<p>Dodatkowe informacje od klienta:</p>
				<p>{orderData!.order_id.address_id.extra_info}</p>
				<h4>Pozostałe informacje</h4>
				<p>Nazwa diety: {orderData!.diet_id.name}</p>
				<p>Identyfikator klienta: {orderData!.user_id._id}</p>
				<p>Adres email klienta: {orderData!.user_id.email}</p>
			</div>
		</div>
	)
}