import {IconX} from "@tabler/icons-react";
import classes from "../../../sass/components/deleteModalView.module.scss";
import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import {TailSpin} from "react-loader-spinner";

interface ViewDeleteProps {
	id: string
	isDeleting: boolean
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
	deleteMutation: () => void
}
function ViewDelete({id, closeModal, deleteMutation, isDeleting}:ViewDeleteProps) {
	const deleteFn = () => {
		deleteMutation()
	}
	return (
		<div className={classes.view}>
			<div className={classes.view__title}>
				<h1>Usunąć?</h1>
				<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<p>Zamierzasz usunąć wpis o identyfikatorze {id}. Jego dane zostaną usunięte na zawsze! Jesteś tego pewien?</p>
			</div>
				<div className={classes.view__buttons}>
					<button disabled={isDeleting} onClick={deleteFn}>{isDeleting ? <TailSpin height={20} width={20}/> : 'Usuń'}</button>
					<button onClick={() => closeModal({isOpen: false, modalType: ModalType.none})}>Anuluj</button>
				</div>
		</div>
	)
}
export default ViewDelete