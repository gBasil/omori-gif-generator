const canvasTextWrap = (
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number
) => {
	const words = text.split(' ');
	const lines = [];
	let currentLine = words[0];

	for (var i = 1; i < words.length; i++) {
		var word = words[i];
		var width = ctx.measureText(currentLine + ' ' + word).width;

		if (width < maxWidth) currentLine += ' ' + word;
		else {
			lines.push(currentLine);
			currentLine = word;
		}
	}

	lines.push(currentLine);
	return lines;
};

export default canvasTextWrap;
