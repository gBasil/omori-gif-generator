import { Display, Link, Page, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import config from '../config.json';

const Home: NextPage = () => (
	<Page dotBackdrop width='800px'>
		<Display
			caption={
				config.quotes[Math.floor(Math.random() * config.quotes.length)]
			}
		>
			<Text h1>Changelog</Text>
		</Display>

		<Text h3>v1.2.0</Text>
		<Text small>July 29, 2022</Text>
		<Text>Thank you placuszek15 for the pull request! :D</Text>
		<ul>
			<li>✨ Added Basil expressions and Omori afraid expression - placuszek15</li>
			<li>💬 Applied proper semantic versioning</li>
			<li>🏗️ Migrate from npm to Yarn</li>
			<li>🎨 Brought repo up to date with my current setup/standards</li>
		</ul>

		<Spacer h={2} />

		<Text h3>v1.1.0</Text>
		<Text small>March 6, 2022</Text>
		<Text>Thank you <Link color href='https://www.youtube.com/channel/UCAdWX1tWhzd1xbvzMMcq8TA'>Xenonaut</Link> and Yeastus for the suggestions and feedback :)</Text>
		<ul>
			<li>✨ Added link to GitHub repo</li>
			<li>✨ Added text color picker</li>
			<li>✨ Added this changelog</li>
			<li>🚸 Changed default font to Arial</li>
		</ul>

		<Spacer h={2} />

		<Text h3>v1.0.0</Text>
		<Text small>March 5, 2022</Text>
		<Text>🎉 Initial release, woo!</Text>
	</Page>
);

export default Home;
