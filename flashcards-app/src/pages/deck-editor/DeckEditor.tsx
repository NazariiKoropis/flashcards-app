import Container from '@components/layout/container'
import DeckCardsSection from './deck-cards'
import styles from './DeckEditor.module.scss'
import DeckForm from './deck-form'
import DeckHeader from './deck-header'
import DeckNotFound from './deck-not-found'
import useDeckEditor from './useDeckEditor'

function DeckEditor() {
	const {
		isEditMode,
		deck,
		deckCards,
		form,
		isCardModalOpen,
		selectedCard,
		onSubmit,
		handleOpenAddCard,
		handleOpenEditCard,
		handleCloseCardModal,
		handleDeleteCard,
		handleBack
	} = useDeckEditor()

	if (isEditMode && !deck) {
		return <DeckNotFound onGoHome={handleBack} />
	}

	return (
		<Container>
			<div className={styles.pageWrapper}>
				<DeckHeader
					isEditMode={isEditMode}
					deckName={deck?.name}
					cardCount={deckCards.length}
					onBack={handleBack}
				/>

				<div className={styles.contentGrid}>
					<DeckForm
						form={form}
						isEditMode={isEditMode}
						onSubmit={onSubmit}
						onCancel={handleBack}
					/>

					{isEditMode && deck && (
						<DeckCardsSection
							deck={deck}
							deckCards={deckCards}
							isCardModalOpen={isCardModalOpen}
							selectedCard={selectedCard}
							onOpenAddCard={handleOpenAddCard}
							onOpenEditCard={handleOpenEditCard}
							onCloseCardModal={handleCloseCardModal}
							onDeleteCard={handleDeleteCard}
						/>
					)}
				</div>
			</div>
		</Container>
	)
}

export default DeckEditor
