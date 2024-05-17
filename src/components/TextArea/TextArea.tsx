import {forwardRef, useId} from "react";
import inputStyles from '../../sass/components/text-input.module.scss'
import {TextAreaProps} from "./types";
import {useFormContext} from "react-hook-form";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
    {
        className,
        placeholder,
        error,
        name,
        ...props
    },
    ref
) => {
    const id = useId();
    const {
        register,
        formState: {errors},
    } = useFormContext()
    return (
        <div className={inputStyles['text-area__wrapper']}>
            <label htmlFor={id} className={inputStyles['text-area__label']}>
                {placeholder}
            </label>
            <textarea id={id} className={className ? className : inputStyles['text-area']}
            /*@ts-expect-error ref should be overwritten by hookform register function*/
                      ref={ref}
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
})
TextArea.displayName = 'TextArea'
export default TextArea