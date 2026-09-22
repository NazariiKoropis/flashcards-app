import type { ICard } from '@app-types/card'
import type { IDeck } from '@app-types/deck'
import Button from '@components/ui/Button'
import { Layers } from 'lucide-react'
import CardEditModal from '../card-edit-modal'
import CardList from '../card-list'
import styles from '../DeckEditor.module.scss'

interface DeckCardsSectionProps {
	deck: IDeck
	deckCards: ICard[]
	isCardModalOpen: boolean
	selectedCard: ICard | null
	onOpenAddCard: () => void
	onOpenEditCard: (card: ICard) => void
	onCloseCardModal: () => void
	onDeleteCard: (cardId: string) => void
}

function DeckCardsSection({
	deck,
	deckCards,
	isCardModalOpen,
	selectedCard,
	onOpenAddCard,
	onOpenEditCard,
	onCloseCardModal,
	onDeleteCard
}: DeckCardsSectionProps) {
	return (
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
					onClick={onOpenAddCard}
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
					<Button
						size="sm"
						variant="primary"
						onClick={onOpenAddCard}
						style={{ marginTop: '8px' }}
					>
						+ Створити картку
					</Button>
				</div>
			) : (
				<CardList
					deckCards={deckCards}
					onEditCard={onOpenEditCard}
					onDeleteCard={onDeleteCard}
				/>
			)}

			<CardEditModal
				isOpen={isCardModalOpen}
				onClose={onCloseCardModal}
				card={selectedCard}
				deck={deck}
			/>
		</div>
	)
}

export default DeckCardsSection
