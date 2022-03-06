import { Grid, Page, Text, Breadcrumbs } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ImageCard from '../components/ImageCard';
import config from '../config.json';
import capitalize from '../helpers/capitalize';

const Emotion: NextPage = () => {
	const router = useRouter();
	const character = router.query.character as string;
	const [emotions, setEmotions] = useState<string[]>([]);

	useEffect(() => {
		if (!Object.keys(router.query).length) router.push('/');
		else {
			const char = config.characters.find(({ key }) => key === character);
			if (!char) router.push('/');

			setEmotions(
				// @ts-ignore
				config.emotions[char.emotionKey].filter(
					(emotion: string | null) => emotion
				) as string[]
			);
		}
	}, [router, character]);

	return (
		<Page dotBackdrop width='800px'>
			<Breadcrumbs>
				<Breadcrumbs.Item>Character</Breadcrumbs.Item>
				<Breadcrumbs.Item>Emotion</Breadcrumbs.Item>
			</Breadcrumbs>

			<Text h2>Emotion</Text>
			<Grid.Container justify='center' gap={3}>
				{emotions.map((emotion) => (
					<ImageCard
						key={emotion}
						image={`/characters/${character}-${emotion}.png`}
						text={emotion
							.split('-')
							.map((text) => capitalize(text))
							.join(' ')}
						router={router}
						route={{
							pathname: '/background',
							query: {
								character,
								emotion,
							},
						}}
					/>
				))}
			</Grid.Container>
		</Page>
	);
};

export default Emotion;
