import ReactDOM from "react-dom";
import {ReactNode} from "react";
import classes from "../../sass/components/modal.module.scss";

interface ModalProps {
	children: ReactNode,
}
const Overlay = () => {
	return <div className={classes.overlay}></div>
}
const ModalContent = ({children}:ModalProps) => {
	return <div className={classes.modal__box}>
		{children}
	</div>
}

const Modal = ({children}:ModalProps) => {
	return(
		<>
			{ReactDOM.createPortal(<Overlay/>, (document.getElementById('modal') as unknown) as DocumentFragment)}
			{ReactDOM.createPortal(<ModalContent>{children}</ModalContent>, (document.getElementById('modal') as unknown) as DocumentFragment)}
		</>
	);
}
export default Modal;