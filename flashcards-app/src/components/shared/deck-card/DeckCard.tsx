import type { IDeck } from '@app-types/deck'
import Button from '@ui/Button/Button'
import { Globe, Lock } from 'lucide-react'
import type React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DeckCard.module.scss'

interface DeckCardProps {
	deck: IDeck
}

function DeckCard({ deck }: DeckCardProps) {
	const navigate = useNavigate()

	const handleNavigate = (e: React.MouseEvent) => {
		e.stopPropagation()
		navigate(`/training/${deck.id}`)
	}

	return (
		<div
			className={styles.deck}
			onClick={handleNavigate}
		>
			<header className={styles.deckHeader}>
				<h3>{deck.name}</h3>
				<p>{deck.cardCount} cards</p>
			</header>

			<div className={styles.deckBody}>
				<p>{deck.description || 'No description provided'}</p>
				<div className={styles.tags}>
					{deck?.tags?.map(tag => (
						<span key={tag}>#{tag}</span>
					))}
				</div>
			</div>

			<footer className={styles.deckFooter}>
				<div className={styles.deckVisibility}>
					{deck.visibility === 'private' ? (
						<Lock size={14} />
					) : (
						<Globe size={14} />
					)}
					<span>{deck.visibility}</span>
				</div>
				<Button
					variant="primary"
					size="sm"
					onClick={handleNavigate}
				>
					Study now
				</Button>
			</footer>
		</div>
	)
}

export default DeckCard
