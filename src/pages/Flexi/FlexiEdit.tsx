import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FlexiSchema, flexiSchema} from "../../queries/flexi/create";
import useMealOwner from "../../hooks/useMealOwner";
import classes from "../../sass/components/form.module.scss";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import clsx from "clsx";
import ControlledSelect from "../../components/Select/ControlledSelect";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {DayFlexi} from "../../types/dbtypes/DayFlexi";
import useDayFlexiEdit, {FlexiPutData} from "../../queries/flexi/edit";

interface FlexiEditProps {
	data: DayFlexi,
	token: string,
	id: string
}
function FlexiEdit({data, token, id}:FlexiEditProps) {
	const methods = useForm({
		resolver: zodResolver(flexiSchema),
		defaultValues: {
			date: new Date(data.date),
			meals: {
				morning: data.morning_meals.map(meal => meal._id),
				lunch: data.lunch_meals.map(meal => meal._id),
				dinner: data.dinner_meals.map(meal => meal._id),
				teatime: data.teatime_meals.map(meal => meal._id),
				supper: data.supper_meals.map(meal => meal._id),
			}
		}
	})
	const dayParts = ['morning', 'lunch', 'dinner', 'teatime', 'supper']
	const {mutate, isLoading: isFormLoading} = useDayFlexiEdit()
	const selectMeals = useMealOwner()
	const { handleSubmit } = methods
	const onSubmit = (data: FlexiSchema) => {
		const newDay:FlexiPutData = {
			...data,
			token: token,
			id: id
		}
		mutate(newDay)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj dzień Flexi</h2>
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<ControlledDatePicker name={'date'} control={methods.control} placeholderText={'Data'}/>
					<h3 style={{margin: '15px 0'}}>Poziomy subskrypcji</h3>
					{dayParts.map(dayPart =>
						(
							<div key={dayPart} className={classes['form__day-container__wrapper']}>
								<h4>{dayPart}</h4>
								<div className={clsx(classes['form__day-container--flexi'], classes['form__day-container'])}>
									<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart}.0`} placeholder={'Basic'}/>
									<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart}.1`} placeholder={'Basic'}/>
									<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart}.2`} placeholder={'Basic'}/>
									<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart}.3`} placeholder={'Plus'}/>
									<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart}.4`} placeholder={'All-in'}/>
									<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${dayPart}.5`} placeholder={'All-in'}/>
								</div>
							</div>
						)
					)}
					<button type='submit' disabled={isFormLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isFormLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default FlexiEdit