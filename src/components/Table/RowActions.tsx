import classes from "../../sass/components/table.module.scss";
import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../types/table/modalType";
import {IconEdit, IconEye, IconTrashX} from "@tabler/icons-react";

interface RowActionsProps{
	id?: string
	setModalOpen: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
	setItemId: Dispatch<SetStateAction<string>>
}
function RowActions({id, setModalOpen, setItemId}:RowActionsProps) {
	const setIdAndOpenModal = (modalType: ModalType) => {
		setItemId(id!)
		setModalOpen({isOpen: true, modalType})
	}
	return (
		<div className={classes.actions}>
			<button className={classes.actions__button} id='details' onClick={() => {setIdAndOpenModal(ModalType.details)}}><IconEye/></button>
			<button className={classes.actions__button} id='edit'><IconEdit /></button>
			<button className={classes.actions__button} id='delete' onClick={() => {setIdAndOpenModal(ModalType.delete)}
			}><IconTrashX /></button>
		</div>
	)
}
export default RowActions