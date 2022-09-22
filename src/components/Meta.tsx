import Head from 'next/head';

const Meta = () => {
	return (
		<Head>
			<title>Omori Gif Generator</title>

			<meta name='title' content='Omori Gif Generator' />
			<meta name='description' content='Not much to it' />

			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://omori.gbasil.dev/' />
			<meta property='og:title' content='Omori Gif Generator' />
			<meta property='og:description' content='Not much to it.' />
			<meta
				property='og:image'
				content='https://omori.gbasil.dev/banner.png'
			/>

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content='https://omori.gbasil.dev/' />
			<meta property='twitter:title' content='Omori Gif Generator' />
			<meta property='twitter:description' content='Not much to it.' />
			<meta
				property='twitter:image'
				content='https://omori.gbasil.dev/banner.png'
			/>
			<meta name='theme-color' content='#ffffff' />
		</Head>
	);
};

export default Meta;
