import { Grid, Page, Text, Breadcrumbs } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ImageCard from '../components/ImageCard';
import config from '../config.json';
import capitalize from '../helpers/capitalize';

const Background: NextPage = () => {
	const router = useRouter();
	const character = router.query.character as string;
	const emotion = router.query.emotion as string;

	useEffect(() => {
		if (!Object.keys(router.query).length) router.push('/');
	}, [router]);

	return (
		<Page dotBackdrop width='800px'>
			<Breadcrumbs>
				<Breadcrumbs.Item>Character</Breadcrumbs.Item>
				<Breadcrumbs.Item>Emotion</Breadcrumbs.Item>
				<Breadcrumbs.Item>Background</Breadcrumbs.Item>
			</Breadcrumbs>

			<Text h2>Background</Text>
			<Grid.Container justify='center' gap={3}>
				{config.backgrounds.map((background) => (
					<ImageCard
						key={background}
						image={`/backgrounds/${background}.png`}
						text={capitalize(background)}
						router={router}
						route={{
							pathname: '/text',
							query: {
								character,
								emotion,
								background,
							},
						}}
					/>
				))}
			</Grid.Container>
		</Page>
	);
};

export default Background;
