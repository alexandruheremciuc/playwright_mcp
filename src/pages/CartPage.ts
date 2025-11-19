// PROMPT: Initial structure and E2E test generated with AI assistance
// TODO: Confirm selectors for cart rows, names, prices, and total in your app.
import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../utils/format';
import { byCss } from '../utils/selectors';

export class CartPage {
	constructor(private readonly page: Page) {}

	itemRows(): Locator {
		// mega-image.ro cart item selectors - try multiple patterns
		return byCss(this.page, '[data-testid="cart-item"], [data-testid="basket-item"], .cart-item, .basket-item, [class*="cart-item"], [class*="basket-item"], li[class*="product"], tr[class*="item"]');
	}

	nameIn(row: Locator): Locator {
		// mega-image.ro product name in cart - try styled-title like product listing
		return row.locator('[data-testid="styled-title"], [data-testid="item-name"], [data-testid="product-name"], .item-name, .product-name, h3, [class*="name"]').first();
	}

	priceIn(row: Locator): Locator {
		// mega-image.ro price in cart
		return row.locator('[data-testid="price"], [data-testid="item-price"], [data-testid="product-price"], .item-price, .product-price, [class*="price"]').first();
	}

	totalLocator(): Locator {
		// mega-image.ro cart total selector
		return byCss(this.page, '[data-testid="cart-total"], [data-testid="basket-total"], .cart-total, .basket-total, [class*="total"], [class*="sum"]').first();
	}

	async getItemNames(): Promise<string[]> {
		// Wait for cart to load items
		await this.page.waitForTimeout(1000);
		
		const rows = this.itemRows();
		const count = await rows.count();
		
		const names: string[] = [];
		for (let i = 0; i < count; i++) {
			try {
				const nameLocator = this.nameIn(rows.nth(i));
				await nameLocator.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
				const txt = (await nameLocator.textContent())?.trim() || '';
				if (txt) {
					names.push(txt);
				}
			} catch (e) {
				// Continue to next item if name cannot be retrieved
			}
		}
		return names;
	}

	async getItemPrices(): Promise<number[]> {
		const rows = this.itemRows();
		const count = await rows.count();
		const prices: number[] = [];
		for (let i = 0; i < count; i++) {
			const txt = (await this.priceIn(rows.nth(i)).textContent())?.trim() || '';
			prices.push(parsePrice(txt));
		}
		return prices;
	}

	async getItemCount(): Promise<number> {
		return await this.itemRows().count();
	}

	async getTotal(): Promise<number> {
		const txt = (await this.totalLocator().textContent())?.trim() || '';
		return parsePrice(txt);
	}
}

