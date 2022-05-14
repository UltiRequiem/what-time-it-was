import {env} from 'node:process';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: env.IS_GITHUB ? 'what-time-it-was' : undefined,
});
