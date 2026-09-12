import Container from '@layout/container/Container'
import Button from '@ui/Button'
import { Plus, Search, Sparkles, User } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

interface NavLinkProps {
	label: string
	path: string
}

function Header() {
	const [isAuth, setIsAuth] = useState(false)

	const navLinks: NavLinkProps[] = [
		{
			label: 'Home',
			path: '/'
		},
		{
			label: 'Catalog',
			path: '/catalog'
		}
	]

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.headerSection}>
					<div className={styles.logo}>
						<Link to="/">
							<Sparkles
								size={20}
								color="#818cf8"
							/>
							<h2>Flashcards</h2>
						</Link>
						<nav className={styles.navLinks}>
							{navLinks.map(link => (
								<NavLink
									key={link.path}
									to={link.path}
									className={({ isActive }) => (isActive ? styles.active : '')}
								>
									{link.label}
								</NavLink>
							))}
						</nav>
					</div>

					<div className={styles.search}>
						<span className={styles.searchIcon}>
							<Search size={16} />
						</span>
						<input
							type="text"
							placeholder="Search decks, tags..."
						/>
					</div>

					<div className={styles.buttons}>
						<Button
							variant="primary"
							size="sm"
						>
							<Plus size={16} />
							<span>Create</span>
						</Button>
						{!isAuth ? (
							<Button
								variant="secondary"
								size="sm"
								onClick={() => setIsAuth(true)}
							>
								Login
							</Button>
						) : (
							<Button
								variant="icon"
								size="sm"
								onClick={() => setIsAuth(false)}
								title="Profile"
							>
								<User size={16} />
							</Button>
						)}
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header
