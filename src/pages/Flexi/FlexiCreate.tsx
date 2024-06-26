import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import useMealOwner from "../../hooks/useMealOwner";
import classes from "../../sass/components/form.module.scss";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import useDayFlexiCreate, {FlexiPostData, FlexiSchema, flexiSchema} from "../../queries/flexi/create";

function FlexiCreate() {
	const methods = useForm({
		resolver: zodResolver(flexiSchema),
	})
	const dayParts = [{name: 'morning', plName: 'Śniadanie'}, {name: 'lunch', plName: 'lunch'}, {name: 'dinner', plName: 'Obiad'}, {name: 'teatime', plName: 'Podwieczorek'}, {name: 'supper', plName: 'kolacja'}]
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading: isFormLoading} = useDayFlexiCreate()
	const selectMeals = useMealOwner()
	const { handleSubmit } = methods
	const onSubmit = (data: FlexiSchema) => {
		const newDay:FlexiPostData = {
			...data,
			token: userData.token as string
		}
		mutate(newDay)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy dzień Flexi</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<ControlledDatePicker name={'date'} control={methods.control} placeholderText={'Data'}/>
							<h3 style={{margin: '15px 0'}}>Poziomy subskrypcji</h3>
							{dayParts.map(dayPart =>
								(
									<div key={dayPart.name} className={classes['form__day-container__wrapper']}>
										<h4>{dayPart.plName}</h4>
										<div className={clsx(classes['form__day-container--flexi'], classes['form__day-container'])}>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart.name}.0`} placeholder={'Basic'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart.name}.1`} placeholder={'Basic'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart.name}.2`} placeholder={'Basic'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart.name}.3`} placeholder={'Plus'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart.name}.4`} placeholder={'All-in'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart.name}.5`} placeholder={'All-in'}/>
										</div>
									</div>
								)
							)}
					<button type='submit' disabled={isFormLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isFormLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default FlexiCreate