import classes from "../../../sass/components/detailsModalView.module.scss";
import {ModalType} from "../../../types/table/modalType";
import {IconX} from "@tabler/icons-react";
import {Dispatch, SetStateAction} from "react";
import {useOneUserListQuery} from "../../../queries/users/listing";
import calcLowerDate from "../../../utils/calcMonth";
interface ViewDetailsProps {
	id: string,
	token: string,
	closeModal: Dispatch<SetStateAction<{ isOpen: boolean; modalType: ModalType; }>>
}
function UserDetails({id, token, closeModal}:ViewDetailsProps) {
	const {data: singleUserData, isLoading} = useOneUserListQuery({token, id})
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const birthDate = new Date(singleUserData?.user.birth_date)
	if(isLoading) return (
		<div>
			<div className={classes.view__title}>
				<h2>Informacje</h2>
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
				<p>Dane wpisu {id}.</p>
				<ul>
					<li>Nazwa użytkownika: {singleUserData?.user.name}</li>
					<li>Adres email: {singleUserData?.user.email}</li>
					<li>Data urodzenia: {`${calcLowerDate(birthDate.getDate())}-${calcLowerDate(birthDate.getMonth() + 1)}-${birthDate.getFullYear()}`}</li>
				</ul>
			</div>
		</div>
	)
}
export default UserDetails