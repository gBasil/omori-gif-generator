import { Text } from '@geist-ui/core';

type LabelProps = {
	children: string | (string | JSX.Element)[];
};

const Label = (props: LabelProps) => {
	return (
		<Text
			small
			mb='10px'
			style={{
				color: '#444',
				display: 'flex',
				gap: '8px',
				alignItems: 'center'
			}}
		>
			{props.children}
		</Text>
	);
};

export default Label;
