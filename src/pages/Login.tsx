import classes from "../sass/pages/login.module.scss";
import btnStyles from '../sass/components/button.module.scss'
import inputStyles from '../sass/components/text-input.module.scss'
export function Login() {
	return (
		<>
			<h1 className={classes.header__heading}>FitExpress</h1>
			<form className={classes.form}>
				<input type='text' className={inputStyles.input} placeholder={'Adres e-mail'}/>
				<input type='password' className={inputStyles.input} placeholder={"Hasło"}/>
				<button type='submit' className={`${classes.form__submit} ${btnStyles.btn}`}>Zaloguj</button>
			</form>
		</>
	)
}