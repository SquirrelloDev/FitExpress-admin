import classes from "../sass/pages/login.module.scss";
import btnStyles from '../sass/components/button.module.scss'
import inputStyles from '../sass/components/text-input.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import useLoginMutation, {LoginFormDataSchema, LoginFormSchema} from "../queries/auth/login";
import useSuccessfulLogin from "../hooks/useSuccessfulLogin";

function Login() {
	const handleSuccessfulLogin = useSuccessfulLogin()
	const methods = useForm({
		resolver: zodResolver(LoginFormSchema)

	})
	const {handleSubmit, register, setFocus} = methods
	const {mutate} = useLoginMutation((returnVals) => handleSuccessfulLogin(returnVals),
		() => setFocus('password'))

	const onSubmit = (data: LoginFormDataSchema) => {
		mutate(data);
	}
	return (
		<>
			<h1 className={classes.header__heading}>FitExpress</h1>
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/*@ts-expect-error*/}
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<input type='text' className={inputStyles.input} placeholder={'Adres e-mail'} {...register('email')}/>
				<input type='password' className={inputStyles.input} placeholder={"Hasło"} {...register('password')}/>
				<button type='submit' className={`${classes.form__submit} ${btnStyles.btn}`}>Zaloguj</button>
			</form>
		</>
	)
}
export default Login