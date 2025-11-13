// PROMPT: Initial structure and E2E test generated with AI assistance
export function parsePrice(text: string): number {
	const cleaned = text.replace(/[^\d.,-]/g, '').trim();
	if (cleaned.includes(',') && cleaned.includes('.')) {
		const lastComma = cleaned.lastIndexOf(',');
		const lastDot = cleaned.lastIndexOf('.');
		if (lastDot > lastComma) return Number(cleaned.replace(/,/g, ''));
		return Number(cleaned.replace(/\./g, '').replace(',', '.'));
	}
	if (cleaned.includes(',') && !cleaned.includes('.')) return Number(cleaned.replace(',', '.'));
	return Number(cleaned);
}

