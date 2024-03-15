import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DietSchema, dietSchema} from "../../queries/diets/create";
import useTagsOwner from "../../hooks/useTagsOwner";
import useExclusionsOwner from "../../hooks/useExclusionsOwner";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledSelect from "../../components/Select/ControlledSelect";
import ControlledMultiSelect from "../../components/Select/ControlledMultiSelect";
import TextArea from "../../components/TextArea/TextArea";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {Diet} from "../../types/dbtypes/Diet";
import useDietEdit, {DietPutData} from "../../queries/diets/edit";

interface DietEditProps {
	data: Diet
	token: string,
	id: string
}
function DietEdit({data,token,id}: DietEditProps) {

	const selectTagIds = data.tags_id.map(tag => tag._id)
	const selectExclusions = data.exclusions.map(excl => excl._id)
	const methods = useForm({
		resolver: zodResolver(dietSchema),
		defaultValues: {
			name: data.name,
			dietType: data.diet_type,
			tagsId: selectTagIds,
			exclusions: selectExclusions,
			shortDesc: data.short_desc,
			longDesc: data.long_desc,
			macros:{
				fats: data.macros.fats,
				carbs: data.macros.carbs,
				proteins: data.macros.proteins
			},
			basicInfo: data.basic_info.join(';'),
			kcal1500: data.prices.kcal1500,
			kcal1800: data.prices.kcal1800,
			kcal2000: data.prices.kcal2000,
			kcal2200: data.prices.kcal2200,
			kcal2500: data.prices.kcal2500,
			kcal2800: data.prices.kcal2800,
		}
	})
	const tags = useTagsOwner();
	const exclusions = useExclusionsOwner()
	const {mutate, isLoading} = useDietEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: DietSchema) => {
		const newDiet:DietPutData = {
			...data,
			token: token,
			id: id
		}
		mutate(newDiet)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj dietę</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa diety'/>
					<ControlledSelect options={[{label: 'Fixed', value: 'Fixed'}, {label: 'Flexi', value: 'Flexi'}]} control={methods.control} name={'dietType'} placeholder={'Typ diety'}/>
					<ControlledMultiSelect options={tags} defaultValue={tags.filter(tag => selectTagIds.includes(tag.value as string))} control={methods.control} name={'tagsId'} placeholder={'Tagi dla diety'}/>
					<ControlledMultiSelect options={exclusions} defaultValue={exclusions.filter(excl => selectExclusions.includes(excl.value as string))} control={methods.control} name={'exclusions'} placeholder={'Wykluczenia dla diety'}/>
					<Input name={'basicInfo'} placeholder='Podstawowe informacje o diecie (oddziel informacje średnikiem ;)'/>
					<Input name={'shortDesc'} placeholder='Krótki opis diety'/>
					<TextArea name={'longDesc'} placeholder='Dłuższy opis diety'/>
					<Input name={'image'} type={'file'} accept={'image/jpg, image/png, image/jpeg'} placeholder={'Główne zdjęcie diety'}/>
					<h3 style={{marginBottom: '10px'}}>Wartości odżywcze w %</h3>
					<div className={classes.form__calories}>
						<Input name={'macros.fats'} min={1} max={100} step={0.1} type={'number'} placeholder={'Tłuszcze'}/>
						<Input name={'macros.carbs'} min={1} max={100} step={0.1} type={'number'} placeholder={'Węglowodany'}/>
						<Input name={'macros.proteins'} min={1} max={100} step={0.1} type={'number'} placeholder={'Białka'}/>
					</div>
					<h3 style={{marginBottom: '10px'}}>Rozpiska cenowa dla kaloryczności (w PLN)</h3>
					<div className={classes.form__calories}>
					<Input name={'kcal1500'} type={'number'} placeholder='1500 kcal'/>
					<Input name={'kcal1800'} type={'number'} placeholder='1800 kcal'/>
					<Input name={'kcal2000'} type={'number'} placeholder='2000 kcal'/>
					<Input name={'kcal2200'} type={'number'} placeholder='2200 kcal'/>
					<Input name={'kcal2500'} type={'number'} placeholder='2500 kcal'/>
					<Input name={'kcal2800'} type={'number'} placeholder='2800 kcal'/>
					</div>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default DietEdit