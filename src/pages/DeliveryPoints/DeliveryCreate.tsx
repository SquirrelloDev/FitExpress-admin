import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import useDeliveryCreate, {DeliveryPostData, deliverySchema, DeliverySchema} from "../../queries/delivery/create";

function DeliveryCreate() {
	const methods = useForm({
		resolver: zodResolver(deliverySchema)
	})
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading} = useDeliveryCreate()
	const { handleSubmit } = methods
	const onSubmit = (data: DeliverySchema) => {
		const newPoint:DeliveryPostData = {
			delivery: {
				name: data.name,
				lat: Number(data.lat),
				lng: Number(data.lng),
				radiusKM: Number(data.radiusKM)
			},
			token: userData.token
		}
		mutate(newPoint)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy punkt FitExpress</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa punktu'/>
					<Input name={'lat'} type={'number'} min={-90} max={90} step={'any'} placeholder='Szerokość geograficzna'/>
					<Input name={'lng'} type={'number'} min={-180} max={180} step={'any'} placeholder='Długość geograficzna'/>
					<Input name={'radiusKM'} type={'number'} min={5} max={50} step={0.1} placeholder='Promień w kilometrach'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default DeliveryCreate