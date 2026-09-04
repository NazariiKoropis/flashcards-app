type Visibility = 'public' | 'private'

interface IDeck {
	id: string
	name: string
	tags: string[]
	description?: string
	visibility: Visibility
	cardCount: number
	createdAt: string
	updatedAt: string
}

export { type IDeck, type Visibility }
