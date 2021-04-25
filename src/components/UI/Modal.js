import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};
const protalElement = document.getElementById("overlays");
const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose}></Backdrop>,
				protalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				protalElement
			)}
		</Fragment>
	);
};
// const portalElement = document.getElementById("overlays");

// const Modal = (props) => {
// 	return (
// 		<Fragment>
// 			{ReactDOM.createPortal(<Backdrop />, portalElement)}
// 			{ReactDOM.createPortal(
// 				<ModalOverlay>{props.children}</ModalOverlay>,
// 				portalElement
// 			)}
// 		</Fragment>
// 	);
// };
export default Modal;
