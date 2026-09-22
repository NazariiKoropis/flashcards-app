import { z } from 'zod'

export const cardFormSchema = z.object({
	question: z
		.string()
		.trim()
		.min(2, 'Запитання має містити щонайменше 2 символи')
		.max(500, 'Запитання не повинно перевищувати 500 символів'),
	answer: z
		.string()
		.trim()
		.min(1, 'Відповідь обовʼязкова для заповнення')
		.max(1000, 'Відповідь не повинна перевищувати 1000 символів'),
	difficulty: z.enum(['easy', 'medium', 'hard'])
})

export type CardFormValues = z.infer<typeof cardFormSchema>
