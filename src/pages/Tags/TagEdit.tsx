import {SelectOption} from "../../components/Select/types";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import useUserEdit, {UserPutData, userPutSchema, UserPutSchema} from "../../queries/users/edit";
import {UserFullData} from "../../types/dbtypes/UserData";
import useTagEdit, {TagsPutData, TagsPutSchema, tagsPutSchema} from "../../queries/tags/edit";
import {Tag} from "../../types/dbtypes/Tags";

interface TagEditProps {
	data: Tag
	token: string,
	id: string
}
function TagEdit({data, token, id}:TagEditProps) {
	const methods = useForm({
		resolver: zodResolver(tagsPutSchema),
		defaultValues: {
			name: data.name,
			description: data.description
		}
	})
	const {mutate, isLoading} = useTagEdit()
	const { handleSubmit } = methods
	const onSubmit = (data: TagsPutSchema) => {
		console.log('góno')
		const newTag: TagsPutData = {
			tag: {
				name: data.name,
				description: data.description
			},
			token: token,
			id: id
		}
		mutate(newTag)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy tag</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa'/>
					<Input name={'description'} placeholder='Opis tagu'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default TagEdit