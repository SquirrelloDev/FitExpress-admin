import {FormProvider, useForm} from "react-hook-form";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledMultiSelect from "../../components/Select/ControlledMultiSelect";
import TextArea from "../../components/TextArea/TextArea";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {zodResolver} from "@hookform/resolvers/zod";
import {MealSchema, mealSchema} from "../../queries/meals/create";
import useTagsOwner from "../../hooks/useTagsOwner";
import useExclusionsOwner from "../../hooks/useExclusionsOwner";
import {Meal} from "../../types/dbtypes/Meal";
import useMealEdit, {MealPutData} from "../../queries/meals/edit";

interface MealEditProps {
	data: Meal
	token: string,
	id: string
}
function MealEdit({data, token, id}:MealEditProps) {
	const selectTagIds = data.tags_id.map(tag => tag._id)
	const selectExclusions = data.exclusions.map(excl => excl._id)
	const methods = useForm({
		resolver: zodResolver(mealSchema),
		defaultValues: {
			name: data.name,
			description: data.description,
			tagsId: selectTagIds,
			exclusions: selectExclusions,
			ingredients: data.ingredients.join(','),
			calories: data.nutrition_values.calories,
			carbs: data.nutrition_values.carbs,
			fats: data.nutrition_values.fats,
			proteins: data.nutrition_values.proteins,
			salt: data.nutrition_values.salt,
		}
	})
	const tags = useTagsOwner();
	const exclusions = useExclusionsOwner()
	const {mutate, isLoading} = useMealEdit()

	const { handleSubmit } = methods
	const onSubmit = (data: MealSchema) => {
		const newMeal:MealPutData = {
			...data,
			token: token,
			id: id
		}
		mutate(newMeal)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj posiłek</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa posiłku'/>
					<ControlledMultiSelect options={tags} defaultValue={tags.filter(tag => selectTagIds.includes(tag.value as string))} control={methods.control} name={'tagsId'} placeholder={'Tagi dla posiłku'}/>
					<ControlledMultiSelect options={exclusions} defaultValue={exclusions.filter(excl => selectExclusions.includes(excl.value as string))} control={methods.control} name={'exclusions'} placeholder={'Wykluczenia dla posiłku'}/>
					<TextArea name={'description'} placeholder='Opis posiłku'/>
					<Input name={'ingredients'} placeholder='Składniki (oddziel składniki przecinkami)'/>
					<Input name={'image'} type={'file'}  accept={'image/jpeg, image/png'} placeholder={'Zdjęcie posiłku'}/>
					<h3 style={{marginBottom: '10px'}}>Wartości odżywcze</h3>
					<Input name={'calories'} type={'number'} placeholder='Kalorie (kcal)'/>
					<Input name={'carbs'} type={'number'} placeholder='Węglowodany (g)'/>
					<Input name={'fats'} type={'number'} placeholder='Tłuszcze (g)'/>
					<Input name={'proteins'} placeholder='Białka (g)'/>
					<Input name={'salt'} placeholder='Sól (g)'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default MealEdit