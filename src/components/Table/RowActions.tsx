import {IconEdit, IconEye, IconTrashX} from "@tabler/icons-react";

export function RowActions() {
	return (
		<div>
			<button><IconEye/></button>
			<button><IconEdit /></button>
			<button><IconTrashX /></button>
		</div>
	)
}
export default RowActions