import Container from '@layout/container/Container'
import styles from './Footer.module.scss'

function Footer() {
	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.footerContent}>
					<p>© {new Date().getFullYear()} Flashcards App. All rights reserved.</p>
					<div className={styles.links}>
						<a href="#privacy">Privacy</a>
						<a href="#terms">Terms</a>
						<a href="#github">GitHub</a>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
