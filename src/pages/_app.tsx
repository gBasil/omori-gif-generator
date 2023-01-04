import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import Meta from '../components/Meta';

import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<script
					async
					defer
					data-website-id='75086b50-13e1-4379-b5de-19a70d577cde'
					src='https://umami.basil.cafe/umami.js'
					data-do-not-track='true'
					data-domains='omori.basil.cafe'
				/>
			</Head>
			<Meta />
			<GeistProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</GeistProvider>
		</>
	);
}

export default MyApp;
