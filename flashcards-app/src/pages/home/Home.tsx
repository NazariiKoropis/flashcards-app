import DeckCard from '@shared/deck-card/DeckCard'
import useStore from '@store/store'
import styles from './Home.module.scss'

function Home() {
	const decks = useStore(state => state.decks)

	return (
		<div>
			<ul className={styles.list}>
				{decks.map(deck => (
					<li key={deck.id}>
						<DeckCard deck={deck} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Home
