import {Address} from "../../types/dbtypes/Address";
import {Order} from "../../types/dbtypes/Order";
import {FormProvider, useForm} from "react-hook-form";
import classes from "../../sass/components/form.module.scss";
import ControlledSelect from "../../components/Select/ControlledSelect";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import inputStyles from "../../sass/components/text-input.module.scss";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {zodResolver} from "@hookform/resolvers/zod";
import {OrderSchema, orderSchema} from "../../queries/orders/create";
import useDietOwner from "../../hooks/useDietOwner";
import useUserOwner from "../../hooks/useUserOwner";
import useUserAddresses from "../../hooks/useUserAddresses";
import useOrderEdit, {OrderPutData} from "../../queries/orders/edit";

interface OrderEditProps {
	addressData: Address[],
	orderData: Order,
	token: string,
	id: string
}
function OrderEdit({addressData, orderData, token, id}:OrderEditProps) {
	console.log(orderData)
	const methods = useForm({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			name: orderData.name,
			dietId: orderData.diet_id._id,
			userId: orderData.user_id._id,
			addressId: orderData.address_id._id,
			subDateFrom: new Date(orderData.sub_date.from),
			subDateTo: new Date(orderData.sub_date.to),
			price: orderData.price,
			calories: orderData.calories,
			withWeekends: orderData.with_weekends
		}
	})
	const { handleSubmit, watch } = methods
	const clientId = watch('userId');
	const allAdresses = addressData
	const selectDiets = useDietOwner();
	const selectUsers = useUserOwner();
	const selectedUserAddresses = useUserAddresses(clientId, allAdresses)
	const {mutate, isLoading} = useOrderEdit()
	const onSubmit = (data: OrderSchema) => {
		const newOrder:OrderPutData = {
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
			token: token,
			id: id
		}
		mutate(newOrder)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj zamówienie</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder={'Nazwa zamówienia'}/>
					<ControlledSelect options={selectDiets} control={methods.control} name={'dietId'} placeholder={'Dieta'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Klient dla tej diety'}/>
					<ControlledSelect options={selectedUserAddresses} control={methods.control} name={'addressId'} placeholder={'Adres klienta'}/>
					<h3 style={{}}>Okres trwania diety</h3>
					<ControlledDatePicker control={methods.control} name={'subDateFrom'} placeholderText={'Od'}/>
					<ControlledDatePicker control={methods.control} name={'subDateTo'} placeholderText={'Do'}/>
					<Input type={'number'} name={'price'} placeholder={'Cena diety'}/>
					<Input type={'number'} name={'calories'} placeholder={'Kaloryczność diety'}/>
					<Checkbox className={inputStyles.checkbox} name={'withWeekends'} placeholder={'Czy z weekendami?'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default OrderEdit