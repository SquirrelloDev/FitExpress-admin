import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneAddressListQuery} from "../../../queries/addresses/listing";

interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function AddressDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleAddressData, isLoading} = useOneAddressListQuery({token, id})
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
	return (
		<div>
			<div className={classes.view__title}>
				<h2>Informacje</h2>
				<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<h3>Podstawowe dane</h3>
				<p>Identyfikator adresu: {id}</p>
				<p>Ulica: {singleAddressData!.address.street} {singleAddressData!.address.building_no}</p>
				{singleAddressData?.address.apartment_no && <p>Numer mieszkania: {singleAddressData.address.apartment_no}</p>}
				<p>Kod pocztowy i miasto: {singleAddressData!.address.postal} {singleAddressData!.address.city}</p>
				<p>Województwo: {singleAddressData?.address.voivodeship}</p>
				<p>Czy jest to adres weekendowy?: {singleAddressData?.address.is_weekend ? 'Tak':'Nie'}</p>
				<h3>Dane dodatkowe</h3>
				<p>{singleAddressData?.address.extra_info}</p>
				<h3>Powiązane punkty FitExpress z tym adresem</h3>
				{singleAddressData?.address.linked_points.length === 0 && <p style={{color:'red'}}>{'Brak powiązanych punktów'}</p>}
				{singleAddressData!.address.linked_points.length > 0 && (
					<ul>
						{singleAddressData?.address.linked_points.map(point => <li>{point.name}</li>)}
					</ul>
				)}
			</div>
		</div>
	)
}
export default AddressDetails