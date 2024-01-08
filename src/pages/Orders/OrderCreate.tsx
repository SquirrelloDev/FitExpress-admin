import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "../../sass/components/form.module.scss";
import inputStyles from '../../sass/components/text-input.module.scss'
import Input from "../../components/Input/Input";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import Checkbox from "../../components/Checkbox/Checkbox";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import useUserOwner from "../../hooks/useUserOwner";
import useDietOwner from "../../hooks/useDietOwner";
import {Address} from "../../types/dbtypes/Address";
import useUserAddresses from "../../hooks/useUserAddresses";
import useOrderCreate, {OrderPostData, orderSchema, OrderSchema} from "../../queries/orders/create";

interface OrderCreateProps {
	data: Address[],
	token: string
}
function OrderCreate({data, token}:OrderCreateProps) {
	const methods = useForm({
		resolver: zodResolver(orderSchema),
	})
	const { handleSubmit, watch } = methods
	const clientId = watch('userId');
	const allAdresses = data
	const selectDiets = useDietOwner();
	const selectUsers = useUserOwner();
	const selectedUserAddresses = useUserAddresses(clientId, allAdresses)
	const {mutate, isLoading} = useOrderCreate()
	const onSubmit = (data: OrderSchema) => {
		const newOrder:OrderPostData = {
			order: {
				name: data.name,
				dietId: data.dietId,
				userId: data.userId,
				addressId: data.addressId,
				subDate: {
					from: new Date(data.subDateFrom.setHours(1,0,0,0)),
					to: new Date(data.subDateTo.setHours(1,0,0,0))
				},
				price: data.price,
				calories: data.calories,
				withWeekends: data.withWeekends
			},
			token: token
		}
		mutate(newOrder)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowe zamówienie</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder={'Nazwa zamówienia'}/>
					<ControlledSelect options={selectDiets} control={methods.control} name={'dietId'} placeholder={'Dieta'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Klient dla tej diety'}/>
					<ControlledSelect options={selectedUserAddresses} control={methods.control} name={'addressId'} placeholder={'Adres klienta'}/>
					<h3>Okres trwania diety</h3>
					<ControlledDatePicker control={methods.control} name={'subDateFrom'} placeholderText={'Od'}/>
					<ControlledDatePicker control={methods.control} name={'subDateTo'} placeholderText={'Do'}/>
					<Input type={'number'} name={'price'} placeholder={'Cena diety'}/>
					<Input type={'number'} name={'calories'} placeholder={'Kaloryczność diety'}/>
					<Checkbox className={inputStyles.checkbox} name={'withWeekends'} placeholder={'Czy z weekendami?'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default OrderCreate