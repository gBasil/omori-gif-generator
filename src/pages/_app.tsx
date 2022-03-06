import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import Meta from '../components/Meta';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Meta />
			<GeistProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</GeistProvider>
		</>
	);
}

export default MyApp;
