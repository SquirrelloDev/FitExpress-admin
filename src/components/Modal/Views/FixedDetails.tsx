import {Dispatch, SetStateAction, useMemo} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneFixedListQuery} from "../../../queries/fixed/listing";
import calcLowerDate from "../../../utils/calcMonth";

interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function FixedDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleFixedData, isLoading, isSuccess} = useOneFixedListQuery({token, id})
	const prettyDate = useMemo(() => {
		return isSuccess ? `${calcLowerDate(new Date(singleFixedData!.day.date).getDate())}-${calcLowerDate(new Date(singleFixedData!.day.date).getMonth() + 1)}-${new Date(singleFixedData!.day.date).getFullYear()}` : ''
	}, [singleFixedData, isSuccess])
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
				<p>Identyfikator dnia: {id}</p>
				<p>Data: {prettyDate}</p>
				<h3>Posiłki</h3>
				{singleFixedData?.day.diets.map(diet => {
					return (
						<>
						<h4>Dieta: {diet.diet_id.name}</h4>
						<ul>
							<li>Śniadanie: {diet.meals.morning.name}</li>
							<li>Lunch: {diet.meals.lunch.name}</li>
							<li>Obiad: {diet.meals.dinner.name}</li>
							<li>Podwieczorek: {diet.meals.teatime.name}</li>
							<li>Kolacja: {diet.meals.supper.name}</li>
						</ul>
						</>
					)
				})}
			</div>
		</div>
	)
}
export default FixedDetails