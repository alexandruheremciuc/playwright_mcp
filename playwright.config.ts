// PROMPT: Initial structure and E2E test generated with AI assistance
import { defineConfig, devices } from '@playwright/test';

const baseFromEnv = process.env.APP_URL || process.env.BASE_URL || '{{APP_URL}}';
const isCI = !!process.env.CI;

export default defineConfig({
	testDir: 'tests',
	timeout: 30_000,
	expect: { timeout: 10_000 },
	retries: isCI ? 2 : 0,
	reporter: [['list'], ['html', { open: isCI ? 'never' : 'on-failure' }]],
	use: {
		baseURL: baseFromEnv,
		trace: isCI ? 'on-first-retry' : 'off',
		video: 'off',
		screenshot: 'only-on-failure'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
});


