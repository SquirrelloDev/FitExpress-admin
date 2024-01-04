import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../../sass/components/date-picker.scss"
import { Control, Controller, useFormContext } from 'react-hook-form'
import CustomInput from "./CustomInput";

interface ControlledDatepickerProps
  extends Omit<ReactDatePickerProps, 'onChange'> {
  control: Control
  name: string
  error?: string
}

function ControlledDatePicker({
  control,
  name = '',
  ...props
}: ControlledDatepickerProps) {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <Controller
      name={name}
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
            <p>
              {`${errors[name]?.message}`}
            </p>
          )}
          {!errors[name] && isTouched && !value && (
            <p>
                {'required'}
            </p>
          )}
        </div>
      )}
    />
  )
}
export default ControlledDatePicker
