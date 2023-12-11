import classes from "../../sass/components/table.module.scss";
import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../types/table/modalType";
import {IconEdit, IconEye, IconTrashX} from "@tabler/icons-react";
import useListingRoute from "../../hooks/useListingRoute";
import {TableListingType} from "../../types/table/tableListing";
import {useNavigate} from "react-router-dom";

interface RowActionsProps{
	id?: string
	setModalOpen: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
	setItemId: Dispatch<SetStateAction<string>>
	listingRoute: TableListingType
	hideDetails?: boolean
}
function RowActions({id, setModalOpen, setItemId, listingRoute, hideDetails = false}:RowActionsProps) {
	const routeLink = useListingRoute(listingRoute)
	const navigate = useNavigate()
	const setIdAndOpenModal = (modalType: ModalType) => {
		setItemId(id!)
		setModalOpen({isOpen: true, modalType})
	}
	const navigateToEdit = () => {
	  navigate(`${routeLink}/edit/${id}`)
	}
	return (
		<div className={classes.actions}>
			{!hideDetails && <button className={classes.actions__button} id='details' onClick={() => {setIdAndOpenModal(ModalType.details)}}><IconEye/></button>}
			<button className={classes.actions__button} id='edit' onClick={navigateToEdit}><IconEdit /></button>
			<button className={classes.actions__button} id='delete' onClick={() => {setIdAndOpenModal(ModalType.delete)}
			}><IconTrashX /></button>
		</div>
	)
}
export default RowActions