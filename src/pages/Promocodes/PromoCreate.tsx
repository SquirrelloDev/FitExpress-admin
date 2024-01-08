import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import usePromoCreate, {PromocodePostData, promocodeSchema, PromocodeSchema} from "../../queries/promocodes/create";

function PromoCreate() {
	const methods = useForm({
		resolver: zodResolver(promocodeSchema)
	})
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading} = usePromoCreate()
	const { handleSubmit } = methods
	const onSubmit = (data: PromocodeSchema) => {
		const newPromo:PromocodePostData = {
			promocode: {
				...data,
				discount: Number((data.discount / 100).toFixed(2))
			},
			token: userData.token
		}
		mutate(newPromo)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy wykluczenie</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa vouchera'/>
					<Input name={'discount'} type={'number'} min={1} max={75} placeholder='Wartość zniżki w %'/>
					<ControlledDatePicker control={methods.control} name={'exp_date'} minDate={new Date(Date.now() + 86400000)} placeholderText={'Ważność kodu'}/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default PromoCreate