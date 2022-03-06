type CenterProps = {
	children: JSX.Element;
};

const Center = ({ children }: CenterProps) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%'
			}}
		>
			{children}
		</div>
	);
};

export default Center;
