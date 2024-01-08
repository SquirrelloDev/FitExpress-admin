import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import checkboxStyles from "../../sass/components/text-input.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import ControlledSelect from "../../components/Select/ControlledSelect";
import TextArea from "../../components/TextArea/TextArea";
import Checkbox from "../../components/Checkbox/Checkbox";
import {SelectOption} from "../../components/Select/types";
import useUserOwner from "../../hooks/useUserOwner";
import useDeliveryOwner from "../../hooks/useDeliveryOwner";
import ControlledMultiSelect from "../../components/Select/ControlledMultiSelect";
import useAddressCreate, {AddressPostData, addressSchema, AddressSchema} from "../../queries/addresses/create";

const voivodeships: SelectOption[] = [
	{label: 'Zachodniopomorskie', value: 'Zachodniopomorskie'},
	{label: 'Pomorskie', value: 'Pomorskie'},
	{label: 'Kujawsko-Pomorskie', value: 'Kujawsko-Pomorskie'},
	{label: 'Warmińsko-Mazurskie', value: 'Warmińsko-Mazurskie'},
	{label: 'Podlaskie', value: 'Podlaskie'},
	{label: 'Lubuskie', value: 'Lubuskie'},
	{label: 'Wielkopolskie', value: 'Wielkopolskie'},
	{label: 'Łódzkie', value: 'Łódzkie'},
	{label: 'Mazowieckie', value: 'Mazowieckie'},
	{label: 'Świętokrzyskie', value: 'Świętokrzyskie'},
	{label: 'Lubelskie', value: 'Lubelskie'},
	{label: 'Dolnośląskie', value: 'Dolnośląskie'},
	{label: 'Opolskie', value: 'Opolskie'},
	{label: 'Śląskie', value: 'Śląskie'},
	{label: 'Małopolskie', value: 'Małopolskie'},
	{label: 'Podkarpackie', value: 'Podkarpackie'},
]

function AddressCreate() {
	const methods = useForm({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			linked_points: []
		}
	})
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading} = useAddressCreate()
	const selectUsers = useUserOwner()
	const selectDelivery = useDeliveryOwner()
	const { handleSubmit } = methods
	const onSubmit = (data: AddressSchema) => {
		const newAddress:AddressPostData = {
			address: {
				street: data.street,
				buildingNumber: data.buildingNumber,
				apartmentNumber: data.apartmentNumber,
				postal: data.postal,
				city: data.city,
				voivodeship: data.voivodeship,
				linked_points: data.linked_points,
				isDefault: data.isDefault,
				isWeekend: data.isWeekend,
				extraInfo: data.extraInfo
			},
			userId: data.userId,
			token: userData.token as string
		}
		mutate(newAddress)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy adres</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'street'} placeholder='Ulica'/>
					<Input name={'buildingNumber'} type={'number'} placeholder='Nr budynku'/>
					<Input name={'apartmentNumber'} type={'number'} placeholder='Nr lokalu'/>
					<Input name={'city'} placeholder='Miasto'/>
					<Input name={'postal'} placeholder='Kod pocztowy'/>
					{/*@ts-expect-error values are correct*/}
					<ControlledSelect options={voivodeships} control={methods.control} name={'voivodeship'} placeholder={'Województwo'}/>
					<ControlledMultiSelect options={selectDelivery} control={methods.control} name={'linked_points'} placeholder={'Powiązane punkty'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Właściciel adresu'}/>
					<Checkbox name={'isWeekend'} className={checkboxStyles.checkbox} placeholder={'Czy adres weekendowy?'}/>
					<Checkbox name={'isDefault'} className={checkboxStyles.checkbox} placeholder={'Czy adres domyślny?'}/>
					<TextArea name={'extraInfo'} placeholder='Dodatkowe informacje'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default AddressCreate