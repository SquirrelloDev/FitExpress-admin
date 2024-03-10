import {Dispatch, SetStateAction, useMemo} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneFlexiListQuery} from "../../../queries/flexi/listing";
import calcLowerDate from "../../../utils/calcMonth";

interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function FlexiDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleFlexiData, isLoading, isSuccess} = useOneFlexiListQuery({token, id})
	const prettyDate = useMemo(() => {
		return isSuccess ? `${calcLowerDate(new Date(singleFlexiData!.day.date).getDate())}-${calcLowerDate(new Date(singleFlexiData!.day.date).getMonth())}-${new Date(singleFlexiData!.day.date).getFullYear()}` : ''
	}, [singleFlexiData, isSuccess])
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
				<h4>Śniadanie:</h4>
				<ul>
				{singleFlexiData!.day.morning_meals.map(meal => <li>{meal.name}</li>)}
				</ul>
				<h4>Lunch:</h4>
				<ul>
					{singleFlexiData!.day.lunch_meals.map(meal => <li>{meal.name}</li>)}
				</ul>
				<h4>Obiad:</h4>
				<ul>
					{singleFlexiData!.day.dinner_meals.map(meal => <li>{meal.name}</li>)}
				</ul>
				<h4>Podwieczorek:</h4>
				<ul>
					{singleFlexiData!.day.teatime_meals.map(meal => <li>{meal.name}</li>)}
				</ul>
				<h4>Kolacja:</h4>
				<ul>
					{singleFlexiData!.day.supper_meals.map(meal => <li>{meal.name}</li>)}
				</ul>
			</div>
		</div>
	)
}
export default FlexiDetails