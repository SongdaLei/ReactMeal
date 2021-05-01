import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const orderHandler = () => {
		setIsCheckout(true);
	};
	const submitOrderHandler = async (userData) => {
		setIsSubmiting(true);
		await fetch(
			"https://divine-descent-289617-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItem: cartCtx.items,
				}),
			}
		);
		setIsSubmiting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};
	const cartItems = cartCtx.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			amount={item.amount}
			price={item.price}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}></CartItem>
	));
	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);
	const cartModalContent = (
		<React.Fragment>
			<ul className={classes["cart-items"]}>{cartItems}</ul>

			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onCancel={props.onClose}
					onConfirm={submitOrderHandler}></Checkout>
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);
	const isSubmitingModalContent = <p>Sending Order Data....</p>;
	const didSubmitModalContent = (
		<div>
			<p>Successfully sent the order.</p>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
			</div>
		</div>
	);
	return (
		<Modal onClose={props.onClose}>
			{!isSubmiting && !didSubmit && cartModalContent}
			{isSubmiting && isSubmitingModalContent}
			{!isSubmiting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};
export default Cart;
