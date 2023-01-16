// FISCHER-YATES SHUFFLER (ARRAY RANDOMIZER)
export const FishYatesShuffle = (arr: any[]) => {
	const length = arr.length;
	for (let i = length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

// Color functions
export function getColors(colorArray: Array<string>, length: number) {
	return Array(length)
		.fill(null)
		.map((_, index) => colorArray[index % colorArray.length]);
}

function randomColorRGBA(a: number) {
	// Random Hex {Math.floor(Math.random() * 16777215).toString(16)

	// Random rgba
	const r: any = Math.floor(Math.random() * 256);
	const g: any = Math.floor(Math.random() * 256);
	const b: any = Math.floor(Math.random() * 256);
	const combined: string = `rgba(${r},${g},${b},${a})`;
	return `rgba(${r},${g},${b},${a})`;
}
