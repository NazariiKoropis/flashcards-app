import type { Difficulty, ICard } from '@app-types/card'
import Button from '@components/ui/Button'
import useStore from '@store/store'
import { getDifficultyClass } from '@utils/difficulty'
import { clsx } from 'clsx'
import { useState } from 'react'
import styles from './Card.module.scss'

interface CardProps {
	card: ICard
	deckName: string
	onCompleteCard?: () => void
}

function Card({ card, deckName, onCompleteCard }: CardProps) {
	const [prevCardId, setPrevCardId] = useState(card?.id)
	const [isAnswerShowed, setIsAnswerShowed] = useState(false)
	const updateCardDifficulty = useStore(state => state.updateCardDifficulty)

	if (card?.id !== prevCardId) {
		setPrevCardId(card?.id)
		setIsAnswerShowed(false)
	}

	if (!card) return null

	const handleShowAnswer = () => {
		setIsAnswerShowed(true)
	}

	const handleRate = (difficulty: Difficulty) => {
		updateCardDifficulty(card.id, difficulty)
		setIsAnswerShowed(false)
		onCompleteCard?.()
	}

	const cardClasses = clsx(
		styles.card,
		getDifficultyClass(styles, 'card', card.difficulty)
	)

	const badgeClasses = clsx(
		styles.position,
		getDifficultyClass(styles, 'position', card.difficulty)
	)

	const formatDate = (dateStr?: string) => {
		if (!dateStr) return '-'
		const date = new Date(dateStr)
		return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString()
	}

	return (
		<div className={cardClasses}>
			<header className={styles.header}>
				<div className={styles.info}>
					<div>
						<h3 className={styles.title}>Deck: {deckName}</h3>
					</div>
					<span className={badgeClasses}>{card.difficulty}</span>
				</div>
				<p className={styles.question}>{card.question}</p>
			</header>

			{/* Neon gradient divider */}
			<div
				className={clsx(styles.divider, {
					[styles.dividerActive]: isAnswerShowed
				})}
			/>

			{/* Animated answer section */}
			<div
				className={clsx(styles.answerWrapper, {
					[styles.visible]: isAnswerShowed
				})}
			>
				<div className={styles.answerInner}>
					<div
						className={clsx(
							styles.answerText,
							getDifficultyClass(styles, 'answerText', card.difficulty)
						)}
					>
						<span className={styles.answerLabel}>Answer:</span>
						<p>{card.answer}</p>
					</div>
				</div>
			</div>

			<footer className={styles.footer}>
				<div className={styles.dates}>
					<span>Created: {formatDate(card.createdAt)}</span>
					{card.nextReviewDate && (
						<span>Next Review: {formatDate(card.nextReviewDate)}</span>
					)}
				</div>

				<div className={styles.actions}>
					{!isAnswerShowed ? (
						<Button
							variant="primary"
							onClick={handleShowAnswer}
						>
							Show answer
						</Button>
					) : (
						<div className={styles.ratingGroup}>
							<button
								type="button"
								className={clsx(styles.ratingBtn, styles.btnHard)}
								onClick={() => handleRate('hard')}
							>
								Hard (+1d)
							</button>
							<button
								type="button"
								className={clsx(styles.ratingBtn, styles.btnMedium)}
								onClick={() => handleRate('medium')}
							>
								Medium (+3d)
							</button>
							<button
								type="button"
								className={clsx(styles.ratingBtn, styles.btnEasy)}
								onClick={() => handleRate('easy')}
							>
								Easy (+5d)
							</button>
						</div>
					)}
				</div>
			</footer>
		</div>
	)
}

export { Card }
export default Card

