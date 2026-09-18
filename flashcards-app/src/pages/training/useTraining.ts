import type { ICard } from '@app-types/card'
import type { IDeck } from '@app-types/deck'
import useStore from '@store/store'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

export type TrainingMode = 'due' | 'all'

const isCardDue = (card: ICard, referenceTimestamp: number): boolean => {
	if (!card.nextReviewDate) return true
	const reviewTime = new Date(card.nextReviewDate).getTime()
	return isNaN(reviewTime) || reviewTime <= referenceTimestamp
}

export function useTraining() {
	const { id } = useParams<{ id: string }>()
	const [mode, setMode] = useState<TrainingMode>('due')
	const [currentCardIndex, setCurrentCardIndex] = useState(0)
	const [sessionTimestamp, setSessionTimestamp] = useState(() => Date.now())

	const [prevDeckId, setPrevDeckId] = useState(id)
	const [prevMode, setPrevMode] = useState(mode)

	// Adjust index during render on deck or mode change
	if (id !== prevDeckId) {
		setPrevDeckId(id)
		setCurrentCardIndex(0)
	}

	if (mode !== prevMode) {
		setPrevMode(mode)
		setCurrentCardIndex(0)
	}

	const decks = useStore(state => state.decks)
	const cards = useStore(state => state.cards)

	const deck: IDeck | undefined = useMemo(() => {
		return decks.find(d => d.id === id)
	}, [decks, id])

	// All cards for this deck
	const allCards: ICard[] = useMemo(() => {
		return id ? cards.filter(card => card.deckId === id) : []
	}, [cards, id])

	// Due cards filtered and sorted ascending by nextReviewDate (oldest / most urgent first)
	const dueCards: ICard[] = useMemo(() => {
		return allCards
			.filter(card => isCardDue(card, sessionTimestamp))
			.sort((a, b) => {
				const timeA = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0
				const timeB = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0
				return (isNaN(timeA) ? 0 : timeA) - (isNaN(timeB) ? 0 : timeB)
			})
	}, [allCards, sessionTimestamp])

	const activeCards = mode === 'due' ? dueCards : allCards
	const totalCardsInQueue = activeCards.length

	// Ensure boundary check during render
	const safeIndex = totalCardsInQueue > 0 ? Math.min(currentCardIndex, totalCardsInQueue - 1) : 0
	const currentCard = activeCards[safeIndex]
	const isCompleted = totalCardsInQueue === 0 || currentCardIndex >= totalCardsInQueue

	const handleNext = () => {
		if (currentCardIndex < totalCardsInQueue - 1) {
			setCurrentCardIndex(prev => prev + 1)
		}
	}

	const handlePrev = () => {
		if (currentCardIndex > 0) {
			setCurrentCardIndex(prev => prev - 1)
		}
	}

	const handleCompleteCard = () => {
		if (mode === 'all') {
			setCurrentCardIndex(prev => prev + 1)
		} else {
			// In due mode, the rated card leaves the due list upon store update
			if (currentCardIndex >= dueCards.length - 1 && dueCards.length > 0) {
				setCurrentCardIndex(Math.max(0, dueCards.length - 2))
			}
		}
	}

	const handleRestart = () => {
		setCurrentCardIndex(0)
		setSessionTimestamp(Date.now())
	}

	const handleSwitchMode = (newMode: TrainingMode) => {
		if (newMode === mode) return
		setMode(newMode)
		setCurrentCardIndex(0)
	}

	const progressPercent = totalCardsInQueue > 0
		? Math.min(100, Math.round(((safeIndex + 1) / totalCardsInQueue) * 100))
		: 100

	return {
		id,
		deck,
		mode,
		setMode: handleSwitchMode,
		allCards,
		dueCards,
		dueCount: dueCards.length,
		allCount: allCards.length,
		totalCardsInQueue,
		currentCard,
		currentCardIndex: safeIndex,
		isCompleted,
		progressPercent,
		handleNext,
		handlePrev,
		handleCompleteCard,
		handleRestart
	}
}

export default useTraining
