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
	],
};

readdirSync('spritesheets/characters').forEach(async (file) => {
	const image = sharp(`spritesheets/characters/${file}`);
	const metadata = await image.metadata();
	const lines =
		file === 'sunny.png'
			? {
					count: 15,
					names: lineNames.sunny,
			  }
			: file === 'omori.png'
			? {
					count: 15,
					names: lineNames.omori,
			  }
			: {
					count: 11,
					names: lineNames.default,
			  };

	// Extract thumbnails for emotions
	for (let i = 0; i < lines.count; i++) {
		const frame = image.extract({
			left: 0,
			top: (metadata.height / lines.count) * i,
			width: metadata.width / 3,
			height: metadata.height / lines.count,
		});
		if (lines.names[i])
			frame.toFile(`out/${file.split('.')[0]}-${lines.names[i]}.png`);
	}
});
