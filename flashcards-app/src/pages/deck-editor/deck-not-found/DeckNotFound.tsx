import Container from '@components/layout/container'
import Button from '@components/ui/Button'
import { ArrowLeft, Layers } from 'lucide-react'
import styles from '../DeckEditor.module.scss'

interface DeckNotFoundProps {
	onGoHome: () => void
}

function DeckNotFound({ onGoHome }: DeckNotFoundProps) {
	return (
		<Container>
			<div className={styles.notFoundCard}>
				<Layers
					size={48}
					className={styles.notFoundIcon}
				/>
				<h2>Колоду не знайдено</h2>
				<p>Можливо, колода була видалена або посилання некоректне.</p>
				<Button
					variant="primary"
					onClick={onGoHome}
				>
					<ArrowLeft size={16} />
					Повернутися на головну
				</Button>
			</div>
		</Container>
	)
}

export default DeckNotFound
