// PROMPT: Initial structure and E2E test generated with AI assistance
// TODO: Replace fallbacks with site-specific data-testid where available.
import { Page, Locator, expect } from '@playwright/test';

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
		const byTestId = card.locator('[data-testid="add-to-cart"], [data-testid="add-button"]');
		const byRoleBtn = card.getByRole('button', { name: /adauga|adăuga/i });
		const byText = card.locator('button:has-text("Adauga"), button:has-text("Adăuga")');
		const fallback = card.locator('button').filter({ hasText: /adauga/i }).first();
		return byTestId.or(byRoleBtn).or(byText).or(fallback).first();
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

	async openCart(): Promise<void> {
		// mega-image.ro cart link selectors - try multiple approaches
		const cartSelectors = [
			'[data-testid="cart"]',
			'[data-testid="cart-icon"]',
			'a[href*="cart"]',
			'a[href*="cos"]',
			'a[href*="basket"]',
			'button[aria-label*="cart"]',
			'button[aria-label*="cos"]'
		];
		
		let cartLink = this.page.locator(cartSelectors.join(', ')).first();
		
		// Try role-based as fallback
		try {
			const roleLink = this.page.getByRole('link', { name: /cos|cart|basket/i });
			if (await roleLink.isVisible({ timeout: 1000 }).catch(() => false)) {
				cartLink = roleLink.first();
			}
		} catch (e) {
			// Continue with CSS selector
		}
		
		await expect(cartLink, 'Cart link should be visible').toBeVisible({ timeout: 5000 });
		await cartLink.click();
		await this.page.waitForTimeout(500); // Wait for navigation
	}
}

