import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ExclusionSchema, exclusionSchema} from "../../queries/exclusions/create";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {Exclusion} from "../../types/dbtypes/Exclusions";
import useExclusionEdit, {ExclusionPutData} from "../../queries/exclusions/edit";

interface ExclusionEditProps {
	data: Exclusion
	token: string,
	id: string
}
function ExclusionEdit({data, token,id}: ExclusionEditProps) {
	const methods = useForm({
		resolver: zodResolver(exclusionSchema),
		defaultValues: {
			name: data.name
		}
	})
	const {mutate, isLoading} = useExclusionEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: ExclusionSchema) => {
		const newExcl:ExclusionPutData = {
			exclusion: data,
			token: token,
			id: id
		}
		mutate(newExcl)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowe wykluczenie</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa wykluczenia'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default ExclusionEdit