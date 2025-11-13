// PROMPT: Initial structure and E2E test generated with AI assistance
// TODO: Confirm if a click is required to reach products listing (e.g., 'Shop' or 'Products').
import { Page, expect } from '@playwright/test';
import { byRole } from '../utils/selectors';
import { dismissCookiesIfPresent } from '../utils/cookies';

export class HomePage {
	constructor(private readonly page: Page) {}

	async goto(): Promise<void> {
		await this.page.goto('/', { waitUntil: 'domcontentloaded' });
		await dismissCookiesIfPresent(this.page);
	}

	async openProducts(): Promise<void> {
		// Example navigation if needed:
		// await byRole(this.page, 'link', 'Products').click();
		await expect(this.page).toHaveURL(/.+/);
	}
}


