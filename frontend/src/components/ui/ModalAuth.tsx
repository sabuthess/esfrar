export const ModalAuth = ({
	isOpen,
	onClose,
	children,
}: {
	isOpen: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
}) => {
	if (!isOpen) return null;

	return (
		<div onClick={onClose} className='fixed inset-0 bg-white/10  backdrop-blur-xs flex items-center justify-center z-[999] '>
			{/* container */}
			<div
				className=' bg-black p-10 rounded-lg  relative w-[500px]'
				onClick={(e) => e.stopPropagation()}
				>
				<button
					className='absolute text-xl top-3 right-3 text-gray-200  rounded-full h-10 w-10  '
					onClick={onClose}
					aria-label='Cerrar modal'>
					✕
				</button>
				{children}
			</div>
		</div>
	);
};
