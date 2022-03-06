import { Card, Grid, Image, Text } from '@geist-ui/core';
import { NextRouter } from 'next/router';
import { UrlObject } from 'url';

type ImageCardProps = {
	image: string;
	text: string;
	router: NextRouter;
	route: UrlObject;
};

const ImageCard = (props: ImageCardProps) => {
	return (
		<Grid xs={6}>
			<Card
				padding='10px'
				paddingTop='25px'
				hoverable
				width='100%'
				style={{
					cursor: 'pointer',
				}}
				onClick={() =>
					props.router.push(
						props.route,
						props.route.pathname!
					)
				}
			>
				<Image src={props.image} width='100px' height='100px' alt={props.text} />
				<Text
					style={{
						textAlign: 'center',
					}}
				>
					{props.text}
				</Text>
			</Card>
		</Grid>
	);
};

export default ImageCard;
