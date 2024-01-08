import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {PromocodeSchema, promocodeSchema} from "../../queries/promocodes/create";
import usePromoEdit, {PromocodePutData} from "../../queries/promocodes/edit";
import {Promocode} from "../../types/dbtypes/Promocode";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";

interface PromoEditProps {
	data: Promocode
	token: string,
	id: string
}
function PromoEdit({data, token, id}:PromoEditProps) {
	const methods = useForm({
		resolver: zodResolver(promocodeSchema),
		defaultValues: {
			name: data.name,
			discount: data.discount * 100,
			exp_date: new Date(data.exp_date)
		}
	})
	const {mutate, isLoading} = usePromoEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: PromocodeSchema) => {
		console.log('góno')
		const newPromo: PromocodePutData = {
			promocode: {
				...data,
				discount: Number((data.discount / 100).toFixed(2))
			},
			token: token,
			id: id
		}
		mutate(newPromo)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj voucher</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa vouchera'/>
					<Input name={'discount'} type={'number'} min={1} max={75} placeholder='Wartość zniżki w %'/>
					<ControlledDatePicker control={methods.control} name={'exp_date'} minDate={new Date(Date.now() + 86400000)} placeholderText={'Ważność kodu'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default PromoEdit