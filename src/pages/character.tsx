import { Grid, Page, Text, Breadcrumbs } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ImageCard from '../components/ImageCard';
import config from '../config.json';

const Character: NextPage = () => {
	const router = useRouter();

	return (
		<Page dotBackdrop width='800px'>
			<Breadcrumbs>
				<Breadcrumbs.Item>Character</Breadcrumbs.Item>
			</Breadcrumbs>

			<Text h2>Character</Text>
			<Grid.Container justify='center' gap={3}>
				{config.characters.map((character) => (
					<ImageCard
						key={character.key}
						image={`/characters/${character.key}-neutral.png`}
						text={character.name}
						router={router}
						route={{
							pathname: '/emotion',
							query: {
								character: character.key,
							},
						}}
					/>
				))}
			</Grid.Container>
		</Page>
	);
};

export default Character;
