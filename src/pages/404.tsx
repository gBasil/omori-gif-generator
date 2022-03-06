import { Display, Image, Link, Page, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import Center from '../components/Center';
import NextLink from 'next/link';

const Err404: NextPage = () => (
	<Page dotBackdrop width='800px'>
		<Center>
			<Text h1>404</Text>
		</Center>
		<Display
			caption={
				<>
					<Text>
						Well slap my knee and tie it to a table and throw it out
						the window, consarn it.
					</Text>
					<Text h3>
						<NextLink passHref href='/'>
							<Link href='/' color>All roads lead to Home</Link>
						</NextLink>
					</Text>
				</>
			}
		>
			<Image src='/404.gif' width='300px' height='300px' alt='404' />
		</Display>
	</Page>
);

export default Err404;
