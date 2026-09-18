import Button from '@components/ui/Button'
import ProgressBar from '@components/ui/ProgressBar'
import Container from '@layout/container'
import Card from '@shared/card/Card'
import clsx from 'clsx'
import {
	ArrowLeft,
	CheckCircle2,
	Clock,
	Layers,
	RotateCcw,
	Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './Training.module.scss'
import { useTraining } from './useTraining'

function Training() {
	const {
		deck,
		allCards,
		mode,
		setMode,
		dueCount,
		allCount,
		totalCardsInQueue,
		currentCard,
		currentCardIndex,
		isCompleted,
		progressPercent,
		handleNext,
		handlePrev,
		handleCompleteCard,
		handleRestart
	} = useTraining()


	if (!deck) {
		return (
			<div className={styles.trainingPage}>
				<Container>
					<div className={styles.emptyState}>
						<h2>Deck not found</h2>
						<p>Could not find the requested deck for training.</p>
						<Link
							to="/"
							className={styles.backLink}
						>
							<Button variant="primary">Return Home</Button>
						</Link>
					</div>
				</Container>
			</div>
		)
	}

	if (allCards.length === 0) {
		return (
			<div className={styles.trainingPage}>
				<Container>
					<div className={styles.emptyState}>
						<h2>No cards in this deck</h2>
						<p>Add some cards to "{deck.name}" to start training.</p>
						<Link
							to="/"
							className={styles.backLink}
						>
							<Button variant="primary">Return Home</Button>
						</Link>
					</div>
				</Container>
			</div>
		)
	}

	return (
		<div className={styles.trainingPage}>
			<Container>
				{/* Top Controls Bar */}
				<header className={styles.header}>
					<div className={styles.controlsBar}>
						<Link
							to="/"
							className={styles.backButton}
							aria-label="Back to home"
						>
							<ArrowLeft size={16} />
							<span>Back to Decks</span>
						</Link>

						{/* Mode Switcher Buttons with Live Counters */}
						<div
							className={styles.modeSwitcher}
							role="tablist"
							aria-label="Training Mode"
						>
							<button
								type="button"
								role="tab"
								aria-selected={mode === 'due'}
								className={clsx(styles.modeBtn, {
									[styles.active]: mode === 'due'
								})}
								onClick={() => setMode('due')}
							>
								<Clock size={15} />
								<span>Due for Review</span>
								<span className={styles.counterBadge}>{dueCount}</span>
							</button>

							<button
								type="button"
								role="tab"
								aria-selected={mode === 'all'}
								className={clsx(styles.modeBtn, {
									[styles.active]: mode === 'all'
								})}
								onClick={() => setMode('all')}
							>
								<Layers size={15} />
								<span>All Cards</span>
								<span className={styles.counterBadge}>{allCount}</span>
							</button>
						</div>
					</div>

					<div className={styles.headerMain}>
						<div className={styles.titleRow}>
							<h1 className={styles.deckTitle}>Training: {deck.name}</h1>
							{totalCardsInQueue > 0 && !isCompleted && (
								<div className={styles.progressBadge}>
									<span className={styles.progressText}>
										Card {currentCardIndex + 1} of {totalCardsInQueue}
									</span>
								</div>
							)}
						</div>

						<div className={styles.info}>
							{deck.tags && deck.tags.length > 0 && (
								<ul className={styles.tags}>
									{deck.tags.map(tag => (
										<li key={tag}>{tag}</li>
									))}
								</ul>
							)}
							{totalCardsInQueue > 0 && (
								<div className={styles.progressInfo}>
									<span>Progress: {progressPercent}%</span>
								</div>
							)}
						</div>
					</div>

					{totalCardsInQueue > 0 && <ProgressBar value={progressPercent} />}
				</header>

				{/* Training Content / Active Queue */}
				{isCompleted || !currentCard ? (
					<div className={styles.emptyState}>
						<div className={styles.emptyIconWrapper}>
							<CheckCircle2 size={44} className={styles.successIcon} />
						</div>
						<h2>All caught up for today!</h2>
						<p className={styles.emptyText}>
							All caught up for today! Come back tomorrow or switch to 'All Cards' mode
						</p>

						<div className={styles.emptyActions}>
							{mode === 'due' && allCount > 0 && (
								<Button
									variant="primary"
									onClick={() => setMode('all')}
								>
									<Sparkles size={16} />
									<span>Review All Cards ({allCount})</span>
								</Button>
							)}

							<Button
								variant="secondary"
								onClick={handleRestart}
							>
								<RotateCcw size={16} />
								<span>Restart Session</span>
							</Button>

							<Link
								to="/"
								className={styles.backLink}
							>
								<Button variant="outline">Back to Decks</Button>
							</Link>
						</div>
					</div>
				) : (
					<div className={styles.cardSection}>
						<Card
							key={currentCard.id}
							card={currentCard}
							deckName={deck.name}
							onCompleteCard={handleCompleteCard}
						/>

						<nav
							className={styles.navigation}
							aria-label="Card Navigation"
						>
							<Button
								variant="secondary"
								disabled={currentCardIndex === 0}
								onClick={handlePrev}
							>
								Previous
							</Button>

							<Button
								variant="secondary"
								disabled={currentCardIndex === totalCardsInQueue - 1}
								onClick={handleNext}
							>
								{currentCardIndex === totalCardsInQueue - 1
									? 'Last Card'
									: 'Next Card'}
							</Button>
						</nav>
					</div>
				)}
			</Container>
		</div>
	)
}

export default Training
