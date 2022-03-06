import { Text } from '@geist-ui/core';

type LabelProps = {
	children: string;
};

const Label = (props: LabelProps) => {
	return (
		<Text
			small
			mb='10px'
			style={{
				color: '#444',
			}}
		>
			{props.children}
		</Text>
	);
};

export default Label;
