import {IconX} from "@tabler/icons-react";
import classes from "../../../sass/components/deleteModalView.module.scss";
import {Dispatch, SetStateAction} from "react";

interface ViewDeleteProps {
	id: string
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; deleteId: string; }>>
	deleteMutation: () => void
}
function UserDelete({id, closeModal, deleteMutation}:ViewDeleteProps) {
	const deleteFn = () => {
		deleteMutation()
	}
	return (
		<div className={classes.view}>
			<div className={classes.view__title}>
				<h2>Usunąć?</h2>
				<button onClick={() => closeModal({isOpen: false, deleteId: ""})}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<p>Zamierzasz usunąć wpis o identyfikatorze {id}. Jego dane zostaną usunięte na zawsze! Jesteś tego pewien?</p>
			</div>
				<div className={classes.view__buttons}>
					<button onClick={deleteFn}>Usuń</button>
					<button onClick={() => closeModal({isOpen: false, deleteId: ""})}>Anuluj</button>
				</div>
		</div>
	)
}
export default UserDelete