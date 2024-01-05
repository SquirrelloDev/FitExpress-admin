import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useTagEdit, {TagsPutData, TagsPutSchema, tagsPutSchema} from "../../queries/tags/edit";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {DeliveryPoint} from "../../types/dbtypes/DeliveryPoint";
import {DeliverySchema, deliverySchema} from "../../queries/delivery/create";
import useDeliveryEdit, {DeliveryPutData} from "../../queries/delivery/edit";
interface DeliveryEditProps {
	data: DeliveryPoint
	token: string,
	id: string
}
function DeliveryEdit({data,token,id}:DeliveryEditProps) {
	const methods = useForm({
		resolver: zodResolver(deliverySchema),
		defaultValues: {
			name: data.name,
			lat: data.lat,
			lng: data.lng,
			radiusKM: data.radiusKM
		}
	})
	const {mutate, isLoading} = useDeliveryEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: DeliverySchema) => {
		console.log('góno')
		const newDelivery: DeliveryPutData = {
			delivery: {
				name: data.name,
				lat: data.lat,
				lng: data.lng,
				radiusKM: data.radiusKM
			},
			token: token,
			id: id
		}
		mutate(newDelivery)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj punkt FitExpress</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa punktu'/>
					<Input name={'lat'} type={'number'} min={-90} max={90} step={'any'} placeholder='Szerokość geograficzna'/>
					<Input name={'lng'} type={'number'} min={-180} max={180} step={'any'} placeholder='Długość geograficzna'/>
					<Input name={'radiusKM'} type={'number'} min={5} max={50} step={0.1} placeholder='Promień w kilometrach'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default DeliveryEdit