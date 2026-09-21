import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import {
	ArrowLeft,
	FolderPlus,
	Globe,
	Layers,
	Lock,
	Save,
	Sparkles
} from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Container from '@components/layout/container'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import TagsInput from '@components/ui/TagsInput'
import { deckFormSchema, type DeckFormValues } from '@schemas/deck-form.schema'
import useStore from '@store/store'
import styles from './DeckEditor.module.scss'

function DeckEditor() {
	const { id } = useParams<{ id: string }>()
	const isEditMode = Boolean(id)
	const navigate = useNavigate()

	const deck = useStore(state =>
		id ? state.decks.find(d => d.id === id) : undefined
	)
	const cards = useStore(state => state.cards)
	const deckCards = useMemo(
		() => (id ? cards.filter(c => c.deckId === id) : []),
		[cards, id]
	)
	const createDeck = useStore(state => state.createDeck)
	const updateDeck = useStore(state => state.updateDeck)

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<DeckFormValues>({
		resolver: zodResolver(deckFormSchema),
		defaultValues: {
			name: '',
			description: '',
			tags: [],
			visibility: 'private'
		}
	})

	const currentVisibility = watch('visibility')

	useEffect(() => {
		if (isEditMode && deck) {
			reset({
				name: deck.name,
				description: deck.description || '',
				tags: deck.tags || [],
				visibility: deck.visibility
			})
		}
	}, [isEditMode, deck, reset])

	const onSubmit = (data: DeckFormValues) => {
		if (isEditMode && id && deck) {
			updateDeck({
				...deck,
				name: data.name.trim(),
				description: data.description?.trim() || '',
				tags: data.tags,
				visibility: data.visibility,
				updatedAt: new Date().toISOString()
			})
			navigate('/')
		} else {
			const newDeckId = crypto.randomUUID()
			const now = new Date().toISOString()

			createDeck({
				id: newDeckId,
				name: data.name.trim(),
				description: data.description?.trim() || '',
				tags: data.tags,
				visibility: data.visibility,
				cardCount: 0,
				createdAt: now,
				updatedAt: now
			})

			navigate(`/decks/${newDeckId}/edit`)
		}
	}

	if (isEditMode && !deck) {
		return (
			<Container>
				<div className={styles.notFoundCard}>
					<Layers
						size={48}
						className={styles.notFoundIcon}
					/>
					<h2>Колоду не знайдено</h2>
					<p>Можливо, колода була видалена або посилання некоректне.</p>
					<Button
						variant="primary"
						onClick={() => navigate('/')}
					>
						<ArrowLeft size={16} />
						Повернутися на головну
					</Button>
				</div>
			</Container>
		)
	}

	return (
		<Container>
			<div className={styles.pageWrapper}>
				<header className={styles.header}>
					<button
						type="button"
						onClick={() => navigate('/')}
						className={styles.backBtn}
						aria-label="Назад до списку"
					>
						<ArrowLeft size={18} />
						<span>Назад</span>
					</button>

					<div className={styles.titleGroup}>
						<div className={styles.badgeRow}>
							<span className={styles.modeBadge}>
								{isEditMode ? (
									<>
										<Sparkles size={12} /> Редагування
									</>
								) : (
									<>
										<FolderPlus size={12} /> Нова колода
									</>
								)}
							</span>
							{isEditMode && (
								<span className={styles.counterBadge}>
									<Layers size={12} /> {deckCards.length} карток
								</span>
							)}
						</div>
						<h1 className={styles.title}>
							{isEditMode ? deck?.name || 'Deck Editor' : 'Створення колоди'}
						</h1>
						<p className={styles.subtitle}>
							{isEditMode
								? 'Оновіть параметри колоди та керуйте списком карток для тренування.'
								: 'Задайте назву, теги та рівень видимості для вашої нової навчальної колоди.'}
						</p>
					</div>
				</header>

				<div className={styles.contentGrid}>
					<div className={styles.mainCard}>
						<form
							onSubmit={handleSubmit(onSubmit)}
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
									onClick={() => navigate('/')}
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

					{isEditMode && (
						<div className={styles.cardsSection}>
							<div className={styles.cardsHeader}>
								<div>
									<h2>Картки колоди</h2>
									<p className={styles.cardsSubtitle}>
										Всього карток: {deckCards.length}
									</p>
								</div>
								<Button
									size="sm"
									variant="outline"
								>
									+ Додати картку
								</Button>
							</div>

							{deckCards.length === 0 ? (
								<div className={styles.emptyCards}>
									<Layers
										size={36}
										className={styles.emptyCardsIcon}
									/>
									<p>У цій колоді ще немає карток.</p>
									<span className={styles.emptyCardsHint}>
										Додайте першу картку для запуску інтервального повторення!
									</span>
								</div>
							) : (
								<div className={styles.cardsList}>
									{deckCards.map((card, idx) => (
										<div
											key={card.id}
											className={styles.cardItem}
										>
											<span className={styles.cardIdx}>#{idx + 1}</span>
											<div className={styles.cardContent}>
												<div className={styles.cardQ}>{card.question}</div>
												<div className={styles.cardA}>{card.answer}</div>
											</div>
											<span
												className={clsx(
													styles.cardDiff,
													styles[`diff_${card.difficulty}`]
												)}
											>
												{card.difficulty}
											</span>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}

export default DeckEditor
