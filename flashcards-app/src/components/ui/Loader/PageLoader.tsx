import Container from '@layout/container'
import Loader, { type LoaderProps } from './Loader'
import styles from './Loader.module.scss'

export type PageLoaderProps = Pick<LoaderProps, 'text' | 'size' | 'className'>

function PageLoader({
	text = 'Loading...',
	size = 'lg',
	className
}: PageLoaderProps) {
	return (
		<div className={styles.pageLoaderWrapper}>
			<Container>
				<div className={styles.pageLoaderCard}>
					<Loader
						size={size}
						text={text}
						className={className}
					/>
				</div>
			</Container>
		</div>
	)
}

export default PageLoader
