import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useOrderCreate, {OrderPostData, OrderSchema, orderSchema} from "../../queries/orders/create";
import useDietOwner from "../../hooks/useDietOwner";
import useUserOwner from "../../hooks/useUserOwner";
import useUserAddresses from "../../hooks/useUserAddresses";
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
import TextArea from "../../components/TextArea/TextArea";

function ReportCreate() {
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
					<ControlledSelect options={selectDiets} control={methods.control} name={'dietId'} placeholder={'Dieta'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Klient dla tej diety'}/>
					<ControlledDatePicker control={methods.control} name={'subDateFrom'} placeholderText={'Od'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Klient dla tej diety'}/>
					<TextArea name={'message'}  placeholder={'Treść zgłoszenia'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)

}
export default ReportCreate