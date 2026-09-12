import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Difficulty, ICard } from '../types/card'
import type { IDeck } from '../types/deck'

interface StoreState {
	decks: IDeck[]
	cards: ICard[]
	getDeckNameById: (deckId: string) => string
	updateCardDifficulty: (cardId: string, difficulty: Difficulty) => void
	getCardsByDeckId: (deckId: string) => ICard[]
}

const useStore = create<StoreState>()(
	persist(
		(set, get) => ({
			decks: [],
			cards: [],

			getCardsByDeckId: (deckId: string) => {
				return get().cards.filter(card => card.deckId === deckId)
			},

			getDeckNameById: (deckId: string) => {
				return get().decks.find(deck => deck.id === deckId)?.name
			},

			updateCardDifficulty: (cardId: string, difficulty: Difficulty) => {
				set(state => ({
					cards: state.cards.map(card =>
						card.id === cardId ? { ...card, difficulty } : card
					)
				}))
			}
		}),
		{
			name: 'flashcards-storage'
		}
	)
)

export default useStore
