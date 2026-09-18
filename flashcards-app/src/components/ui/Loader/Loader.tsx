import clsx from 'clsx'
import { type HTMLAttributes } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'
import styles from './Loader.module.scss'

export type LoaderSize = 'sm' | 'md' | 'lg'

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
	size?: LoaderSize | number
	color?: string
	glassColor?: string
	text?: string
	fullScreen?: boolean
	visible?: boolean
	className?: string
}

const SIZE_MAP: Record<LoaderSize, number> = {
	sm: 44,
	md: 72,
	lg: 100
}

function Loader({
	size = 'md',
	color = '#818cf8',
	glassColor = '#c7d2fe',
	text,
	fullScreen = false,
	visible = true,
	className,
	...props
}: LoaderProps) {
	if (!visible) return null

	const dimension = typeof size === 'number' ? size : SIZE_MAP[size] || 72

	return (
		<div
			className={clsx(
				styles.loaderContainer,
				{
					[styles.fullScreen]: fullScreen
				},
				className
			)}
			role="status"
			aria-live="polite"
			{...props}
		>
			<MagnifyingGlass
				visible={visible}
				height={String(dimension)}
				width={String(dimension)}
				ariaLabel="loading-magnifying-glass"
				wrapperClass="magnifying-glass-wrapper"
				glassColor={glassColor}
				color={color}
			/>
			{text && <span className={styles.loaderText}>{text}</span>}
		</div>
	)
}

export default Loader
