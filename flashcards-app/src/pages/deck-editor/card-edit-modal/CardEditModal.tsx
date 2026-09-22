import type { Difficulty, ICard } from '@app-types/card'
import type { IDeck } from '@app-types/deck'
import Button from '@components/ui/Button'
import Modal from '@components/ui/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardFormSchema, type CardFormValues } from '@schemas/card-form.schema'
import useStore, { calculateNextReview } from '@store/store'
import clsx from 'clsx'
import { Plus, Save } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './CardEditModal.module.scss'

interface CardEditModalProps {
	isOpen: boolean
	onClose: () => void
	card?: ICard | null
	deck: IDeck
}

const DIFFICULTY_OPTIONS: {
	value: Difficulty
	label: string
	interval: string
}[] = [
	{ value: 'easy', label: 'Easy', interval: '+5 днів' },
	{ value: 'medium', label: 'Medium', interval: '+3 дні' },
	{ value: 'hard', label: 'Hard', interval: '+1 день' }
]

function CardEditModal({ isOpen, onClose, card, deck }: CardEditModalProps) {
	const isEdit = Boolean(card)
	const createCard = useStore(state => state.createCard)
	const updateCard = useStore(state => state.updateCard)
	const cards = useStore(state => state.cards)

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<CardFormValues>({
		resolver: zodResolver(cardFormSchema),
		defaultValues: {
			question: '',
			answer: '',
			difficulty: 'medium'
		}
	})

	const questionValue = watch('question') || ''
	const answerValue = watch('answer') || ''

	useEffect(() => {
		if (isOpen) {
			if (card) {
				reset({
					question: card.question,
					answer: card.answer,
					difficulty: card.difficulty
				})
			} else {
				reset({
					question: '',
					answer: '',
					difficulty: 'medium'
				})
			}
		}
	}, [isOpen, card, reset])

	const onSubmit = (data: CardFormValues) => {
		const now = new Date().toISOString()

		if (isEdit && card) {
			const difficultyChanged = card.difficulty !== data.difficulty
			const nextReviewDate = difficultyChanged
				? calculateNextReview(data.difficulty)
				: card.nextReviewDate

			updateCard({
				...card,
				question: data.question.trim(),
				answer: data.answer.trim(),
				difficulty: data.difficulty,
				updatedAt: now,
				nextReviewDate
			})
		} else {
			const deckCards = cards.filter(c => c.deckId === deck.id)
			const newCard: ICard = {
				id: crypto.randomUUID(),
				deckId: deck.id,
				position: deckCards.length + 1,
				question: data.question.trim(),
				answer: data.answer.trim(),
				difficulty: data.difficulty,
				createdAt: now,
				updatedAt: now,
				nextReviewDate: calculateNextReview(data.difficulty)
			}
			createCard(newCard)
		}

		onClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={isEdit ? 'Редагування картки' : 'Нова картка'}
			description={
				isEdit
					? 'Оновіть запитання, відповідь або складність картки.'
					: `Додавання нової картки до колоди «${deck.name}».`
			}
			size="md"
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
			>
				<div className={styles.field}>
					<div className={styles.fieldHeader}>
						<label
							htmlFor="question"
							className={styles.fieldLabel}
						>
							Запитання (лицьова сторона) *
						</label>
						<span className={styles.charCount}>{questionValue.length}/500</span>
					</div>
					<textarea
						id="question"
						rows={3}
						{...register('question')}
						placeholder="Введіть формулювання запитання або термін..."
						className={clsx(styles.textarea, {
							[styles.textareaError]: Boolean(errors.question)
						})}
					/>
					{errors.question && (
						<span className={styles.fieldError}>{errors.question.message}</span>
					)}
				</div>

				<div className={styles.field}>
					<div className={styles.fieldHeader}>
						<label
							htmlFor="answer"
							className={styles.fieldLabel}
						>
							Відповідь (зворотна сторона) *
						</label>
						<span className={styles.charCount}>{answerValue.length}/1000</span>
					</div>
					<textarea
						id="answer"
						rows={4}
						{...register('answer')}
						placeholder="Введіть правильну відповідь або пояснення..."
						className={clsx(styles.textarea, {
							[styles.textareaError]: Boolean(errors.answer)
						})}
					/>
					{errors.answer && (
						<span className={styles.fieldError}>{errors.answer.message}</span>
					)}
				</div>

				<div className={styles.field}>
					<label className={styles.fieldLabel}>Початкова складність</label>
					<Controller
						name="difficulty"
						control={control}
						render={({ field }) => (
							<div className={styles.difficultyGrid}>
								{DIFFICULTY_OPTIONS.map(opt => {
									const isSelected = field.value === opt.value
									return (
										<button
											key={opt.value}
											type="button"
											className={clsx(styles.diffButton, {
												[styles[`active_${opt.value}`]]: isSelected
											})}
											onClick={() => field.onChange(opt.value)}
										>
											<span className={styles.diffName}>{opt.label}</span>
											<span className={styles.diffInterval}>
												{opt.interval}
											</span>
										</button>
									)
								})}
							</div>
						)}
					/>
					{errors.difficulty && (
						<span className={styles.fieldError}>
							{errors.difficulty.message}
						</span>
					)}
				</div>

				<div className={styles.actions}>
					<Button
						type="button"
						variant="secondary"
						onClick={onClose}
					>
						Скасувати
					</Button>
					<Button
						type="submit"
						variant="primary"
						disabled={isSubmitting}
					>
						{isEdit ? (
							<>
								<Save size={16} /> Зберегти
							</>
						) : (
							<>
								<Plus size={16} /> Додати картку
							</>
						)}
					</Button>
				</div>
			</form>
		</Modal>
	)
}

export default CardEditModal
