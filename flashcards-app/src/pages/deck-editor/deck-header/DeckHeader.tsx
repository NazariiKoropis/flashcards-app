import { ArrowLeft, FolderPlus, Layers, Sparkles } from 'lucide-react'
import styles from '../DeckEditor.module.scss'

interface DeckHeaderProps {
	isEditMode: boolean
	deckName?: string
	cardCount: number
	onBack: () => void
}

function DeckHeader({
	isEditMode,
	deckName,
	cardCount,
	onBack
}: DeckHeaderProps) {
	return (
		<header className={styles.header}>
			<button
				type="button"
				onClick={onBack}
				className={styles.backBtn}
				aria-label="Назад до списку"
			>
				<ArrowLeft size={18} />
				<span>Назад</span>
			</button>

			<div className={styles.titleGroup}>
				<div className={styles.badgeRow}>
					<span className={styles.modeBadge}>
						{isEditMode ? (
							<>
								<Sparkles size={12} /> Редагування
							</>
						) : (
							<>
								<FolderPlus size={12} /> Нова колода
							</>
						)}
					</span>
					{isEditMode && (
						<span className={styles.counterBadge}>
							<Layers size={12} /> {cardCount} карток
						</span>
					)}
				</div>
				<h1 className={styles.title}>
					{isEditMode ? deckName || 'Deck Editor' : 'Створення колоди'}
				</h1>
				<p className={styles.subtitle}>
					{isEditMode
						? 'Оновіть параметри колоди та керуйте списком карток для тренування.'
						: 'Задайте назву, теги та рівень видимості для вашої нової навчальної колоди.'}
				</p>
			</div>
		</header>
	)
}

export default DeckHeader
