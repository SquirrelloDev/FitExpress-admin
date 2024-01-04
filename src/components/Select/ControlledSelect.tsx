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
            <p >
              {`${errors[name]?.message}`}
            </p>
          )}
          {!errors[name] && isTouched && !value && isRequired && (
            <p>
              {'required'}
            </p>
          )}
        </div>
      )}
    />
  )
}
export default ControlledSelect
