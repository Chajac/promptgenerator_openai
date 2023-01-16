export async function copyToClipboard(input: any) {
	return await navigator.clipboard.writeText(input);
}
