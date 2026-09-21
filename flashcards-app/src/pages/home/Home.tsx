import Container from '@layout/container/Container'
import DeckCard from '@shared/deck-card/DeckCard'
import useStore from '@store/store'
import Button from '@ui/Button'
import { Layers, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'

function Home() {
	const navigate = useNavigate()
	const decks = useStore(state => state.decks)

	const handleCreateDeck = () => {
		navigate('deck/create')
	}

	return (
		<div className={styles.homePage}>
			<Container>
				<section className={styles.heroSection}>
					<div className={styles.titleArea}>
						<h1>Your Decks</h1>
						<p>Master your knowledge with active recall and flashcards</p>
					</div>
					<Button
						variant="primary"
						size="md"
						onClick={handleCreateDeck}
					>
						<Plus size={18} />
						<span>New Deck</span>
					</Button>
				</section>

				{decks.length === 0 ? (
					<div className={styles.emptyState}>
						<Layers
							size={48}
							color="#818cf8"
						/>
						<h3>No decks created yet</h3>
						<p>
							Start your learning journey by creating your first flashcard deck
							or exploring the catalog.
						</p>
					</div>
				) : (
					<ul className={styles.list}>
						{decks.map(deck => (
							<li key={deck.id}>
								<DeckCard deck={deck} />
							</li>
						))}
					</ul>
				)}
			</Container>
		</div>
	)
}

export default Home
