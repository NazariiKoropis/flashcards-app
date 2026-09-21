import clsx from 'clsx'
import { Plus, X } from 'lucide-react'
import {
	type ChangeEvent,
	type KeyboardEvent,
	type MouseEvent,
	useId,
	useState
} from 'react'
import styles from './TagsInput.module.scss'

export interface TagsInputProps {
	label?: string
	tags: string[]
	onChange: (tags: string[]) => void
	placeholder?: string
	maxTags?: number
	error?: string
	disabled?: boolean
	className?: string
}

export function TagsInput({
	label,
	tags = [],
	onChange,
	placeholder = 'Введіть тег (Enter або кома)...',
	maxTags,
	error,
	disabled = false,
	className
}: TagsInputProps) {
	const [inputValue, setInputValue] = useState('')
	const generatedId = useId()
	const inputId = `tags-input-${generatedId}`
	const isLimitReached = Boolean(maxTags && tags.length >= maxTags)
	const trimmedValue = inputValue.trim()
	const canAdd = trimmedValue.length > 0 && !isLimitReached && !disabled

	const addTag = (rawTag: string) => {
		const cleanTag = rawTag.trim().replace(/^#+/, '')

		if (!cleanTag) return
		if (isLimitReached) return
		if (tags.some(t => t.toLowerCase() === cleanTag.toLowerCase())) {
			setInputValue('')
			return
		}

		onChange([...tags, cleanTag])
		setInputValue('')
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return

		if (e.key === 'Enter') {
			e.preventDefault()
			if (canAdd) {
				addTag(inputValue)
			}
		} else if (e.key === ',') {
			e.preventDefault()
			if (canAdd) {
				addTag(inputValue)
			}
		} else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
			// Опціонально: видалення останнього тегу при Backspace в порожньому інпуті
			onChange(tags.slice(0, -1))
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		if (val.includes(',')) {
			const parts = val.split(',')
			const tagToAdd = parts[0]
			addTag(tagToAdd)
			setInputValue(parts.slice(1).join(''))
		} else {
			setInputValue(val)
		}
	}

	const handleAddClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (canAdd) {
			addTag(inputValue)
		}
	}

	const handleRemoveTag = (tagToRemove: string) => {
		if (disabled) return
		onChange(tags.filter(t => t !== tagToRemove))
	}

	return (
		<div className={clsx(styles.container, className)}>
			{label && (
				<div className={styles.labelHeader}>
					<label htmlFor={inputId} className={styles.label}>
						{label}
					</label>
					{maxTags && (
						<span className={styles.counter}>
							{tags.length}/{maxTags}
						</span>
					)}
				</div>
			)}

			{/* Плашка з бейджами доданих тегів */}
			{tags.length > 0 && (
				<div className={styles.tagsPlate}>
					{tags.map(tag => (
						<span key={tag} className={styles.tagBadge}>
							<span className={styles.tagText}>#{tag}</span>
							<button
								type="button"
								onClick={() => handleRemoveTag(tag)}
								className={styles.removeBtn}
								disabled={disabled}
								aria-label={`Видалити тег ${tag}`}
							>
								<X size={13} className={styles.removeIcon} />
							</button>
						</span>
					))}
				</div>
			)}

			{/* Контейнер інпуту та кнопки "Додати" */}
			<div
				className={clsx(styles.inputWrapper, {
					[styles.hasError]: Boolean(error),
					[styles.disabled]: disabled || isLimitReached
				})}
			>
				<input
					id={inputId}
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={
						isLimitReached
							? `Досягнуто ліміту (${maxTags} тегів)`
							: placeholder
					}
					disabled={disabled || isLimitReached}
					className={styles.input}
				/>

				{canAdd && (
					<button
						type="button"
						onClick={handleAddClick}
						className={styles.addBtn}
						aria-label="Додати тег"
					>
						<Plus size={14} />
						<span>Додати</span>
					</button>
				)}
			</div>

			{error && <span className={styles.errorMessage}>{error}</span>}
		</div>
	)
}

export default TagsInput
