import {IconEdit, IconEye, IconTrashX} from "@tabler/icons-react";
import classes from "../../sass/components/table.module.scss";
interface RowActionsProps{
	id?: string
	modalOpen: boolean,
	setModalOpen: (state: boolean) => void
}
export function RowActions({id, modalOpen, setModalOpen}:RowActionsProps) {
	const logId = () => {
		console.log(id)
		console.log(modalOpen)
		setModalOpen(true)
	}
	return (
		<div className={classes.actions}>
			<button className={classes.actions__button} id='details' onClick={logId}><IconEye/></button>
			<button className={classes.actions__button} id='edit'><IconEdit /></button>
			<button className={classes.actions__button} id='delete'><IconTrashX /></button>
		</div>
	)
}
export default RowActions