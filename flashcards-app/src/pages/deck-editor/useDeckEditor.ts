import type { ICard } from '@app-types/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { deckFormSchema, type DeckFormValues } from '@schemas/deck-form.schema'
import useStore from '@store/store'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export function useDeckEditor() {
	const { id } = useParams<{ id: string }>()
	const isEditMode = Boolean(id)
	const navigate = useNavigate()

	const [isCardModalOpen, setIsCardModalOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState<ICard | null>(null)

	const deck = useStore(state =>
		id ? state.decks.find(d => d.id === id) : undefined
	)
	const cards = useStore(state => state.cards)
	const deckCards = useMemo(
		() => (id ? cards.filter(c => c.deckId === id) : []),
		[cards, id]
	)
	const createDeck = useStore(state => state.createDeck)
	const updateDeck = useStore(state => state.updateDeck)
	const deleteCard = useStore(state => state.deleteCard)

	const form = useForm<DeckFormValues>({
		resolver: zodResolver(deckFormSchema),
		defaultValues: {
			name: '',
			description: '',
			tags: [],
			visibility: 'private'
		}
	})

	const { reset } = form

	useEffect(() => {
		if (isEditMode && deck) {
			reset({
				name: deck.name,
				description: deck.description || '',
				tags: deck.tags || [],
				visibility: deck.visibility
			})
		}
	}, [isEditMode, deck, reset])

	const onSubmit = (data: DeckFormValues) => {
		if (isEditMode && id && deck) {
			updateDeck({
				...deck,
				name: data.name.trim(),
				description: data.description?.trim() || '',
				tags: data.tags,
				visibility: data.visibility,
				updatedAt: new Date().toISOString()
			})
			navigate('/')
		} else {
			const newDeckId = crypto.randomUUID()
			const now = new Date().toISOString()

			createDeck({
				id: newDeckId,
				name: data.name.trim(),
				description: data.description?.trim() || '',
				tags: data.tags,
				visibility: data.visibility,
				cardCount: 0,
				createdAt: now,
				updatedAt: now
			})

			navigate(`/decks/${newDeckId}/edit`)
		}
	}

	const handleOpenAddCard = () => {
		setSelectedCard(null)
		setIsCardModalOpen(true)
	}

	const handleOpenEditCard = (card: ICard) => {
		setSelectedCard(card)
		setIsCardModalOpen(true)
	}

	const handleCloseCardModal = () => {
		setIsCardModalOpen(false)
		setSelectedCard(null)
	}

	const handleDeleteCard = (cardId: string) => {
		deleteCard(cardId)
	}

	const handleBack = () => {
		navigate('/')
	}

	return {
		id,
		isEditMode,
		deck,
		deckCards,
		form,
		isCardModalOpen,
		selectedCard,
		onSubmit: form.handleSubmit(onSubmit),
		handleOpenAddCard,
		handleOpenEditCard,
		handleCloseCardModal,
		handleDeleteCard,
		handleBack
	}
}

export default useDeckEditor
