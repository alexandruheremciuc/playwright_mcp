// PROMPT: Initial structure and E2E test generated with AI assistance
// TODO: Confirm selectors for product card/name/price/add button, cart link, cart rows, and total on your target app.
import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ProductListPage } from '../../src/pages/ProductListPage';
import { CartPage } from '../../src/pages/CartPage';

test('E2E: add two items, verify count, names, and total', async ({ page }) => {
	const home = new HomePage(page);
	const products = new ProductListPage(page);
	const cart = new CartPage(page);

	await home.goto();
	await home.openProducts();

	// Wait for products section to load and scroll into view
	const cards = products.productCards();
	await expect(cards.first(), 'At least one product should be visible').toBeVisible({ timeout: 15000 });
	
	// Wait for at least 2 products to be available
	const cardCount = await cards.count();
	expect(cardCount, 'At least 2 products should be available').toBeGreaterThanOrEqual(2);
	
	// Scroll to products and get names
	await cards.nth(0).scrollIntoViewIfNeeded();
	await page.waitForTimeout(500); // Brief wait for scroll to complete
	
	const nameA = (await products.productNameIn(cards.nth(0)).textContent())?.trim() || '';
	expect(nameA).not.toBe('');
	
	await cards.nth(1).scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	
	const nameB = (await products.productNameIn(cards.nth(1)).textContent())?.trim() || '';
	expect(nameB).not.toBe('');

	// Add two items by index (more reliable than filtering by name)
	await products.addProductByIndex(0);
	await page.waitForTimeout(1000); // Wait between additions
	
	await products.addProductByIndex(1);
	await page.waitForTimeout(2000); // Wait for cart to fully update

	// Go to cart
	await products.openCart();

	// Verify names
	const namesInCart = await cart.getItemNames();
	expect(namesInCart).toEqual(expect.arrayContaining([nameA, nameB]));

	// Verify count >= 2
	const count = await cart.getItemCount();
	expect(count).toBeGreaterThanOrEqual(2);

	// Verify total equals sum of two first items' prices
	const prices = await cart.getItemPrices();
	const expectedTotal = Number((prices.slice(0, 2).reduce((a, b) => a + b, 0)).toFixed(2));
	const total = await cart.getTotal();
	expect(Number(total.toFixed(2))).toBe(expectedTotal);

	// Summary
	console.log(`[SUMMARY] Selected: ${nameA}, ${nameB} | Total: ${expectedTotal}`);
});

