import clsx from 'clsx'
import { Control, Controller, useFormContext } from 'react-hook-form'
import Select, {
  Props as SelectProps,
} from 'react-select'
import { SelectOption } from './types'
import classes from "../../sass/components/select.module.scss";

interface ControlledSelectProps extends Omit<SelectProps, 'options'> {
  options: SelectOption[]
  control: Control
  name: string
  error?: string
  isRequired?: boolean
}
function ControlledSelect({
  options,
  control,
  name = '',
  placeholder = '',
  isDisabled,
  isRequired = false,
  ...props
}: ControlledSelectProps) {
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
            <label className={classes.select__label}>{placeholder}</label>
          <Select
            options={options}
            value={options.find((option) => option.value === value)}
            onBlur={onBlur}
            onChange={(val: unknown) => {
              if (!val) {
                onChange(null)
                return
              }
              onChange(val)
            }}
            classNames={{
                control: () => classes.select__control,
                menu: () => classes.select__menu,
                valueContainer: () => classes['select__value-container'],
                singleValue: () => classes.select__input,
                option: ({ isSelected }) =>
                    clsx(
                        classes.select__option,
                        isSelected && classes['select__option--selected']
                    )
            }}
            {...props}
          />
          {errors[name] && (
            <p >
              {`${errors[name]?.message}`}
            </p>
          )}
          {!errors[name] && isTouched && !value && isRequired && (
            <p>
              {'requirttjtyjed'}
            </p>
          )}
        </div>
      )}
    />
  )
}
export default ControlledSelect
