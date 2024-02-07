import classes from "../sass/pages/login.module.scss";
import btnStyles from '../sass/components/button.module.scss'
import inputStyles from '../sass/components/text-input.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import useLoginMutation, {LoginFormDataSchema, LoginFormSchema} from "../queries/auth/login";
import useSuccessfulLogin from "../hooks/useSuccessfulLogin";
import {TailSpin} from "react-loader-spinner";
import toastStyles from '../sass/components/toast.module.scss'
import {toast} from "react-hot-toast";
import clsx from "clsx";

function Login() {
	const handleSuccessfulLogin = useSuccessfulLogin()
	const methods = useForm({
		resolver: zodResolver(LoginFormSchema),
		mode: 'onTouched',
	})
	const {handleSubmit, register, setFocus, formState: {errors}} = methods
	const {mutate, isLoading} = useLoginMutation((returnVals) => { handleSuccessfulLogin(returnVals) },
		(err) => {
			toast.error(err.message, {className: clsx(toastStyles.toast, toastStyles['toast--error']), id: 'LoginError'})
			setFocus('password')
		})

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
				{errors['email'] && <p>{`${errors['email'].message}`}</p>}
				<input type='password' className={inputStyles.input} placeholder={"Hasło"} {...register('password')}/>
				{errors['password'] && <p>{`${errors['password'].message}`}</p>}
				<button type='submit' disabled={isLoading} className={`${classes.form__submit} ${btnStyles.btn}`}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Zaloguj"}</button>
			</form>
		</>
	)
}
export default Login