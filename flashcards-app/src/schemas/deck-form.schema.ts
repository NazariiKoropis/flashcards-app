import { z } from 'zod'

export const deckFormSchema = z.object({
	name: z
		.string()
		.min(3, 'Deck name must be at least 3 characters long')
		.max(50, 'Deck name must be less than 50 characters'),
	description: z
		.string()
		.trim()
		.min(10, 'Description must be at least 10 characters long')
		.optional()
		.or(z.literal('')),
	tags: z.array(z.string()),
	visibility: z.enum(['public', 'private'])
})

export type DeckFormValues = z.infer<typeof deckFormSchema>
