import type { Difficulty, ICard } from '@app-types/card'
import type { IDeck } from '@app-types/deck'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const INTERVALS: Record<Difficulty, number> = {
	hard: 1, // +1 day
	medium: 3, // +3 days
	easy: 5 // +5 days
}

export const calculateNextReview = (difficulty: Difficulty): string => {
	const daysToAdd = INTERVALS[difficulty]
	const date = new Date()
	date.setDate(date.getDate() + daysToAdd)
	return date.toISOString()
}

interface StoreState {
	decks: IDeck[]
	cards: ICard[]
	getDeckById: (deckId: string) => IDeck | undefined
	updateCardDifficulty: (cardId: string, difficulty: Difficulty) => void
	getCardsByDeckId: (deckId: string) => ICard[]
	createDeck: (deck: IDeck) => boolean
	updateDeck: (deck: IDeck) => boolean
}

const useStore = create<StoreState>()(
	persist(
		(set, get) => ({
			decks: [],
			cards: [],

			getCardsByDeckId: (deckId: string) => {
				return get().cards.filter(card => card.deckId === deckId)
			},

			getDeckById: (deckId: string) => {
				return get().decks.find(deck => deck.id === deckId)
			},

			updateCardDifficulty: (cardId: string, difficulty: Difficulty) => {
				const nextReviewDate = calculateNextReview(difficulty)
				const updatedAt = new Date().toISOString()

				set(state => ({
					cards: state.cards.map(card =>
						card.id === cardId
							? {
									...card,
									difficulty,
									nextReviewDate,
									updatedAt
								}
							: card
					)
				}))
			},

			createDeck: (deck: IDeck) => {
				set(state => ({
					decks: [...state.decks, deck]
				}))
				return true
			},
			updateDeck: (updatedDeck: IDeck) => {
				set(state => ({
					decks: state.decks.map(deck =>
						deck.id === updatedDeck.id ? updatedDeck : deck
					)
				}))
				return true
			}
		}),
		{
			name: 'flashcards-storage'
		}
	)
)

export default useStore
