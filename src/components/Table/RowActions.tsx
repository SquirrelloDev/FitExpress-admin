import {IconEdit, IconEye, IconTrashX} from "@tabler/icons-react";
import classes from "../../sass/components/table.module.scss";
import {Dispatch, SetStateAction} from "react";
interface RowActionsProps{
	id?: string
	setModalOpen: Dispatch<SetStateAction<{ isOpen: boolean; deleteId: string; }>>
}
export function RowActions({id, setModalOpen}:RowActionsProps) {
	const logId = () => {
		console.log(id)
	}
	return (
		<div className={classes.actions}>
			<button className={classes.actions__button} id='details' onClick={logId}><IconEye/></button>
			<button className={classes.actions__button} id='edit'><IconEdit /></button>
			<button className={classes.actions__button} id='delete' onClick={() => setModalOpen({isOpen: true, deleteId: id!})}><IconTrashX /></button>
		</div>
	)
}
export default RowActions