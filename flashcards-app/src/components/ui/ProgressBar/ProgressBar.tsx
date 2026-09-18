import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
import styles from './ProgressBar.module.scss'

export type ProgressBarSize = 'sm' | 'md' | 'lg'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
	value: number
	max?: number
	size?: ProgressBarSize
	className?: string
}

function ProgressBar({
	value,
	max = 100,
	size = 'md',
	className,
	...props
}: ProgressBarProps) {
	const clampedValue = Math.min(Math.max(value, 0), max)
	const percentage = max > 0 ? (clampedValue / max) * 100 : 0

	return (
		<div
			role="progressbar"
			aria-valuenow={clampedValue}
			aria-valuemin={0}
			aria-valuemax={max}
			className={clsx(styles.wrapper, styles[size], className)}
			{...props}
		>
			<div
				className={styles.bar}
				style={{ width: `${percentage}%` }}
			/>
		</div>
	)
}

export default ProgressBar
