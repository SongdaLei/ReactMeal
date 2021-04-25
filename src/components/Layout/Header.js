import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>ReactMeal</h1>
				<HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImage} alt='A table full of decious food!'></img>
			</div>
		</Fragment>
	);
};
export default Header;
