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
		color: string;
		strokeColor: string;
	};
	scale: number;
	strokeWidth: number;
};

const renderGIF = (props: Config) =>
	new Promise<Buffer>(async (resolve, reject) => {
		const size = 100 * props.scale;

		let strokedText =	props.strokeWidth > 0; 

		// Images
		const backgroundImage = new Image();
		const characterSpritesheet = new Image();

		backgroundImage.src = `/backgrounds/${props.background}.png`;
		characterSpritesheet.src = `/spritesheets/characters/${props.character}.png`;

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

		ctx.fillStyle = props.text.color;
		if (strokedText) {
			ctx.strokeStyle = props.text.strokeColor;
			ctx.lineWidth = props.strokeWidth;
		}
		ctx.textAlign = 'center';

		ctx.font = `bold ${10 * props.scale}px ${props.text.font}`;

		// Render all three frames
		for (let i = 0; i < 3; i++) {
			ctx.clearRect(0, 0, size, size);

			// Background
			ctx.drawImage(backgroundImage, 0, 0, size, size);
			// Character sprite
			ctx.drawImage(
				characterSpritesheet,
				i * 106,
				props.emotionIndex * 106,
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
				props.text.top,
				size - 5 * 2 * props.scale
			);

			topText.forEach((text, index) => {
				if (strokedText) 
					ctx.strokeText(text, size / 2, 10 * props.scale * index + 3 * props.scale);
				ctx.fillText(text, size / 2, 10 * props.scale * index + 3 * props.scale)
			});

			// Bottom line
			ctx.textBaseline = 'bottom';

			const bottomText = canvasTextWrap(
				ctx,
				props.text.bottom,
				size - 5 * 2 * props.scale
			).reverse();

			bottomText.forEach((text, index) => {
				if (strokedText) 
					ctx.strokeText(text, size / 2, size - 10 * props.scale * index - 3 * props.scale)
				ctx.fillText(text, size / 2, size - 10 * props.scale * index - 3 * props.scale)
			});

			// Add frame to gif
			encoder.addFrame(ctx);
		}

		encoder.finish();
		resolve(encoder.out.getData());
	});

export default renderGIF;
