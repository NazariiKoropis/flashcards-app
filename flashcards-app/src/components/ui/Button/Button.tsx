import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'inverted'
	| 'danger'
	| 'icon'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant?: ButtonVariant
	size?: ButtonSize
	className?: string
}

function Button({
	children,
	className,
	variant = 'primary',
	size = 'md',
	type = 'button',
	disabled = false,
	...props
}: ButtonProps) {
	const classnames = clsx(
		styles.button,
		styles[variant],
		styles[size],
		{ [styles.disabled]: disabled },
		className
	)

	return (
		<button
			type={type}
			disabled={disabled}
			className={classnames}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
