import type { ICard } from '@app-types/card'
import { clsx } from 'clsx'
import { useState } from 'react'
import styles from './Card.module.scss'

interface CardProps {
	card: ICard
	deckName: string
}

function Card({ card, deckName }: CardProps) {
	const [isFlipped, setIsFlipped] = useState(false)

	const handleFlipCard = () => {
		setIsFlipped(!isFlipped)
	}

	const cardClasses = clsx(styles.card, {
		[styles.cardHard]: card.difficulty === 'hard',
		[styles.cardMedium]: card.difficulty === 'medium',
		[styles.cardEasy]: card.difficulty === 'easy'
	})

	return (
		<div
			className={cardClasses}
			onClick={handleFlipCard}
		>
			<header className={styles.header}>
				<h3 className={styles.title}>Deck: {deckName}</h3>
				<span className={styles.position}>{card.position}</span>
			</header>

			<div className={styles.content}>
				{isFlipped ? <p>{card.answer}</p> : <p>{card.question}</p>}
			</div>

			<footer className={styles.footer}>
				<span>Created: {new Date(card.createdAt).toLocaleDateString()}</span>
				<span>Updated: {new Date(card.updatedAt).toLocaleDateString()}</span>
			</footer>
		</div>
	)
}

export default Card
