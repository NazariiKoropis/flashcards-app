import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import TagsInput from '@components/ui/TagsInput'
import type { DeckFormValues } from '@schemas/deck-form.schema'
import clsx from 'clsx'
import { FolderPlus, Globe, Lock, Save } from 'lucide-react'
import type { BaseSyntheticEvent } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import styles from '../DeckEditor.module.scss'

interface DeckFormProps {
	form: UseFormReturn<DeckFormValues>
	isEditMode: boolean
	onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
	onCancel: () => void
}

function DeckForm({ form, isEditMode, onSubmit, onCancel }: DeckFormProps) {
	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors, isSubmitting, isDirty }
	} = form

	const currentVisibility = watch('visibility')

	return (
		<div className={styles.mainCard}>
			<form
				onSubmit={onSubmit}
				className={styles.form}
			>
				<Input
					label="Назва колоди *"
					{...register('name')}
					error={errors.name?.message}
					placeholder="напр. V8 Engine & Memory Management"
					helperText="Від 3 до 50 символів"
				/>

				<div className={styles.field}>
					<label
						htmlFor="description"
						className={styles.fieldLabel}
					>
						Опис (опціонально)
					</label>
					<textarea
						id="description"
						rows={3}
						{...register('description')}
						placeholder="Короткий опис тем, які розглядаються в цій колоді..."
						className={clsx(styles.textarea, {
							[styles.textareaError]: Boolean(errors.description)
						})}
					/>
					{errors.description ? (
						<span className={styles.fieldError}>
							{errors.description.message}
						</span>
					) : (
						<span className={styles.fieldHint}>
							Мінімум 10 символів, якщо заповнено
						</span>
					)}
				</div>

				<Controller
					name="tags"
					control={control}
					render={({ field, fieldState }) => (
						<TagsInput
							label="Теги колоди"
							tags={field.value || []}
							onChange={field.onChange}
							error={fieldState.error?.message}
							maxTags={10}
							placeholder="Введіть назву тегу (Enter або кома)..."
						/>
					)}
				/>

				<div className={styles.field}>
					<label className={styles.fieldLabel}>Видимість колоди</label>
					<div className={styles.visibilityOptions}>
						<button
							type="button"
							className={clsx(styles.visibilityCard, {
								[styles.active]: currentVisibility === 'private'
							})}
							onClick={() =>
								setValue('visibility', 'private', { shouldDirty: true })
							}
						>
							<div className={styles.visibilityIcon}>
								<Lock size={18} />
							</div>
							<div className={styles.visibilityText}>
								<span className={styles.visibilityTitle}>Private</span>
								<span className={styles.visibilityDesc}>
									Тільки для вашого особистого навчання
								</span>
							</div>
						</button>

						<button
							type="button"
							className={clsx(styles.visibilityCard, {
								[styles.active]: currentVisibility === 'public'
							})}
							onClick={() =>
								setValue('visibility', 'public', { shouldDirty: true })
							}
						>
							<div className={styles.visibilityIcon}>
								<Globe size={18} />
							</div>
							<div className={styles.visibilityText}>
								<span className={styles.visibilityTitle}>Public</span>
								<span className={styles.visibilityDesc}>
									Доступна всім користувачам у каталозі
								</span>
							</div>
						</button>
					</div>
					{errors.visibility && (
						<span className={styles.fieldError}>
							{errors.visibility.message}
						</span>
					)}
				</div>

				<div className={styles.actions}>
					<Button
						type="button"
						variant="secondary"
						onClick={onCancel}
					>
						Скасувати
					</Button>

					<Button
						type="submit"
						variant="primary"
						disabled={isSubmitting || (isEditMode && !isDirty)}
					>
						{isSubmitting ? (
							'Збереження...'
						) : isEditMode ? (
							<>
								<Save size={16} /> Зберегти зміни
							</>
						) : (
							<>
								<FolderPlus size={16} /> Створити та додати картки
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default DeckForm
