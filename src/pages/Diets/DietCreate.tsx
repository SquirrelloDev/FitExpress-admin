import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import useTagsOwner from "../../hooks/useTagsOwner";
import useExclusionsOwner from "../../hooks/useExclusionsOwner";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledMultiSelect from "../../components/Select/ControlledMultiSelect";
import TextArea from "../../components/TextArea/TextArea";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import ControlledSelect from "../../components/Select/ControlledSelect";
import useDietCreate, {DietPostData, dietSchema, DietSchema} from "../../queries/diets/create";

function DietCreate() {
	const methods = useForm({
		resolver: zodResolver(dietSchema),
	})
	const userData = useAuthStore((state) => state.userData);
	const tags = useTagsOwner();
	const exclusions = useExclusionsOwner()
	const {mutate, isLoading} = useDietCreate()
	const { handleSubmit } = methods
	const onSubmit = (data: DietSchema) => {
		const newDiet:DietPostData = {
			...data,
			token: userData.token as string
		}
		mutate(newDiet)
	}
	return (
	<FormProvider {...methods}>
		<div className={classes.form__wrapper}>
			<h2>Nowa dieta</h2>
			{/*@ts-expect-error data is fetched correctly*/}
			<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
				<Input name={'name'} placeholder='Nazwa diety'/>
				<ControlledSelect options={[{label: 'Fixed', value: 'Fixed'}, {label: 'Flexi', value: 'Flexi'}]} control={methods.control} name={'dietType'} placeholder={'Typ diety'}/>
				<ControlledMultiSelect options={tags} control={methods.control} name={'tagsId'} placeholder={'Tagi dla diety'}/>
				<ControlledMultiSelect options={exclusions} control={methods.control} name={'exclusions'} placeholder={'Wykluczenia dla diety'}/>
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
				<Input name={'kcal1500'} type={'number'} min={1} step={0.01} placeholder='1500 kcal'/>
				<Input name={'kcal1800'} type={'number'} min={1} step={0.01} placeholder='1800 kcal'/>
				<Input name={'kcal2000'} type={'number'} min={1} step={0.01} placeholder='2000 kcal'/>
				<Input name={'kcal2200'} type={'number'} min={1} step={0.01} placeholder='2200 kcal'/>
				<Input name={'kcal2500'} type={'number'} min={1} step={0.01} placeholder='2500 kcal'/>
				<Input name={'kcal2800'} type={'number'} min={1} step={0.01} placeholder='2800 kcal'/>
				</div>
				<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
			</form>
		</div>
	</FormProvider>
	)
}
export default DietCreate