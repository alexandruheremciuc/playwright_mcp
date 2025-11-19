// PROMPT: Initial structure and E2E test generated with AI assistance
// TODO: Replace fallbacks with site-specific data-testid where available.
import { Page, Locator, expect } from '@playwright/test';
import { byRole, byCss } from '../utils/selectors';

export class ProductListPage {
	constructor(private readonly page: Page) {}

	productCards(): Locator {
		// XPath for mega-image.ro: products in "Mega Promotia Saptamanii" section
		return this.page.locator("//div[@data-testid='item-wrapper-no-width-class'][@data-ab-visibility!='hidden'][.//h3[text()='Mega Promotia Saptamanii']]//div[@data-testid='product-carousel']//ul/li[@data-testid='scrollable-item']");
	}

	productNameIn(card: Locator): Locator {
		// mega-image.ro uses data-testid="styled-title" for product names
		return card.locator('[data-testid="styled-title"], [data-testid="product-name"], h3').first();
	}

	productPriceIn(card: Locator): Locator {
		// mega-image.ro price selectors
		return card.locator('[data-testid="price"], [data-testid="product-price"], [class*="price"]').first();
	}

	addButtonIn(card: Locator): Locator {
		// mega-image.ro add to cart button - try multiple selectors
		return card.locator('[aria-label="Adauga in cos"]');
	}

	async addProductByName(name: string): Promise<void> {
		const card = this.productCards().filter({ hasText: name }).first();
		await expect(card, `Product '${name}' should be visible`).toBeVisible({ timeout: 10000 });
		
		// Scroll product into view before clicking
		await card.scrollIntoViewIfNeeded();
		await this.page.waitForTimeout(300); // Brief wait for scroll
		
		// Wait for add button to be visible and clickable
		const addButton = this.addButtonIn(card);
		await expect(addButton, `Add button for '${name}' should be visible`).toBeVisible({ timeout: 5000 });
		await addButton.click();
		
		// Brief wait after click to allow cart update
		await this.page.waitForTimeout(500);
	}

	async addProductByIndex(index: number): Promise<void> {
		const cards = this.productCards();
		const card = cards.nth(index);
		await expect(card, `Product at index ${index} should be visible`).toBeVisible({ timeout: 10000 });
		
		// Scroll product into view before clicking
		await card.scrollIntoViewIfNeeded();
		await this.page.waitForTimeout(300); // Brief wait for scroll
		
		// Wait for add button to be visible and clickable
		const addButton = this.addButtonIn(card);
		await expect(addButton, `Add button at index ${index} should be visible`).toBeVisible({ timeout: 5000 });
		
		// Check if button is enabled
		const isEnabled = await addButton.isEnabled().catch(() => false);
		if (!isEnabled) {
			throw new Error(`Add button at index ${index} is disabled`);
		}
		
		await addButton.click({ force: false });
		
		// Wait for cart to update
		await this.page.waitForTimeout(1000);
	}

	async openCart(): Promise<void> {
		// Find cart icon/button - try multiple approaches
		// Check if header/nav cart exists first
		const headerCart = this.page.locator('//a[contains(@aria-label,"Vezi coșul tău")]');
		
		await expect(headerCart, 'Cart button/link should be visible').toBeVisible({ timeout: 5000 });
		await headerCart.click();
		
		// Wait for navigation to cart page
		await this.page.waitForURL(/cos|cart/i, { timeout: 5000 }).catch(() => {});
		await this.page.waitForTimeout(1000); // Brief wait for cart to load
	}
}

