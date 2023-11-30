import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	setupFiles: ['./tests/vitest/_setup/globalSetup.js'],
	test: {
		environment: 'jsdom',
		include: ['./tests/vitest/**/*.{test,spec}.{js,ts}']
	}
});
