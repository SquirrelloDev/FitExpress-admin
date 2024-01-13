import {SelectOption} from "../../components/Select/types";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import useUserEdit, {UserPutData, userPutSchema, UserPutSchema} from "../../queries/users/edit";
import {UserFullData} from "../../types/dbtypes/UserData";

interface UserEditProps {
	data: UserFullData
	token: string,
	id: string
}
const userRoles: SelectOption[] = [
	{label: 'Użytkownik zwykły', value: 1},
	{label: 'Dietetyk Fitexpress', value: 2},
	{label: 'Administrator', value: 3}
]
function UserEdit({data, token, id}:UserEditProps) {
	const methods = useForm({
		resolver: zodResolver(userPutSchema),
		defaultValues: {
			name: data.name,
			email: data.email,
			birth_date: new Date(data.birth_date),
			role: data.role
		}
	})
	const {mutate, isLoading} = useUserEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: UserPutSchema) => {
		const newUser: UserPutData = {
			user: {
				name: data.name,
				email: data.email,
				role: data.role,
				birth_date: data.birth_date,
			},
			authInfo:{
				token: token as string,
				id: id as string
			}
		}
		mutate(newUser)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edycja użytkownika</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa'/>
					<Input name={'email'} type='email' placeholder='Adres email'/>
					<ControlledDatePicker control={methods.control} name={'birth_date'} placeholderText={"Data urodzenia"}/>
					<ControlledSelect options={userRoles} control={methods.control} name={'role'} isRequired placeholder={'Rola'} />
					<h2>Dane zdrowotne</h2>
					<p>Dane dotyczące zdrowia są niedostępne do edycji</p>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default UserEdit