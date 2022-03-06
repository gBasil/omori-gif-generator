import { Button, Display, Link, Page, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import config from '../config.json';
import Center from '../components/Center';

const Home: NextPage = () => {
	const router = useRouter();

	return (
		<Page dotBackdrop width='800px'>
			<Display
				caption={
					config.quotes[
						Math.floor(Math.random() * config.quotes.length)
					]
				}
			>
				<Text h1>Omori Gif Generator</Text>
			</Display>

			<Text>
				Heyo! This is just a dead simple website created to make Omori
				gifs, like those you see on Tenor. There isn&apos;t much to it.
				<br />
				<br />
				Want to see the changes? Check the <Link color href='/changelog'>Changelog</Link>
			</Text>

			<Center>
				<Button
					type='secondary'
					onClick={() => router.push('/character')}
				>
					Go!
				</Button>
			</Center>

			<Page.Footer
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Text>
					Made by{' '}
					<Link color href='https://gbasil.dev'>
						Basil
					</Link>
				</Text>
				<Text>
					<Link icon color href='https://github.com/gBasil/omori-gif-generator'>
						View on GitHub
					</Link>
				</Text>
			</Page.Footer>
		</Page>
	);
};

export default Home;
