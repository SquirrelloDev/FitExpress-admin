import clsx from 'clsx'
import {Control, Controller, FieldValues, Path, useFormContext} from 'react-hook-form'
import Select, {
    Props as SelectProps,
} from 'react-select'
import { SelectOption } from './types'
import classes from "../../sass/components/select.module.scss";
import errorMessages from "../../utils/errorMessages";

interface ControlledSelectProps<T extends FieldValues> extends Omit<SelectProps, 'options'> {
  options: SelectOption[]
  control: Control<T, unknown>
  name: string
  error?: string
  isRequired?: boolean
}
function ControlledSelect<T extends FieldValues>({
  options,
  control,
  name = '',
  placeholder = '',
  isDisabled,
  isRequired = false,
  ...props
}: ControlledSelectProps<T>) {
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
            <label className={classes.select__label}>{placeholder}</label>
          <Select
            options={options}
            value={options.find((option) => option.value === value)}
            onBlur={onBlur}
            //@ts-expect-error value is correct
            onChange={
              (val: SelectOption) => {
              if (!val) {
                onChange(null)
                return
              }
              onChange(val.value)
            }}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px'
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: '#252525FF'
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: '#fff'
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected ? '#46C367FF' : 'none'
                })
            }}
            classNames={{
                control: () => classes.select__control,
                option: ({ isSelected }) =>
                    clsx(
                        classes.select__option,
                        isSelected && classes['select__option--selected']
                    )
            }}
            {...props}
          />
          {errors[name] && (
            <p className={classes.select__error}>
              {`${errors[name]?.message}`}
            </p>
          )}
          {!errors[name] && isTouched && !value && isRequired && (
            <p className={classes.select__error}>
              {errorMessages.required}
            </p>
          )}
        </div>
      )}
    />
  )
}
export default ControlledSelect
