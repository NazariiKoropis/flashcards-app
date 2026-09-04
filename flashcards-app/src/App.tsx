import Layout from '@layout/Layout'
import Catalog from '@pages/catalog/Catalog'
import Home from '@pages/home'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout />}
			>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="catalog"
					element={<Catalog />}
				/>
			</Route>
		</Routes>
	)
}

export default App
