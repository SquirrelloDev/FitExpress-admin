import inputStyles from '../../sass/components/text-input.module.scss'
import { forwardRef, useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputProps } from './types'

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      placeholder,
      type,
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
      <div className={inputStyles.input__wrapper}>
          <label
              htmlFor={id}
              className={inputStyles.input__label}
          >
              {placeholder}
          </label>
        <input
          id={id}
          // ref={ref}
          placeholder=" "
          type={type}
          className={className ? className : inputStyles.input}
          {...register(`${name}`)}
          {...props}
        />
        {errors[name!] && (
          <p className={inputStyles.error}>
            {`${errors[name!]?.message}`}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
