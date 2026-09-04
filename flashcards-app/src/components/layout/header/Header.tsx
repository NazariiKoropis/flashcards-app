import Container from '@layout/container/Container'
import { Search, User } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

function Header() {
	const [isAuth, setIsAuth] = useState(false)

	return (
		<header>
			<Container>
				<section className={styles.headerSection}>
					<div className={styles.logo}>
						<NavLink to="/">
							<h2>My Flashcards</h2>
						</NavLink>
						<nav className={styles.navLinks}>
							<NavLink to="/">Home</NavLink>
							<NavLink to="/catalog">Catalog</NavLink>
						</nav>
					</div>

					<div className={styles.search}>
						<input
							type="text"
							placeholder="Search..."
						/>
						<button type="button">
							<Search />
						</button>
					</div>

					<div className={styles.buttons}>
						<button type="button">+ Create</button>
						{!isAuth ? (
							<button type="button">Login</button>
						) : (
							<button type="button">
								<User />
							</button>
						)}
					</div>
				</section>
			</Container>
		</header>
	)
}

export default Header
