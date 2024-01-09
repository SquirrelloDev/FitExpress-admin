import inputStyles from '../../sass/components/text-input.module.scss'
import { forwardRef, useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputProps } from './types'

const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      placeholder,
      error,
      placeholderClassName,
      name,
      ...props
    },
    // ref
  ) => {
    const id = useId()
    const {
      register,
      formState: { errors },
    } = useFormContext()
    return (
      <div className={inputStyles.checkbox__wrapper}>
          <input
              id={id}
              // ref={ref}
              placeholder=" "
              type="checkbox"
              className={className ? className : inputStyles.input}
              {...register(`${name}`)}
              {...props}
          />
          <label
              htmlFor={id}
              className={inputStyles.checkbox__label}
          >
              {placeholder}
          </label>
        {errors[name!] && (
          <p className={inputStyles.error}>
            {`${errors[name!]?.message}`}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
