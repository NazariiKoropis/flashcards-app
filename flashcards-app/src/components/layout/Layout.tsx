import Footer from '@layout/footer/Footer'
import Header from '@layout/header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Layout
