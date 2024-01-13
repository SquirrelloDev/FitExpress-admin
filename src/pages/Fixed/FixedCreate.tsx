import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/components/form.module.scss";
import ControlledSelect from "../../components/Select/ControlledSelect";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import useDietsListQuery from "../../queries/diets/listing";
import useMealOwner from "../../hooks/useMealOwner";
import useDayFixedCreate, {FixedPostData, FixedSchema, fixedSchema} from "../../queries/fixed/create";

function FixedCreate() {
	const methods = useForm({
		resolver: zodResolver(fixedSchema),
	})
	const userData = useAuthStore((state) => state.userData);
	const {mutate, isLoading: isFormLoading} = useDayFixedCreate()
	const {data: dietData,  isLoading: isDietsLoading} = useDietsListQuery({token: userData.token, pageIndex: 1, pageSize: 0})
	const selectMeals = useMealOwner()
	const { handleSubmit } = methods
	const onSubmit = (data: FixedSchema) => {

		const newDay:FixedPostData = {
			...data,
			token: userData.token as string
		}
		mutate(newDay)
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.form__wrapper}>
				<h2>Nowy dzień Fixed</h2>
				{/*@ts-expect-error data is fetched correctly*/}
				<form className={classes.form__form} onSubmit={handleSubmit(onSubmit)}>
					<ControlledDatePicker name={'date'} control={methods.control} placeholderText='Data'/>
					{!isDietsLoading && (
						<>
						<h3 style={{margin: '15px 0'}}>Diety</h3>
						{dietData?.diets.map(diet =>
							(
								<div key={diet._id} className={classes['form__day-container__wrapper']}>
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
					<button type='submit' disabled={isFormLoading} className={clsx(btnStyles.btn, classes.form__form__submit)}>{isFormLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Stwórz"}</button>
				</form>
			</div>
		</FormProvider>
	)
}
export default FixedCreate