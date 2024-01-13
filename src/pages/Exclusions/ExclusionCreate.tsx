import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import useExclusionCreate, {ExclusionPostData, ExclusionSchema, exclusionSchema} from "../../queries/exclusions/create";

function ExclusionCreate() {
	const methods = useForm({
		resolver: zodResolver(exclusionSchema)
	})
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading} = useExclusionCreate()
	const { handleSubmit } = methods
	const onSubmit = (data: ExclusionSchema) => {
		const newExcl:ExclusionPostData = {
			exclusion: data,
			token: userData.token
		}
		mutate(newExcl)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy wykluczenie</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa wykluczenia'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default ExclusionCreate