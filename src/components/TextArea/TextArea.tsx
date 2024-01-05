import {forwardRef, useId} from "react";
import inputStyles from '../../sass/components/text-input.module.scss'
import {TextAreaProps} from "./types";
import {useFormContext} from "react-hook-form";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
	{className,
	placeholder,
	error,
	name,
	...props
	},
) => {
	const id = useId();
	const {
		register,
		formState: { errors },
	} = useFormContext()
	return (
		<div className={inputStyles['text-area__wrapper']}>
			<label htmlFor={id} className={inputStyles['text-area__label']}>
				{placeholder}
			</label>
			<textarea id={id} className={className ? className : inputStyles['text-area']}
				{...register(`${name}`)}
				{...props}
			/>
			{errors[name!] && (
				<p>
					{`${errors[name!]?.message}`}
				</p>
			)}
		</div>
	)
})
TextArea.displayName = 'TextArea'
export default TextArea