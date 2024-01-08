import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledMultiSelect from "../../components/Select/ControlledMultiSelect";
import TextArea from "../../components/TextArea/TextArea";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import useMealCreate, {MealPostData, mealSchema, MealSchema} from "../../queries/meals/create";
import useTagsOwner from "../../hooks/useTagsOwner";
import useExclusionsOwner from "../../hooks/useExclusionsOwner";

function MealCreate() {
	const methods = useForm({
		resolver: zodResolver(mealSchema),
	})
	const userData = useAuthStore((state) => state.userData);
	const tags = useTagsOwner();
	const exclusions = useExclusionsOwner()
	const {mutate, isLoading} = useMealCreate()
	const { handleSubmit } = methods
	const onSubmit = (data: MealSchema) => {
		const newMeal:MealPostData = {
			...data,
			token: userData.token as string
		}
		mutate(newMeal)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy posiłek</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa posiłku'/>
					<ControlledMultiSelect options={tags} control={methods.control} name={'tagsId'} placeholder={'Tagi dla posiłku'}/>
					<ControlledMultiSelect options={exclusions} control={methods.control} name={'exclusions'} placeholder={'Wykluczenia dla posiłku'}/>
					<TextArea name={'description'} placeholder='Opis posiłku'/>
					<Input name={'ingredients'} placeholder='Składniki (oddziel składniki przecinkami)'/>
					<Input name={'image'} type={'file'} placeholder={'Zdjęcie posiłku'}/>
					<h3>Wartości odżywcze</h3>
					<Input name={'calories'} type={'number'} placeholder='Kalorie (kcal)'/>
					<Input name={'carbs'} type={'number'} placeholder='Węglowodany (g)'/>
					<Input name={'fats'} type={'number'} placeholder='Tłuszcze (g)'/>
					<Input name={'proteins'} type={'number'} placeholder='Białka (g)'/>
					<Input name={'salt'} type={'number'} placeholder='Sól (g)'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default MealCreate