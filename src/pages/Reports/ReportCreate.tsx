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
import {SelectOption} from "../../components/Select/types";
import useUserOrders from "../../hooks/useUserOrders";
import {Address} from "../../types/dbtypes/Address";
import {Order} from "../../types/dbtypes/Order";
import useReportCreate, {ReportPostData, reportSchema, ReportSchema} from "../../queries/reports/create";

const reportCategories: SelectOption[] =[
	{label: 'Otwarta paczka', value: 'openedPackage'},
	{label: 'Brak posiłku', value: 'missingMeal'},
	{label: 'Słaba jakość posiłku', value: 'lowQualityMeal'},
	{label: 'Posiłek inny niż w zamówieniu', value: 'differentMeal'},
	{label: 'Uszkodzona paczka', value: 'damagedPackage'},
	{label: 'Brakująca paczka', value: 'missingPackage'},
	{label: 'Inne', value: 'other'},
]
interface ReportCreateProps {
	data: Order[],
	token: string
}
function ReportCreate({data, token}:ReportCreateProps) {
	const methods = useForm({
		resolver: zodResolver(reportSchema),
	})
	const { handleSubmit, watch } = methods
	const clientId = watch('userId')
	const selectUsers = useUserOwner();
	const selectOrders = useUserOrders(clientId, data)
	const {mutate, isLoading} = useReportCreate()
	const onSubmit = (data: ReportSchema) => {
		const newReport:ReportPostData = {
			report: {
				userId: data.userId,
				orderId: data.orderId,
				deliveryDate: new Date(data.deliveryDate.setHours(1,0,0,0)),
				category: data.category,
				message: data.message
			},
			token: token
		}
		mutate(newReport)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowe zgłoszenie</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<ControlledSelect options={reportCategories} control={methods.control} name={'category'} placeholder={'Kategoria zgłoszenia'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Wybierz klienta'}/>
					<ControlledSelect options={selectOrders} control={methods.control} name={'orderId'} placeholder={'Wybierz zamówenie klienta'}/>
					<ControlledDatePicker control={methods.control} name={'deliveryDate'} placeholderText={'Data dostawy'}/>
					<TextArea name={'message'}  placeholder={'Treść zgłoszenia'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)

}
export default ReportCreate