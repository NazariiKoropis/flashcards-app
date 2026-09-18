import type { Difficulty } from '@app-types/card'

export const DIFFICULTY_COLORS = {
	easy: {
		color: 'var(--diff-easy)',
		bg: 'var(--diff-easy-bg)',
		border: 'var(--diff-easy-border)',
		hex: '#10b981'
	},
	medium: {
		color: 'var(--diff-medium)',
		bg: 'var(--diff-medium-bg)',
		border: 'var(--diff-medium-border)',
		hex: '#f59e0b'
	},
	hard: {
		color: 'var(--diff-hard)',
		bg: 'var(--diff-hard-bg)',
		border: 'var(--diff-hard-border)',
		hex: '#ef4444'
	}
} as const

/**
 * Returns capitalized difficulty suffix ('Easy', 'Medium', 'Hard')
 */
export function getDifficultySuffix(difficulty?: Difficulty): 'Easy' | 'Medium' | 'Hard' | '' {
	if (!difficulty) return ''
	switch (difficulty) {
		case 'easy':
			return 'Easy'
		case 'medium':
			return 'Medium'
		case 'hard':
			return 'Hard'
		default:
			return ''
	}
}

/**
 * Returns the CSS module class name for a given base class and difficulty.
 * Example: getDifficultyClass(styles, 'card', 'hard') => styles.cardHard
 */
export function getDifficultyClass(
	styles: Record<string, string>,
	baseClass: string,
	difficulty?: Difficulty
): string | undefined {
	const suffix = getDifficultySuffix(difficulty)
	return suffix ? styles[`${baseClass}${suffix}`] : undefined
}

/**
 * Returns the CSS color variable or hex for a given difficulty.
 */
export function getDifficultyColor(difficulty?: Difficulty): string {
	if (!difficulty || !(difficulty in DIFFICULTY_COLORS)) {
		return 'var(--text-accent)'
	}
	return DIFFICULTY_COLORS[difficulty].color
}
