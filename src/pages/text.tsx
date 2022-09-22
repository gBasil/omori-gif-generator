import {
	Grid,
	Page,
	Text,
	Breadcrumbs,
	Input,
	Button,
	useInput,
	Slider,
	Select,
} from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Center from '../components/Center';
import Label from '../components/Label';
import ColorPicker from '../components/Picker';
import config from '../config.json';
import renderGIF from '../helpers/renderGIF';

const TextPage: NextPage = () => {
	// Hooks
	const router = useRouter();

	const { state: topText, bindings: topTextBindings } = useInput('');
	const { state: bottomText, bindings: bottomTextBindings } = useInput('');
	const {
		state: color,
		bindings: colorBindings,
		setState: setColor,
	} = useInput('#ffffff');
	const {
		state: strokeColor,
		bindings: strokeColorBindings,
		setState: setStrokeColor
	} = useInput('#ffffff');

	const [rendering, setRendering] = useState(false);
	const [output, setOutput] = useState<Buffer>();
	const [scale, setScale] = useState(1);
	const [strokeWidth, setStrokeWidth] = useState(0);
	const [font, setFont] = useState('Arial');

	// Params
	const character = router.query.character as string;
	const emotion = router.query.emotion as string;
	const background = router.query.background as string;

	// Placeholder text
	const placeholders = useMemo(
		() =>
			config.textPlaceholders[
				Math.floor(Math.random() * config.textPlaceholders.length)
			],
		[]
	);

	useEffect(() => {
		if (!Object.keys(router.query).length) router.push('/');
	}, [router]);

	const render = async () => {
		// Disable the button
		setRendering(true);

		const emotionIndex: number =
			// @ts-ignore
			config.emotions[
				config.characters.find((char) => char.key === character)!
					.emotionKey
			].indexOf(emotion);

		setOutput(
			await renderGIF({
				background,
				character,
				emotionIndex,
				text: {
					top: topText,
					bottom: bottomText,
					font,
					color,
				},
				scale,
				strokeWidth
			})
		);

		setRendering(false);
	};

	return (
		<Page dotBackdrop width='800px'>
			<Breadcrumbs>
				<Breadcrumbs.Item>Character</Breadcrumbs.Item>
				<Breadcrumbs.Item>Emotion</Breadcrumbs.Item>
				<Breadcrumbs.Item>Background</Breadcrumbs.Item>
				<Breadcrumbs.Item>Text</Breadcrumbs.Item>
			</Breadcrumbs>

			<Text h2>Text</Text>
			<Grid.Container justify='center' gap={3}>
				<Grid xs={12}>
					<Input
						placeholder={placeholders[0]}
						width='100%'
						{...topTextBindings}
					>
						Top text
					</Input>
				</Grid>
				<Grid xs={12}>
					<Input
						placeholder={placeholders[1]}
						width='100%'
						{...bottomTextBindings}
					>
						Bottom text
					</Input>
				</Grid>
				<Grid xs={12} direction='column'>
					<Label>Scale</Label>
					<Slider
						max={10}
						value={scale}
						min={1}
						step={0.5}
						onChange={setScale}
					/>
				</Grid>
				<Grid xs={12} direction='column'>
					<Label>Font</Label>
					<Select
						initialValue={font}
						onChange={(val) => setFont(val as string)}
					>
						<Select.Option
							value='Impact'
							style={{ fontFamily: 'Impact' }}
						>
							Impact
						</Select.Option>
						<Select.Option
							value='Arial'
							style={{ fontFamily: 'Arial' }}
						>
							Arial
						</Select.Option>
						<Select.Option
							value='Verdana'
							style={{ fontFamily: 'Verdana' }}
						>
							Verdana
						</Select.Option>
						<Select.Option
							value='Inter'
							style={{ fontFamily: 'Inter' }}
						>
							Inter
						</Select.Option>
					</Select>
				</Grid>
				<Grid xs={12} direction='column'>
					<Label>Text Color</Label>
					<ColorPicker
						value={color}
						bindings={colorBindings}
						onChange={setColor}
					/>
				</Grid>
				<Grid xs={12} direction='column'>
					<Label>Stroke Color</Label>
					<ColorPicker
						value={strokeColor}
						bindings={strokeColorBindings}
						onChange={setStrokeColor}
					/>
				</Grid>
				<Grid xs={12} direction='column'>
					<Label>Stroke Width (0 = No Stroke)</Label>
					<Slider
						max={10}
						value={strokeWidth}
						min={0}
						step={1}
						onChange={setStrokeWidth}
					/>
				</Grid>
				<Grid xs={12} direction='column'></Grid>
				<Grid xs={24} direction='column'>
					<Center>
						<Button
							type='secondary'
							loading={rendering}
							onClick={render}
						>
							Render!
						</Button>
					</Center>
				</Grid>
				{output && (
					<>
						<Grid xs={24} justify='center'>
							<img
								style={{
									borderRadius: '6px',
								}}
								src={`data:image/gif;base64,${output.toString(
									'base64'
								)}`}
								alt='Rendered output'
							/>
						</Grid>
						<Grid xs={24} justify='center'>
							<a
								download='omori.gif'
								href={`data:image/gif;base64,${output.toString(
									'base64'
								)}`}
							>
								<Button>Download Gif</Button>
							</a>
						</Grid>
					</>
				)}
			</Grid.Container>
		</Page>
	);
};

export default TextPage;
