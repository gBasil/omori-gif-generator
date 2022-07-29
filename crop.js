import { readdirSync } from 'fs';
import sharp from 'sharp';

const lineNames = {
	default: [
		'neutral',
		'happy',
		'ecstatic',
		'afraid',
		'sad',
		'depressed',
		'angry',
		'enraged',
		'defeated',
		'injured',
		'victory',
	],
	sunny: [
		'neutral',
		'calm',
		null,
		'afraid',
		'sad',
		null,
		'angry',
		null,
		null, // Repeat of calm
		'injured',
		null, // Repeat of neutral
		null,
		null,
		null,
		'stressed-out',
	],
	omori: [
		'neutral',
		'happy',
		'ecstatic',
		'did-not-succumb',
		'sad',
		'depressed',
		'angry',
		'enraged',
		'defeated',
		'injured',
		'victory',
		'manic',
		'miserable',
		'furious',
		null,
		'afraid',
	],
	basil: [
		'neutral',
		'happy',
		'ecstatic',
		'afraid',
		'sad',
		'depressed',
		'angry',
		'enraged',
		'defeated',
		'injured',
		'victory',
		'manic',
		'miserable',
		'furious',
	]
};

readdirSync('./public/spritesheets/characters').forEach(async (file) => {
	const image = sharp(`./public/spritesheets/characters/${file}`);
	const metadata = await image.metadata();
	const lines =
		file === 'sunny.png'
			? {
					count: lineNames.sunny.length,
					names: lineNames.sunny,
			  }
			: file === 'omori.png'
			? {
					count: lineNames.omori.length,
					names: lineNames.omori,
			  }
			: file == 'basil.png'
			? {
					count: lineNames.basil.length,
					names: lineNames.basil,
			  }
			: {
					count: lineNames.default.length,
					names: lineNames.default,
			  };

	// Extract thumbnails for emotions
	for (let i = 0; i < lines.count; i++) {
		const frame = image.extract({
			left: 0,
			top: Math.floor((metadata.height / lines.count) * i),
			width: Math.floor(metadata.width / 3),
			height: Math.floor(metadata.height / lines.count),
		});
		if (lines.names[i])
			frame.toFile(`./public/characters/${file.split('.')[0]}-${lines.names[i]}.png`);
	}
});
