import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import classes from "../../../sass/components/detailsModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import {useOneDietListQuery} from "../../../queries/diets/listing";

type KcalPrices = { kcal1200: number; kcal1500: number; kcal1800: number; kcal2000: number; kcal2200: number; kcal2500: number; }
interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function DietDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleDietData, isLoading} = useOneDietListQuery({token, id})
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
				<p>Identyfikator diety: {id}</p>
				<p>Nazwa diety: {singleDietData!.diet.name}</p>
				<p>Rodzaj diety: {singleDietData!.diet.diet_type}</p>
				<p>Krótki opis: {singleDietData!.diet.short_desc}</p>
				<p>Długi opis:</p>
				<p>{singleDietData!.diet.long_desc}</p>
				<p>Wykluczenia:</p>
				<ul>
					{singleDietData!.diet.exclusions.length < 1 && <li>Brak wykluczeń</li>}
					{singleDietData!.diet.exclusions.map(excl => <li key={excl._id}>{excl.name}</li>)}
				</ul>
				<p>Tagi:</p>
				<ul>
					{singleDietData!.diet.tags_id.length < 1 && <li>Brak tagów</li>}
					{singleDietData!.diet.tags_id.map(tag => <li key={tag._id}>{tag.name}</li>)}
				</ul>
				<p>Wyświetlane informacje o diecie w aplikacji:</p>
				<ul>
					{singleDietData!.diet.basic_info.map((info, idx) => <li key={idx}>{info}</li>)}
				</ul>
				<p>Cennik:</p>
				<ul>
					{Object.keys(singleDietData!.diet.prices).map(key => {
						return <li key={key}><span>{key}</span>: <span>{singleDietData!.diet.prices[key as keyof KcalPrices]} zł</span></li>
					})}
				</ul>
			</div>
		</div>
	)
}
export default DietDetails