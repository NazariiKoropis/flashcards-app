import type { IDeck } from '@app-types/deck'
import styles from './DeckCard.module.scss'

function DeckCard({ deck }: { deck: IDeck }) {
	return (
		<div className={styles.deck}>
			<header className={styles.deckHeader}>
				<h3>{deck.name}</h3>
				<p>{deck.cardCount}</p>
			</header>

			<div className={styles.deckBody}>
				<p>{deck.description}</p>
			</div>

			<footer className={styles.deckFooter}>
				<div className={styles.tags}>
					{deck?.tags?.map(tag => (
						<span key={tag}>#{tag}</span>
					))}
				</div>
			</footer>
		</div>
	)
}

export default DeckCard
