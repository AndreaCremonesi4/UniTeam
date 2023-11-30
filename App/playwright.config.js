/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		stdout: 'ignore',
		stderr: 'ignore'
	},
	testDir: 'tests/playwright',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,


};

export default config;
