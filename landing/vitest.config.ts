import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  // tsconfig says "jsx": "preserve" for Next; tests that render components need the runtime Next uses.
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
});
