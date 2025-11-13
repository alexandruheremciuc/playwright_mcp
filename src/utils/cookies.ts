// PROMPT: Handle cookie policy popups for Playwright POM project
import { Page } from '@playwright/test';

const COOKIE_SELECTORS = [
	// mega-image.ro specific
	'button:has-text("Acceptă toate")',
	'button:has-text("Sunt de acord")',
	'[data-testid="accept-cookies"]',
	// Common cookie popup selectors
	'#onetrust-accept-btn-handler',
	'#onetrust-accept-btn-handler',
	'button:has-text("Accept")',
	'button:has-text("Accept All")',
	'button:has-text("Allow all")',
	'button:has-text("I agree")',
	'.cookie-consent button',
	'[id*="cookie"] button',
	'[class*="cookie"] button'
];

export async function dismissCookiesIfPresent(page: Page): Promise<void> {
	try {
		// Wait a bit for cookie popup to appear
		await page.waitForTimeout(1000);
		
		for (const selector of COOKIE_SELECTORS) {
			try {
				const button = page.locator(selector).first();
				const isVisible = await button.isVisible({ timeout: 2000 }).catch(() => false);
				if (isVisible) {
					await button.click({ timeout: 3000 });
					await page.waitForTimeout(500); // Wait for popup to close
					return;
				}
			} catch (e) {
				// Continue to next selector
				continue;
			}
		}
	} catch (e) {
		// Cookie popup might not be present, which is fine
		console.log('No cookie popup found or dismissed');
	}
}


