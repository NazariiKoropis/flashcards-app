type Difficulty = 'easy' | 'medium' | 'hard'

interface ICard {
	id: string
	deckId: string
	question: string
	answer: string
	difficulty: Difficulty
	createdAt: string
	updatedAt: string
	nextReviewDate: string
}

export type { Difficulty, ICard }
