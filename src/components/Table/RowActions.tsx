import {IconEdit, IconEye, IconTrashX} from "@tabler/icons-react";
import classes from "../../sass/components/table.module.scss";
interface RowActionsProps{
	id?: string
}
export function RowActions({id}:RowActionsProps) {
	const logId = () => {
		console.log(id)
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