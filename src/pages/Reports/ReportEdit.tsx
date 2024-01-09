import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserOwner from "../../hooks/useUserOwner";
import useUserOrders from "../../hooks/useUserOrders";
import classes from "../../sass/components/form.module.scss";
import ControlledSelect from "../../components/Select/ControlledSelect";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import TextArea from "../../components/TextArea/TextArea";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {Order} from "../../types/dbtypes/Order";
import {SelectOption} from "../../components/Select/types";
import {Report} from "../../types/dbtypes/Report";
import useReportEdit, {ReportPutData, reportPutSchema, ReportPutSchema} from "../../queries/reports/edit";

const reportCategories: SelectOption[] =[
	{label: 'Otwarta paczka', value: 'openedPackage'},
	{label: 'Brak posiłku', value: 'missingMeal'},
	{label: 'Słaba jakość posiłku', value: 'lowQualityMeal'},
	{label: 'Posiłek inny niż w zamówieniu', value: 'differentMeal'},
	{label: 'Uszkodzona paczka', value: 'damagedPackage'},
	{label: 'Brakująca paczka', value: 'missingPackage'},
	{label: 'Inne', value: 'other'},
]
const reportStatuses: SelectOption[] =[
	{label: 'Nowe', value:'new'},
	{label: 'Przyjęte', value: 'pending'},
	{label: 'Zatwierdzone', value:'resolved'},
	{label: 'Odrzucone', value: 'rejected'}
]
interface ReportEditProps {
	reportData: Report,
	orderData: Order[],
	token: string,
	id: string
}
function ReportEdit({reportData, orderData, token, id}:ReportEditProps) {
	const methods = useForm({
		resolver: zodResolver(reportPutSchema),
		defaultValues: {
			category: reportData.category,
			userId: reportData.user_id._id,
			orderId: reportData.order_id,
			deliveryDate: new Date(reportData.delivery_date),
			message: reportData.message,
			reportStatus: reportData.report_status
		}
	})
	const { handleSubmit, watch } = methods
	const clientId = watch('userId')
	const selectUsers = useUserOwner();
	const selectOrders = useUserOrders(clientId, orderData)
	const {mutate, isLoading} = useReportEdit()
	const onSubmit = (data: ReportPutSchema) => {
		const newReport:ReportPutData = {
			report: {
				userId: data.userId,
				orderId: data.orderId,
				deliveryDate: new Date(data.deliveryDate.setHours(1,0,0,0)),
				category: data.category,
				message: data.message,
				reportStatus: data.reportStatus
			},
			token: token,
			id: id
		}
		mutate(newReport)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj zgłoszenie</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<ControlledSelect options={reportCategories} control={methods.control} name={'category'} placeholder={'Kategoria zgłoszenia'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Wybierz klienta'}/>
					<ControlledSelect options={selectOrders} control={methods.control} name={'orderId'} placeholder={'Wybierz zamówenie klienta'}/>
					<ControlledDatePicker control={methods.control} name={'deliveryDate'} placeholderText={'Data dostawy'}/>
					<ControlledSelect options={reportStatuses} control={methods.control} name={'reportStatus'} placeholder={'Status zgłoszenia'}/>
					<TextArea name={'message'}  placeholder={'Treść zgłoszenia'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default ReportEdit