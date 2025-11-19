// PROMPT: Initial structure and E2E test generated with AI assistance
import { Page, Locator } from '@playwright/test';

// Prefer data-testid > role/name > text > CSS
export function byTestId(page: Page, id: string): Locator {
	return page.getByTestId(id);
}

export function byRole(page: Page, role: Parameters<Page['getByRole']>[0], name?: string): Locator {
	return page.getByRole(role, name ? { name } : undefined as any);
}

export function byText(page: Page, text: string): Locator {
	return page.getByText(text, { exact: true });
}

export function byCss(page: Page, css: string): Locator {
	return page.locator(css);
}
export function byXpath(page: Page, xpath: string): Locator {
	return page.locator(xpath);
}


