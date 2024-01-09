import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../../sass/components/date-picker.scss"
import inputStyles from '../../sass/components/text-input.module.scss'
import {Control, Controller, FieldValues, Path, useFormContext} from 'react-hook-form'
import CustomInput from "./CustomInput";
import errorMessages from "../../utils/errorMessages";

interface ControlledDatepickerProps<T extends FieldValues>
  extends Omit<ReactDatePickerProps, 'onChange'> {
  control: Control<T>
  name: string
  error?: string
}

function ControlledDatePicker<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledDatepickerProps<T>) {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { isTouched },
      }) => (
        <div>
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            onBlur={onBlur}
            wrapperClassName={'wrapper'}
            customInput={<CustomInput name={name} />}
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            {...props}
          />
          {errors[name] && (
            <p className={inputStyles.error}>
              {`${errors[name as string]?.message}`}
            </p>
          )}
          {!errors[name] && isTouched && !value && (
            <p className={inputStyles.error}>
                {errorMessages.required}
            </p>
          )}
        </div>
      )}
    />
  )
}
export default ControlledDatePicker
