import GIFEncoder from 'gifencoder';
import canvasTextWrap from './canvasTextWrap';

type Config = {
	background: string;
	character: string;
	emotionIndex: number;
	text: {
		top: string;
		bottom: string;
		font: string;
	};
	scale: number;
};

const renderGIF = (config: Config) =>
	new Promise<Buffer>(async (resolve, reject) => {
		const size = 100 * config.scale;

		// Images
		const backgroundImage = new Image();
		const characterSpritesheet = new Image();

		backgroundImage.src = `/backgrounds/${config.background}.png`;
		characterSpritesheet.src = `/spritesheets/characters/${config.character}.png`;

		await backgroundImage.decode();
		await characterSpritesheet.decode();

		// Gif encoder
		const encoder = new GIFEncoder(size, size);

		encoder.start();
		encoder.setRepeat(0);
		encoder.setDelay(300);

		// Canvas
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;

		canvas.width = size;
		canvas.height = size;

		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = `bold ${10 * config.scale}px ${config.text.font}`;

		// Render all three frames
		for (let i = 0; i < 3; i++) {
			ctx.clearRect(0, 0, size, size);

			// Background
			ctx.drawImage(backgroundImage, 0, 0, size, size);
			// Character sprite
			ctx.drawImage(
				characterSpritesheet,
				i * 106,
				config.emotionIndex * 106,
				106,
				106,
				0,
				0,
				size,
				size
			);
			// Text

			// Top line
			ctx.textBaseline = 'top';

			const topText = canvasTextWrap(
				ctx,
				config.text.top,
				size - 5 * 2 * config.scale
			);

			topText.forEach((text, index) =>
				ctx.fillText(text, size / 2, 10 * config.scale * index + 3 * config.scale)
			);

			// Bottom line
			ctx.textBaseline = 'bottom';

			const bottomText = canvasTextWrap(
				ctx,
				config.text.bottom,
				size - 5 * 2 * config.scale
			).reverse();

			bottomText.forEach((text, index) =>
				ctx.fillText(text, size / 2, size - 10 * config.scale * index - 3 * config.scale)
			);

			// Add frame to gif
			encoder.addFrame(ctx);
		}

		encoder.finish();
		resolve(encoder.out.getData());
	});

export default renderGIF;
