import Footer from '@layout/footer/Footer'
import Header from '@layout/header/Header'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'

function Layout() {
	return (
		<div className={styles.layout}>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default Layout
