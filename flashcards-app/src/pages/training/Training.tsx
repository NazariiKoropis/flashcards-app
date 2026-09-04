import { useParams } from 'react-router-dom'

function Training() {
	const { id } = useParams()
	return (
		<section className="training">
			<h1>Training</h1>
			<p>Params: {id}</p>
		</section>
	)
}

export default Training
