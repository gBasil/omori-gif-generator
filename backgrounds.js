import sharp from 'sharp';

const image = sharp('./public/spritesheets/backgrounds.png');
const metadata = await image.metadata();

const size = metadata.width / 4;

const names = [
	'neutral',
	'defeat',
	'happy',
	'ecstatic',
	'manic',
	'sad',
	'depressed',
	'miserable',
	'angry',
	'enraged',
	'furious',
	'afraid',
];

for (let y = 0; y < 3; y++)
	for (let x = 0; x < 4; x++) {
		image
			.extract({
				left: x * size,
				top: y * size,
				width: size,
				height: size,
			})
			.toFile(`./public/backgrounds/${names[y * 4 + x]}.png`);
	}
