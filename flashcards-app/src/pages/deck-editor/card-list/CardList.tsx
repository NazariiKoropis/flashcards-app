import type { ICard } from '@app-types/card'
import clsx from 'clsx'
import { Pencil, Trash2 } from 'lucide-react'
import styles from '../DeckEditor.module.scss'

interface CardListProps {
	deckCards: ICard[]
	onEditCard?: (card: ICard) => void
	onDeleteCard?: (cardId: string) => void
}

function CardList({ deckCards, onEditCard, onDeleteCard }: CardListProps) {
	return (
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
						className={clsx(styles.cardDiff, styles[`diff_${card.difficulty}`])}
					>
						{card.difficulty}
					</span>

					{(onEditCard || onDeleteCard) && (
						<div className={styles.cardActions}>
							{onEditCard && (
								<button
									type="button"
									className={styles.cardActionBtn}
									onClick={() => onEditCard(card)}
									title="Редагувати картку"
									aria-label={`Редагувати картку #${idx + 1}`}
								>
									<Pencil size={14} />
								</button>
							)}
							{onDeleteCard && (
								<button
									type="button"
									className={clsx(styles.cardActionBtn, styles.danger)}
									onClick={() => onDeleteCard(card.id)}
									title="Видалити картку"
									aria-label={`Видалити картку #${idx + 1}`}
								>
									<Trash2 size={14} />
								</button>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default CardList
