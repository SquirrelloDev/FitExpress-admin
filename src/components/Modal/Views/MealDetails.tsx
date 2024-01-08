import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneMealListQuery} from "../../../queries/meals/listing";
import {Tag} from "../../../types/dbtypes/Tags";

interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function MealDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleMealData, isLoading} = useOneMealListQuery({token, id})
	const nutritionVals = singleMealData?.meal.nutrition_values
	const tags = singleMealData?.meal.tags_id as Tag[]
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
				<h2>Dane wpisu {id}.</h2>
				<ul>
					<li>Nazwa: {singleMealData?.meal.name}</li>
					<li>Opis:</li>
					<li><p>{singleMealData?.meal.description}</p></li>
				</ul>
					<h3>Wartości odżywcze:</h3>
				<ul>
					<li>Kalorie: {nutritionVals?.calories} kcal</li>
					<li>Węglowodany: {nutritionVals?.carbs} g</li>
					<li>Tłuszcze: {nutritionVals?.fats} g</li>
					<li>Białko: {nutritionVals?.proteins} g</li>
					<li>Sól: {nutritionVals?.salt} g</li>
				</ul>
				<h3>Wykluczenia</h3>
				<ul>
					{singleMealData!.meal.exclusions.length < 1 && <li>Brak wykluczeń</li>}
					{singleMealData!.meal.exclusions.length >=1 && singleMealData?.meal.exclusions.map(excl => <li key={excl._id}>{excl.name}</li>)}
				</ul>
				<h3>Tagi</h3>
				<ul>
					{tags.length < 1 && <li>Brak tagów</li>}
					{tags.length >= 1 && tags.map(tag => <li key={tag._id}>{tag.name}</li>)}
				</ul>
			</div>
		</div>
	)
}
export default MealDetails