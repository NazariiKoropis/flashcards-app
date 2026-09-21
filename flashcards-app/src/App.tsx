import Layout from '@layout/Layout'
import Catalog from '@pages/catalog/Catalog'
import DeckEditor from '@pages/deck-editor'
import Home from '@pages/home'
import Training from '@pages/training'
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
				<Route
					path="training/:id"
					element={<Training />}
				/>
				<Route
					path="deck/:id/edit"
					element={<DeckEditor />}
				/>
				<Route
					path="deck/create"
					element={<DeckEditor />}
				/>
			</Route>
		</Routes>
	)
}

export default App
