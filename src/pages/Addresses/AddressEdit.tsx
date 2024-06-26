import {Address} from "../../types/dbtypes/Address";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddressSchema, addressSchema} from "../../queries/addresses/create";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledSelect from "../../components/Select/ControlledSelect";
import ControlledMultiSelect from "../../components/Select/ControlledMultiSelect";
import Checkbox from "../../components/Checkbox/Checkbox";
import checkboxStyles from "../../sass/components/text-input.module.scss";
import TextArea from "../../components/TextArea/TextArea";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {SelectOption} from "../../components/Select/types";
import useUserOwner from "../../hooks/useUserOwner";
import useDeliveryOwner from "../../hooks/useDeliveryOwner";
import useAddressEdit, {AddressPutData} from "../../queries/addresses/edit";

interface AddressEditProps {
	data: Address
	token: string,
	id: string
}
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
function AddressEdit({data,token,id}: AddressEditProps) {
	const selectDeliveryIds = data.linked_points.map(point => point._id);
	const methods = useForm({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			street: data.street,
			buildingNumber: data.building_no,
			apartmentNumber: data.apartment_no,
			postal: data.postal,
			city: data.city,
			voivodeship: data.voivodeship,
			linked_points: selectDeliveryIds,
			isWeekend: data.is_weekend,
			extraInfo: data.extra_info,
			userId: data.user_id._id
		}
	})
	const {mutate, isLoading} = useAddressEdit()
	const selectUsers = useUserOwner()
	const selectDelivery = useDeliveryOwner()
	const { handleSubmit } = methods
	const onSubmit = (data: AddressSchema) => {
		const newAddress:AddressPutData = {
			address: {
				street: data.street,
				building_no: data.buildingNumber,
				apartment_no: data.apartmentNumber,
				postal: data.postal,
				city: data.city,
				voivodeship: data.voivodeship,
				linked_points: data.linked_points,
				is_weekend: data.isWeekend,
				extra_info: data.extraInfo
			},
			userId: data.userId,
			token: token as string,
			id: id
		}
		mutate(newAddress)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj adres</h2>
				{/*@ts-expect-error data are compatible*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'street'} placeholder='Ulica'/>
					<Input name={'buildingNumber'} placeholder='Nr budynku'/>
					<Input name={'apartmentNumber'} type={'number'} placeholder='Nr lokalu'/>
					<Input name={'city'} placeholder='Miasto'/>
					<Input name={'postal'} placeholder='Kod pocztowy'/>
					<ControlledSelect options={voivodeships} control={methods.control} name={'voivodeship'} placeholder={'Województwo'}/>
					<ControlledMultiSelect defaultValue={selectDelivery.filter(deli => selectDeliveryIds.includes(deli.value as string))} options={selectDelivery} control={methods.control} name={'linked_points'} placeholder={'Powiązane punkty'}/>
					<ControlledSelect options={selectUsers} control={methods.control} name={'userId'} placeholder={'Właściciel adresu'}/>
					<Checkbox name={'isWeekend'} className={checkboxStyles.checkbox} placeholder={'Czy adres weekendowy?'}/>
					<TextArea name={'extraInfo'} placeholder='Dodatkowe informacje'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default AddressEdit