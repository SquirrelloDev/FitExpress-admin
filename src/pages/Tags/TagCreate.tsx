import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/components/form.module.scss";
import Input from "../../components/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import clsx from "clsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {TailSpin} from "react-loader-spinner";
import useTagsCreate, {TagsPostData, tagsSchema, TagsSchema} from "../../queries/tags/create";
import useAuthStore from "../../stores/authStore";

function TagCreate() {
	const methods = useForm({
		resolver: zodResolver(tagsSchema)
	})
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading} = useTagsCreate()
	const { handleSubmit } = methods
	const onSubmit = (data: TagsSchema) => {
		const newTag:TagsPostData = {
			tag: data,
			token: userData.token
		}
		mutate(newTag)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy tag</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<Input name={'name'} placeholder='Nazwa'/>
					<Input name={'description'} placeholder='Opis tagu'/>
					<button type='submit' disabled={isLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
		</FormProvider>
	)
}

export default TagCreate