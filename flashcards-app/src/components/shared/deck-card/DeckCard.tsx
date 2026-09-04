import type { IDeck } from '@app-types/deck'
import Button from '@ui/Button'
import { Globe, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './DeckCard.module.scss'

function DeckCard({ deck }: { deck: IDeck }) {
	const navigate = useNavigate()

	return (
		<div
			className={styles.deck}
			onClick={() => navigate(`/training/${deck.id}`)}
		>
			<header className={styles.deckHeader}>
				<h3>{deck.name}</h3>
				<p>{deck.cardCount} cards</p>
			</header>

			<div className={styles.deckBody}>
				<p>{deck.description}</p>
				<div className={styles.tags}>
					{deck?.tags?.map(tag => (
						<span key={tag}>#{tag}</span>
					))}
				</div>
			</div>

			<footer className={styles.deckFooter}>
				<div className={styles.deckVisibility}>
					{deck.visibility === 'private' ? (
						<Lock size={16} />
					) : (
						<Globe size={16} />
					)}
					<span>{deck.visibility}</span>
				</div>
				<Button
					variant="primary"
					onClick={e => {
						e.stopPropagation()
						navigate(`/training/${deck.id}`)
					}}
				>
					Study now
				</Button>
			</footer>
		</div>
	)
}

export default DeckCard
