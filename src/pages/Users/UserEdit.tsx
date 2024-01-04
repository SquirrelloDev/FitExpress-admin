import {SelectOption} from "../../components/Select/types";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserCreate, {UserPostData, UserSchema, userSchema} from "../../queries/users/create";
import {calculateAge, calculateBMI, calculateDemands} from "../../utils/calculateUserData";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {useOneUserListQuery} from "../../queries/users/listing";
import useAuthStore from "../../stores/authStore";
import {useParams} from "react-router-dom";
import useUserEdit, {UserPutData} from "../../queries/users/edit";

const palActive: SelectOption[] = [
	{label: 'Brak treningów / jeden lekki', value: 1.2},
	{label: 'Pojedyncze treningi', value: 1.4},
	{label: '2-3 treningi w tygodniu', value: 1.6},
	{label: '4-6 trenigów w tygodniu', value: 1.8},
	{label: 'Codzienne treningi', value: 2.0},
]
const palPassive: SelectOption[] = [
	{label: 'Bardzo niska', value: 1.2},
	{label: 'Niska aktywność / praca biurowa', value: 1.4},
	{label: 'Średnia aktywność / praca mieszana', value: 1.6},
	{label: 'Wysoka aktywność / praca fizyczna', value: 1.8},
	{label: 'Bardzo wysoka aktywność / ciężka praca fizyczna', value: 2.0},
]
const userGoal: SelectOption[] = [
	{label: 'Chcę schudnąć', value: 'burn'},
	{label: 'Chcę zdrowo jeść', value: 'balance'},
	{label: 'Chcę budować mięsnie', value: 'surplus'},
]
const userRoles: SelectOption[] = [
	{label: 'Użytkownik zwykły', value: 1},
	{label: 'Dietetyk Fitexpress', value: 2},
	{label: 'Administrator', value: 3}
]
function UserEdit() {
	const userData = useAuthStore((state) => state.userData)
	const {id} = useParams();
	console.log(id)
	const {data, isLoading: isUserLoading} = useOneUserListQuery({token: userData.token as string, id: id as string})
	const methods = useForm({
		defaultValues: {
			name: isUserLoading ? 'ggg' : 'fff',
			email: 'sdfsd'
		},
		resolver: zodResolver(userSchema)

	})
	const {mutate, isLoading} = useUserEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: UserSchema) => {
		const age = calculateAge(data.birth_date);
		const {caloricDemand, waterDemand} = calculateDemands(data.gender, data.pal_active, data.pal_passive, data.user_weight_current, data.user_height, age, data.user_goal)
		const {plannedBMI, currentBMI} = calculateBMI(data.user_height, data.user_weight_current, data.user_weight_planned);
		const newUser: UserPutData = {
			user: {
				name: data.name,
				email: data.email,
				role: data.role,
				password: data.password,
				birth_date: data.birth_date,
				healthData: {
					age,
					user_goal: data.user_goal,
					pal_active: data.pal_active,
					pal_passive: data.pal_passive,
					calories_demand: caloricDemand,
					water_demand: waterDemand,
					gender: data.gender,
					user_height: data.user_height,
					bmi_planned: plannedBMI,
					bmi: currentBMI,
					user_weight_current: data.user_weight_current,
					user_weight_planned: data.user_weight_planned,
				},
			},
			authInfo:{
				token: userData.token as string,
				id: id as string
			}
		}
		mutate(newUser)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edycja użytkownika</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa'/>
					<Input name={'email'} type='email' placeholder='Adres email'/>
					<Input name={'password'} type='password' placeholder='Hasło'/>
					<ControlledDatePicker control={methods.control} name={'birth_date'} placeholderText={"Data urodzenia"}/>
					<ControlledSelect options={userRoles} control={methods.control} name={'role'} isRequired placeholder={'Rola'} />
					<h2>Dane zdrowotne</h2>
					<Input name={'user_height'} type='number' min={120} max={250} placeholder={'Wzrost'} />
					<Input name={'user_weight_current'} type='number' min={40} max={500} placeholder={'Aktualna waga'} />
					<Input name={'user_weight_planned'} type='number' min={40} max={500} placeholder={'Planowana waga'} />
					<ControlledSelect options={[{label: 'Mężczyzna', value: 'M'}, {label: 'Kobieta', value: 'F'}]} control={methods.control} name={'gender'} placeholder={'Płeć'} isRequired/>
					<ControlledSelect options={palActive} control={methods.control} name={'pal_active'} placeholder={'Aktywność treningowa w tygodniu'}/>
					<ControlledSelect options={palPassive} control={methods.control} name={'pal_passive'} placeholder={'Aktywność pozatreningowa'}/>
					<ControlledSelect options={userGoal} control={methods.control} name={'user_goal'} placeholder={'Cel użytkownika'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
				{/*<p>Dane dotyczące zdrowia są niedostępne do edycji</p>*/}
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default UserEdit