import clsx from 'clsx'
import {
	forwardRef,
	type InputHTMLAttributes,
	type ReactNode,
	useId
} from 'react'
import styles from './Input.module.scss'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/** Label text for the input */
	label?: string
	/** Error message to display below the input */
	error?: string
	/** Helper text displayed when there is no error */
	helperText?: string
	/** Icon or element rendered on the left side */
	leftIcon?: ReactNode
	/** Icon or element rendered on the right side */
	rightIcon?: ReactNode
	/** Callback when clicking on the right icon */
	onRightIconClick?: () => void
	/** Size of the input */
	size?: InputSize
	/** Makes the input container 100% width */
	fullWidth?: boolean
	/** Additional className for the root wrapper */
	wrapperClassName?: string
	/** Additional className for the input element */
	className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			label,
			error,
			helperText,
			leftIcon,
			rightIcon,
			onRightIconClick,
			size = 'md',
			fullWidth = true,
			disabled = false,
			required = false,
			wrapperClassName,
			className,
			...props
		},
		ref
	) => {
		const generatedId = useId()
		const inputId = id || generatedId
		const hasError = Boolean(error)

		return (
			<div
				className={clsx(
					styles.wrapper,
					{ [styles.fullWidth]: fullWidth },
					wrapperClassName
				)}
			>
				{label && (
					<label
						htmlFor={inputId}
						className={clsx(styles.label, { [styles.required]: required })}
					>
						{label}
					</label>
				)}

				<div
					className={clsx(
						styles.inputContainer,
						styles[size],
						{
							[styles.hasError]: hasError,
							[styles.disabled]: disabled
						}
					)}
				>
					{leftIcon && (
						<div className={clsx(styles.icon, styles.leftIcon)}>
							{leftIcon}
						</div>
					)}

					<input
						ref={ref}
						id={inputId}
						disabled={disabled}
						required={required}
						aria-invalid={hasError ? 'true' : 'false'}
						aria-describedby={
							error
								? `${inputId}-error`
								: helperText
									? `${inputId}-helper`
									: undefined
						}
						className={clsx(styles.input, className)}
						{...props}
					/>

					{rightIcon && (
						<div
							className={clsx(styles.icon, styles.rightIcon, {
								[styles.clickable]: Boolean(onRightIconClick)
							})}
							onClick={onRightIconClick}
						>
							{rightIcon}
						</div>
					)}
				</div>

				{error ? (
					<span id={`${inputId}-error`} className={styles.errorMessage}>
						{error}
					</span>
				) : helperText ? (
					<span id={`${inputId}-helper`} className={styles.helperText}>
						{helperText}
					</span>
				) : null}
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
