import {FormProvider, useForm} from "react-hook-form";
import classes from "../../sass/components/form.module.scss";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {DevTool} from "@hookform/devtools";
import {fixedSchema, FixedSchema} from "../../queries/fixed/create";
import useDietsListQuery from "../../queries/diets/listing";
import useMealOwner from "../../hooks/useMealOwner";
import {zodResolver} from "@hookform/resolvers/zod";
import useDayFixedEdit, {FixedPutData} from "../../queries/fixed/edit";
import {DayFixed} from "../../types/dbtypes/DayFixed";

interface FixedEditProps {
	data: DayFixed,
	token: string,
	id: string
}
function FixedEdit({data,token,id}:FixedEditProps) {
	const {mutate, isLoading: isFormLoading} = useDayFixedEdit()
	const {data: dietData,  isLoading: isDietsLoading} = useDietsListQuery({token: token, pageIndex: 1, pageSize: 0})
	const dietsDefaultVals: Record<string, string> = data!.diets.reduce((acc: Record<string, string>, item) => {
		acc[`meals.${item.diet_id._id}.0`]  = item.meals.morning._id
		acc[`meals.${item.diet_id._id}.1`]  = item.meals.lunch._id
		acc[`meals.${item.diet_id._id}.2`]  = item.meals.dinner._id
		acc[`meals.${item.diet_id._id}.3`]  = item.meals.teatime._id
		acc[`meals.${item.diet_id._id}.4`]  = item.meals.supper._id
		return acc
	}, {})
	const methods = useForm({
		resolver: zodResolver(fixedSchema),
		defaultValues: {
			date: new Date(data.date),
			...dietsDefaultVals
		}
	})
	const selectMeals = useMealOwner()
	const { handleSubmit } = methods
	const onSubmit = (data: FixedSchema) => {
		console.log(data)

		const newDay:FixedPutData = {
			...data,
			token: token,
			id: id
		}
		mutate(newDay)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Edytuj dzień Fixed</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<ControlledDatePicker name={'date'} control={methods.control} placeholderText='Data'/>
					{!isDietsLoading && (
						<>
							<h3 style={{margin: '15px 0'}}>Diety</h3>
							{dietData?.diets.map(diet =>
								(
									<div key={diet._id} className={classes['form__fixed-container__wrapper']}>
										<h4 style={{marginBottom: '10px'}}>{diet.name}</h4>
										<div className={clsx(classes['form__day-container--fixed'], classes['form__day-container'])}>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${diet._id}.0`} placeholder={'Śniadanie'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${diet._id}.1`} placeholder={'Lunch'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${diet._id}.2`} placeholder={'Obiad'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${diet._id}.3`} placeholder={'Podwieczorek'}/>
											<ControlledSelect control={methods.control} options={selectMeals} name={`meals.${diet._id}.4`} placeholder={'Kolacja'}/>
										</div>
									</div>
								)
							)}
						</>
					)}
					<button type='submit' disabled={isFormLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isFormLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Edytuj"}</button>
				</form>
			</div>
			<DevTool control={methods.control}/>
		</FormProvider>
	)
}
export default FixedEdit