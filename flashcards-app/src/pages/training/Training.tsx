import Container from '@layout/container'
import Card from '@shared/card/Card'
import useStore from '@store/store'
import { useParams } from 'react-router-dom'

function Training() {
	const { id } = useParams()

	const { getCardsByDeckId, getDeckNameById } = useStore()

	const cards = getCardsByDeckId(id!)
	const deckName = getDeckNameById(id!)

	return (
		<div>
			<Container>
				<div>
					{' '}
					<h1>Training: {deckName}</h1>
					<p>Params: {id}</p>
				</div>
				<Card
					card={cards[0]}
					deckName={deckName}
				/>
			</Container>
		</div>
	)
}

export default Training
