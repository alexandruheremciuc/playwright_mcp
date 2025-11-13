// PROMPT: Initial structure and E2E test generated with AI assistance
// TODO: Confirm selectors for cart rows, names, prices, and total in your app.
import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../utils/format';
import { byCss } from '../utils/selectors';

export class CartPage {
	constructor(private readonly page: Page) {}

	itemRows(): Locator {
		return byCss(this.page, '[data-testid=\"cart-item\"], .cart-item, .basket-item, [class*=\"cart\"] [class*=\"item\"]');
	}

	nameIn(row: Locator): Locator {
		return row.locator('[data-testid=\"item-name\"], .item-name, .product-name, [class*=\"name\"]').first();
	}

	priceIn(row: Locator): Locator {
		return row.locator('[data-testid=\"item-price\"], .item-price, .product-price, [class*=\"price\"]').first();
	}

	totalLocator(): Locator {
		return byCss(this.page, '[data-testid=\"cart-total\"], .cart-total, .basket-total, [class*=\"total\"]').first();
	}

	async getItemNames(): Promise<string[]> {
		const rows = this.itemRows();
		const count = await rows.count();
		const names: string[] = [];
		for (let i = 0; i < count; i++) {
			const txt = (await this.nameIn(rows.nth(i)).textContent())?.trim() || '';
			if (txt) names.push(txt);
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

