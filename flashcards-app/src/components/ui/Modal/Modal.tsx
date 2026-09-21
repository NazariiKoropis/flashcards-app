import clsx from 'clsx'
import { X } from 'lucide-react'
import {
	type HTMLAttributes,
	type MouseEvent as ReactMouseEvent,
	type ReactNode,
	useEffect,
	useId,
	useRef
} from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
	/** Controls whether the modal is visible */
	isOpen: boolean
	/** Callback fired when the modal should close */
	onClose: () => void
	/** Modal header title */
	title?: ReactNode
	/** Modal subtitle / description */
	description?: ReactNode
	/** Modal body content */
	children?: ReactNode
	/** Modal footer actions / content */
	footer?: ReactNode
	/** Size preset of the modal dialog */
	size?: ModalSize
	/** Whether to display the close (X) button in header */
	showCloseButton?: boolean
	/** Close the modal when clicking on the backdrop overlay */
	closeOnOverlayClick?: boolean
	/** Close the modal when pressing the Escape key */
	closeOnEsc?: boolean
	/** Additional class name for modal dialog */
	className?: string
	/** Additional class name for overlay */
	overlayClassName?: string
	/** Additional class name for body content */
	contentClassName?: string
	/** Custom container element for React Portal */
	portalContainer?: HTMLElement | null
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	className?: string
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	className?: string
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	className?: string
}

function Modal({
	isOpen,
	onClose,
	title,
	description,
	children,
	footer,
	size = 'md',
	showCloseButton = true,
	closeOnOverlayClick = true,
	closeOnEsc = true,
	className,
	overlayClassName,
	contentClassName,
	portalContainer
}: ModalProps) {
	const titleId = useId()
	const descriptionId = useId()
	const modalRef = useRef<HTMLDivElement>(null)

	// Lock document body scroll when modal is open
	useEffect(() => {
		if (!isOpen) return

		const originalOverflow = document.body.style.overflow
		const originalPaddingRight = document.body.style.paddingRight
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth

		document.body.style.overflow = 'hidden'
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`
		}

		return () => {
			document.body.style.overflow = originalOverflow
			document.body.style.paddingRight = originalPaddingRight
		}
	}, [isOpen])

	// Handle ESC keyboard key
	useEffect(() => {
		if (!isOpen || !closeOnEsc) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.stopPropagation()
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, closeOnEsc, onClose])

	// Handle backdrop click
	const handleOverlayClick = (e: ReactMouseEvent<HTMLDivElement>) => {
		if (closeOnOverlayClick && e.target === e.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	const modalContent = (
		<div className={styles.portal}>
			<div
				className={clsx(styles.overlay, overlayClassName)}
				onClick={handleOverlayClick}
				aria-hidden="true"
			/>
			<div
				className={styles.container}
				onClick={handleOverlayClick}
			>
				<div
					ref={modalRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby={title ? titleId : undefined}
					aria-describedby={description ? descriptionId : undefined}
					tabIndex={-1}
					className={clsx(styles.dialog, styles[size], className)}
					onClick={e => e.stopPropagation()}
				>
					{(title || description || showCloseButton) && (
						<div className={styles.header}>
							<div className={styles.headerContent}>
								{title && (
									<h2 id={titleId} className={styles.title}>
										{title}
									</h2>
								)}
								{description && (
									<p id={descriptionId} className={styles.description}>
										{description}
									</p>
								)}
							</div>
							{showCloseButton && (
								<button
									type="button"
									className={styles.closeButton}
									onClick={onClose}
									aria-label="Закрити модальне вікно"
								>
									<X size={20} />
								</button>
							)}
						</div>
					)}

					<div className={clsx(styles.content, contentClassName)}>
						{children}
					</div>

					{footer && <div className={styles.footer}>{footer}</div>}
				</div>
			</div>
		</div>
	)

	const targetContainer =
		portalContainer ?? (typeof document !== 'undefined' ? document.body : null)

	if (!targetContainer) return null

	return createPortal(modalContent, targetContainer)
}

// Compound components for advanced custom layouts
function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
	return (
		<div className={clsx(styles.header, className)} {...props}>
			{children}
		</div>
	)
}

function ModalBody({ children, className, ...props }: ModalBodyProps) {
	return (
		<div className={clsx(styles.content, className)} {...props}>
			{children}
		</div>
	)
}

function ModalFooter({ children, className, ...props }: ModalFooterProps) {
	return (
		<div className={clsx(styles.footer, className)} {...props}>
			{children}
		</div>
	)
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
